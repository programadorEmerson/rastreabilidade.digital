import { EmotionCache, ThemeProvider } from '@emotion/react';
import { FC } from 'react';

import { AuthProvider } from '@context/auth.context';

import HeadProperts from '@components/HeadProperts';

import theme from '@styles/theme';

type ProvidersProps = {
  children: React.ReactNode;
  emotionCache: EmotionCache;
};

const Providers: FC<ProvidersProps> = ({ children, emotionCache }) => {
  return (
    <HeadProperts cache={emotionCache}>
      <AuthProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </AuthProvider>
    </HeadProperts>
  );
};

export default Providers;
