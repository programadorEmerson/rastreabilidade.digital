import { CacheProvider, EmotionCache } from '@emotion/react';
import { FC } from 'react';

import Head from 'next/head';

type ProvidersProps = {
  children: React.ReactNode;
  cache: EmotionCache;
};

const HeadProperts: FC<ProvidersProps> = ({ children, cache }) => {
  return (
    <CacheProvider value={cache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {children}
    </CacheProvider>
  );
};

export default HeadProperts;
