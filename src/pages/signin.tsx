import type { GetServerSideProps, NextPage } from 'next';

import jwtDecode from 'jwt-decode';

import { CustomContainner, CustomMain } from '@styles/pages/shared';

import AsideLogin from '@components/AsideLogin';
import FormLogin from '@components/FormLogin';
import Layout from '@components/Layout';

import {
  ssrDefaultReturn,
  ssrRedirectDashboard,
  TOKEN_PREFIX,
} from '@utils/tokensPrefix';

import { parseCookies } from 'nookies';

const Signin: NextPage = () => {
  return (
    <Layout title="Login">
      <CustomContainner>
        <CustomMain elevation={2}>
          <AsideLogin />
          <FormLogin />
        </CustomMain>
      </CustomContainner>
    </Layout>
  );
};

export default Signin;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { [TOKEN_PREFIX]: token } = parseCookies(ctx);
  if (token) {
    try {
      const result = jwtDecode(token);
      if (!result) {
        return ssrDefaultReturn;
      }
      return ssrRedirectDashboard;
    } catch (error) {
      return ssrDefaultReturn;
    }
  }
  return ssrDefaultReturn;
};
