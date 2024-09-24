// pages/_app.js
import './components/Loader.css'; // Make sure to create this CSS file
import './index.css'
import Head from 'next/head';


const MyApp = ({ Component, pageProps }) => {
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

