import type { GetServerSideProps, NextPage } from 'next';

import jwtDecode from 'jwt-decode';

import { Can } from '@context/ability.context';

import { CustomContainner, CustomPaper } from '@styles/pages/shared';

import Layout from '@components/Layout';

import {
  ssrDefaultReturn,
  ssrRedirectLogin,
  TOKEN_PREFIX,
} from '@utils/tokensPrefix';

import { destroyCookie, parseCookies } from 'nookies';

import { FeatureCodeEnum } from '@enums/enum.feature.code';

const NewRegistration: NextPage = () => {
  const { READ, FC_ALL } = FeatureCodeEnum;

  return (
    <Layout title="Novo Registro">
      <Can action={READ} subject={FC_ALL}>
        <CustomContainner>
          <CustomPaper elevation={2}>New Registration</CustomPaper>
        </CustomContainner>
      </Can>
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
