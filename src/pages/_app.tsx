import { EmotionCache } from '@emotion/react';
import React from 'react';

import { ToastContainer } from 'react-toastify';

import { AppProps } from 'next/app';

import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline } from '@mui/material';

import createEmotionCache from '@utils/createEmotionCache';

import Providers from '@providers';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <Providers emotionCache={emotionCache}>
      <CssBaseline />
      <ToastContainer />
      <Component {...pageProps} />
    </Providers>
  );
}
