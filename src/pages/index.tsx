import { useEffect, useState } from 'react';

import type { NextPage } from 'next';

import { useTheme } from '@mui/material';

import { useAuthContext, useDeviceType } from '@hooks';

import { CustomContainner, CustomMain } from '@styles/pages/shared';

import Layout from '@components/Layout';

import { TOKEN_PREFIX, TOKEN_REGISTER_PREFIX } from '@utils/tokensPrefix';

import { destroyCookie, parseCookies } from 'nookies';

const Home: NextPage = () => {
  const { setTokenUser } = useAuthContext();
  const theme = useTheme();
  const { type } = useDeviceType();

  useEffect(() => {
    const getUserToken = async () => {
      const cookies = parseCookies();
      const tokenUSer = cookies[`${TOKEN_PREFIX}`];
      if (cookies[`${TOKEN_REGISTER_PREFIX}`]) {
        destroyCookie(undefined, TOKEN_REGISTER_PREFIX);
      }
      if (tokenUSer) {
        setTokenUser(tokenUSer);
      }
    };
    getUserToken();
  }, [setTokenUser]);

  return (
    <Layout title="Bem Vindo">
      <CustomContainner device={type}>
        <CustomMain
          elevation={2}
          device={type}
          sx={{ backgroundColor: theme.palette.grey[50] }}
        >
          {`Main Page, device: ${type}`}
        </CustomMain>
      </CustomContainner>
    </Layout>
  );
};

export default Home;
