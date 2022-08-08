import type { GetServerSideProps, NextPage } from 'next';

import { useTheme } from '@mui/material';

import jwtDecode from 'jwt-decode';

import { CustomContainner, CustomMain } from '@styles/pages/sigin';

import Layout from '@components/Layout';

import {
  ssrDefaultReturn,
  ssrRedirectLogin,
  TOKEN_PREFIX,
} from '@utils/tokensPrefix';

import { destroyCookie, parseCookies } from 'nookies';

const NewRegistration: NextPage = () => {
  const theme = useTheme();
  return (
    <Layout title="Novo Registro">
      <CustomContainner>
        <CustomMain
          elevation={2}
          sx={{ backgroundColor: theme.palette.grey[50] }}
        >
          New Registration
        </CustomMain>
      </CustomContainner>
    </Layout>
  );
};

export default NewRegistration;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { [TOKEN_PREFIX]: token } = parseCookies(ctx);
  if (!token) {
    return ssrRedirectLogin;
  }

  try {
    const result = jwtDecode(token);
    if (!result) {
      destroyCookie(ctx, TOKEN_PREFIX);
      return ssrRedirectLogin;
    }
  } catch (error) {
    destroyCookie(ctx, TOKEN_PREFIX);
    return ssrRedirectLogin;
  }
  return ssrDefaultReturn;
};
