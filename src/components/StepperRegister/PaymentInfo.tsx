import { FC } from 'react';

import { Stack } from '@mui/material';

import { FormikContextType } from 'formik';

import { PlansProps } from '@pages/signup';

import CardPayment from '@components/CardPayment';

import { RegisterType } from '@@types/register';

type Props = {
  plans: PlansProps[] | [];
  formik: FormikContextType<RegisterType>;
};

const PaymentInfo: FC<Props> = ({ plans, formik }) => {
  return (
    <Stack
      spacing={2}
      direction="row"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding={2}
    >
      {plans
        .sort((a, b) => a.price - b.price)
        .map((plan) => (
          <CardPayment key={plan.id} plan={plan} formik={formik} />
        ))}
    </Stack>
  );
};

export default PaymentInfo;
