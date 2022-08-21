import { FC, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';

import { useFormik } from 'formik';

import * as yup from 'yup';

import { UserProps } from '@context/auth.context';

import { useAuthContext, useDeviceType } from '@hooks';

import {
  CustomDivider,
  CustomForm,
  CustomStack,
  CustonButtonLogin,
  LinkActions,
} from '@styles/pages/sigin';

import { AlertNotification } from '@components/AlertNotification';
import { Loading } from '@components/Loading';

import { ConstantsEnum } from '@enums/enum.constants';
import { routesEnum } from '@enums/enum.routes';

const initialValues: UserProps = {
  email: '',
  password: '',
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email('É necessário uso de um e-mail válido!')
    .required('O campo email não pode ser vazio!'),
  password: yup.string().required('O campo senha não pode estar vazio!'),
});

const FormLogin: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { type } = useDeviceType();
  const { push } = useRouter();
  const { handleSignIn } = useAuthContext();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (loginRequest: UserProps) => {
      try {
        setIsLoading(true);
        await handleSignIn(loginRequest);
        push(routesEnum.INITIAL_ROUTE);
      } catch (error) {
        const message = 'Dados de acesso inválidos';
        AlertNotification({ type: 'error', message });
        formik.setErrors({ email: message, password: message });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <CustomForm
      device={type}
      onSubmit={formik.handleSubmit}
      onBlur={formik.handleBlur}
    >
      <CustomStack spacing={2} device={type}>
        <Loading trigger={isLoading} message="Efetuando login" />
        <Image
          src="/assets/logo.png"
          alt="Logo do sistema"
          width={type === ConstantsEnum.MOBILE ? 120 : 150}
          height={type === ConstantsEnum.MOBILE ? 120 : 150}
        />
        <Typography variant="overline" display="block" gutterBottom>
          Rastreabilidade Digital
        </Typography>
        {type !== ConstantsEnum.MOBILE && (
          <CustomDivider>Informe suas credenciais</CustomDivider>
        )}
        <TextField
          fullWidth
          id="email"
          name="email"
          label="E-mail"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Senha"
          style={{
            fontWeight: 700,
            backgroundColor: 'transparent',
            width: '100%',
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          type={showPassword ? 'text' : 'password'}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <CustonButtonLogin type="submit" fullWidth disabled={isLoading}>
          Entrar
        </CustonButtonLogin>
        <LinkActions>Esqueceu sua senha?</LinkActions>
        <LinkActions onClick={() => push(routesEnum.SIGN_UP)}>
          Não possui conta? Cadastre-se.
        </LinkActions>
      </CustomStack>
    </CustomForm>
  );
};

export default FormLogin;
