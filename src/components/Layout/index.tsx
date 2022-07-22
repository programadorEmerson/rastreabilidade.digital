import { FC } from 'react';

import Head from 'next/head';

import { Box } from '@mui/material';

import { LayoutProps } from '@/types/layout.type';

import AppBar from '../AppBar';

const Layout: FC<LayoutProps> = ({ children, title }) => {
  return (
    <Box>
      <Head>
        <title>{`Rastreabilidade Digital - ${title}`}</title>
        <meta name="description" content="Rastreabilidade Digital" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar />
      <main>{children}</main>
    </Box>
  );
};

export default Layout;
