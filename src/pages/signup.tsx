/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { Button, Step, StepLabel, Stepper } from '@mui/material';

import { useFormik } from 'formik';

import jwtDecode from 'jwt-decode';

import * as yup from 'yup';

import { api } from '@services/api';

import {
  ContentSteep,
  CustomFooterButtons,
  CustomFormRegister,
} from '@styles/pages/signup';

import { AlertNotification } from '@components/AlertNotification';
import Layout from '@components/Layout';
import { Loading } from '@components/Loading';
import { AccessData } from '@components/StepperRegister/AccessData';
import ConfirmData from '@components/StepperRegister/ConfirmData';
import PaymentInfo from '@components/StepperRegister/PaymentInfo';

import { RegisterType } from '@@types/register';

import { returnDueDate } from '@utils/numberFormatter';
import { returnEnv } from '@utils/returnEnv';
import { TOKEN_REGISTER_PREFIX } from '@utils/tokensPrefix';

import jwt from 'jsonwebtoken';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import Stripe from 'stripe';

import { EnvEnum } from '@enums/enum.environments';
import { returnRoleType } from '@enums/enum.feature.code';
import { routesEnum } from '@enums/enum.routes';
import { loadStripe } from '@stripe/stripe-js';

interface IPrice extends Stripe.Price {
  product: Stripe.Product;
}

export interface IProps {
  prices: IPrice[];
}

export type PlansProps = {
  id: string;
  idPrice: string;
  description: string;
  name: string;
  price: number;
};

const steps = [
  'Dados de acesso',
  'Infomações pagamento',
  'Confirmação de dados',
] as const;

const SignUp: NextPage<IProps> = ({ prices }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checking, setChecking] = useState(false);
  const [plans, setPlans] = useState<PlansProps[]>([]);
  const stripePromise = loadStripe(returnEnv(EnvEnum.SECRET_STRIPE));
  const { push, route } = useRouter();

  useEffect(() => {
    const planList = prices.map((item) => {
      return {
        id: item.product.id || '',
        idPrice: item.product.default_price as string,
        description: item.product.description as string,
        name: item.product.name as string,
        price: item.unit_amount || 0,
      };
    });
    if (planList.length > 0) {
      setPlans(planList);
    }
  }, [prices]);

  const initialValues = {
    name: '',
    email: '',
    emailConfirm: '',
    password: '',
    confirmPassword: '',
    document: '',
    phone: '',
    plan: 'free',
    type: 'pf',
    typePhone: 'fixed',
    rules: returnRoleType('FREE'),
    dueDate: returnDueDate('FREE'),
  } as RegisterType;

  const validationSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    email: yup
      .string()
      .email('É necessário uso de um e-mail válido!')
      .required('O campo email não pode ser vazio!'),
    emailConfirm: yup
      .string()
      .oneOf([yup.ref('email'), null], 'E-mails não conferem'),
    password: yup.string().required('Senha é obrigatória'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Senhas não conferem')
      .required('Confirmação de senha é obrigatória'),
    document: yup.string().required('CPF/CNPJ é obrigatório'),
    phone: yup.string().required('Telefone é obrigatório'),
  } as RegisterType | any);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (registerData) => {
      try {
        setChecking(true);
        await api.get(
          `user/${routesEnum.CHECK_EMAIL}?email=${registerData.email}`,
        );
        handleNext();
      } catch (error) {
        AlertNotification({
          message: 'E-mail já cadastrado!',
          type: 'error',
        });
      } finally {
        setChecking(false);
      }
    },
  });

  const goToPayment = async (token: string) => {
    const findPlan = plans.find(
      (item) => item.name.toUpperCase() === formik.values.plan.toUpperCase(),
    );

    if (formik.values.plan.toUpperCase() === 'FREE') {
      push(`/${routesEnum.CONFIRM_PAYMENT}/${token}`);
    } else {
      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          mode: 'payment',
          lineItems: [{ price: findPlan?.idPrice, quantity: 1 }],
          successUrl: `${returnEnv(EnvEnum.PRODUCTION_URL)}/${
            routesEnum.CONFIRM_PAYMENT
          }/${token}`,
          cancelUrl: `${returnEnv(EnvEnum.PRODUCTION_URL)}${route}`,
        });
        if (error) {
          console.error(error);
        }
      }
    }
  };

  function handleNext() {
    if (activeStep < 2) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 2) {
      const token = jwt.sign(formik.values, returnEnv(EnvEnum.SECRET_TOKEN));
      setCookie(undefined, TOKEN_REGISTER_PREFIX, token, {
        maxAge: 24 * 60 * 60,
        path: routesEnum.INITIAL_ROUTE,
      });
      goToPayment(token);
    }
  }

  function handleBack() {
    if (activeStep === 0) {
      push(routesEnum.SIGN_IN);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  }

  function returnSteep() {
    switch (activeStep) {
      case 0:
        return <AccessData formik={formik} />;
      case 1:
        return <PaymentInfo plans={plans} formik={formik} />;
      case 2:
        return <ConfirmData />;
      default:
        return <AccessData formik={formik} />;
    }
  }

  useEffect(() => {
    async function getUserToken() {
      const cookies = parseCookies();
      const token = cookies[`${TOKEN_REGISTER_PREFIX}`];
      if (token) {
        try {
          const userToken = jwtDecode(token) as RegisterType;
          formik.setValues({ ...userToken });
        } catch (error) {
          destroyCookie(undefined, TOKEN_REGISTER_PREFIX);
        }
      }
    }
    getUserToken();
  }, []);

  return (
    <Layout title="Registrar">
      <CustomFormRegister
        onSubmit={formik.handleSubmit}
        onBlur={formik.handleBlur}
      >
        <Loading trigger={checking} message="Verificando email" />
        <ContentSteep elevation={2}>
          <Stepper
            activeStep={activeStep}
            sx={{ display: 'flex', width: '100%', padding: '2rem' }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {returnSteep()}
          <CustomFooterButtons>
            <Button color="inherit" onClick={handleBack}>
              {activeStep === 0 ? 'Efetuar Login' : 'Voltar'}
            </Button>
            {activeStep === 0 ? (
              <Button type="submit">Avançar</Button>
            ) : (
              <Button type="button" onClick={handleNext}>
                {activeStep === 2 ? 'Realizar pagamento' : 'Avançar'}
              </Button>
            )}
          </CustomFooterButtons>
        </ContentSteep>
      </CustomFormRegister>
    </Layout>
  );
};

export default SignUp;

export const getServerSideProps: GetServerSideProps = async () => {
  const stripe = new Stripe(returnEnv(EnvEnum.PUBLIC_STRIPE), {
    apiVersion: '2022-08-01',
  });
  const prices = await stripe.prices.list({
    active: true,
    limit: 150,
    expand: ['data.product'],
  });

  return { props: { prices: prices.data } };
};
