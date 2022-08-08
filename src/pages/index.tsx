import type { NextPage } from 'next';

import HeroPage from '@components/Hero';
import Layout from '@components/Layout';

const Home: NextPage = () => {
  return (
    <Layout title="Bem Vindo">
      <HeroPage />
      <span>teste</span>
    </Layout>
  );
};

export default Home;
