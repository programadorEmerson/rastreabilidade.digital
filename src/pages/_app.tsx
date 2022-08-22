import React from 'react';
import { ToastContainer } from 'react-toastify';

import { AppProps } from 'next/app';

import { CacheProvider, EmotionCache, ThemeProvider } from '@emotion/react';

import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline } from '@mui/material';

import theme from '@styles/theme';

import createEmotionCache from '@utils/createEmotionCache';

import Providers from '@providers';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  // const [teste, setTeste] = React.useState(0);
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <Providers>
          <CssBaseline />
          <ToastContainer />
          <Component {...pageProps} />
        </Providers>
      </ThemeProvider>
    </CacheProvider>
  );
}
