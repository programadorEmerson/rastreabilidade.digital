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

import { useAuthContext } from '@hooks';

import {
  CustomDivider,
  CustomForm,
  CustomStack,
  CustomText,
  CustonButtonLogin,
  LinkActions,
} from '@styles/pages/sigin';

import { AlertNotification } from '@components/AlertNotification';
import { Loading } from '@components/Loading';

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
    <CustomForm onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
      <CustomStack sx={{ padding: '0 10rem' }}>
        <Loading trigger={isLoading} message="Efetuando login" />
        <Image
          src="/assets/logo.png"
          alt="Logo do sistema"
          width={150}
          height={150}
        />
        <Typography variant="overline" display="block" gutterBottom>
          Rastreabilidade Digital
        </Typography>
        <CustomDivider>Informe suas credenciais</CustomDivider>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="E-mail"
          style={{
            fontWeight: 700,
            backgroundColor: 'transparent',
            width: '100%',
            margin: '20px 0',
          }}
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
      </CustomStack>
    </CustomForm>
  );
};

export default FormLogin;
