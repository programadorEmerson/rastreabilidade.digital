import type { NextPage } from 'next';

import { Button } from '@mui/material';

import Layout from '@/components/Layout';

import { TOKEN_PREFIX } from '@/utils/tokensPrefix';

const Home: NextPage = () => {
  return (
    <Layout title="Home">
      Hello World
      <Button onClick={() => localStorage.setItem(TOKEN_PREFIX, 'teste')}>
        Teste
      </Button>
    </Layout>
  );
};

export default Home;
