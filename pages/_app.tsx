import { CacheProvider, EmotionCache } from '@emotion/react';
import * as React from 'react';

import { ToastContainer } from 'react-toastify';

import { AppProps } from 'next/app';
import Head from 'next/head';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import theme from '@/styles/theme';

import 'react-toastify/dist/ReactToastify.css';

import createEmotionCache from '@/utils/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
