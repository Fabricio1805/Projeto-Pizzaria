import Head from 'next/head';
import React from 'react';
import Header from '../../components/Header';
import { canSSRAuth } from '../../utils/canSSRAuth';

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Painel - sujeito pizzaria</title>
      </Head>

      <div>
        <Header />
        <h1>painel</h1>
      </div>
    </>
  );
};
export default Dashboard;


export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  };
});
