// pages/_app.js
import './components/Loader.css'; // Make sure to create this CSS file
import './index.css'
import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';
import AppTemplate from './AppTemplate';




const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  if (router.pathname === '/') {
    return <AppTemplate />;
  }
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;


