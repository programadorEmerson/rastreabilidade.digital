import { FC, Fragment } from 'react';

import Head from 'next/head';

import { AuthProvider } from '@context/auth.context';
import { ElementProvider } from '@context/element.context';

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>{' '}
      <AuthProvider>
        <ElementProvider>
          <Fragment>{children}</Fragment>
        </ElementProvider>
      </AuthProvider>
    </Fragment>
  );
};

export default Providers;
