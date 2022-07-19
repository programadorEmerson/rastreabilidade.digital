import { FC } from 'react';

import Head from 'next/head';

import { Box } from '@mui/material';

import { LayoutProps } from '@/types/layout.type';

const Layout: FC<LayoutProps> = ({ children, title }) => {
  return (
    <Box>
      <Head>
        <title>{`Programando Soluções - ${title}`}</title>
        <meta name="description" content="Programando Soluções" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </Box>
  );
};

export default Layout;
