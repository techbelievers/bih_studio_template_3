// pages/_app.js
import './components/Loader.css'; // Ensure this file exists
import './index.css';
import Head from 'next/head';
import React from 'react';
import AppTemplate from './AppTemplate';
import axios from 'axios';
import { API } from '../Config';
import App from 'next/app'; // Import the default App from Next.js

const MyApp = ({ Component, pageProps, headerData, error }) => {
  // Show loading state until the header data is fetched
  if (!headerData && !error) {
    return <div>Loading...</div>; // Replace with your Loader component if needed
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Construct meta tags based on the fetched header data
  const title = headerData ? `${headerData.property_name} - ${headerData.location}` : 'Default Title';
  const description = headerData
    ? `${headerData.property_name} - ${headerData.property_type_price_range_text} in ${headerData.location}, ${headerData.sublocation}, by ${headerData.builder_name}`
    : 'Default Description';
  const keywords = headerData
    ? `real estate, ${headerData.property_name}, ${headerData.location}, ${headerData.sublocation}, property for sale`
    : 'real estate';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={headerData?.hero_banner_img || ''} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {Component.name === "Home" ? <AppTemplate /> : <Component {...pageProps} />}
    </>
  );
};

// Using getInitialProps to fetch data
// MyApp.getInitialProps = async (appContext) => {
//   const appProps = await App.getInitialProps(appContext); // Use the imported App component

//   let headerData = null;
//   let error = null;
//   const { req } = appContext;
//   const websiteDomain = req.headers['x-forwarded-host'] || 'default.domain.com';
//   const finalDomain = websiteDomain === 'localhost:3000' ? 'buyindiahomes.in' : websiteDomain;
//   console.log('finaldomain : ', finalDomain);

//   try {
//     const response = await axios.get(API.METAHEADER(finalDomain));
//     headerData = response.data;
//   } catch (err) {
//     error = `Failed to fetch header data: ${err.message} - ${API.METAHEADER(finalDomain)}`;
//   }

//   return {
//     ...appProps,
//     headerData,
//     error,
//   };
// };

// Fetch data with getServerSideProps
export const getServerSideProps = async (context) => {
  let headerData = null;
  let error = null;
  const { req } = context;
  const websiteDomain = req.headers['x-forwarded-host'] || 'default.domain.com';

  console.log('Website Domain:', websiteDomain);

  try {
    const response = await axios.get(API.METAHEADER(websiteDomain));
    headerData = response.data;
  } catch (err) {
    error = `Failed to fetch header data: ${err.message}`;
  }

  return {
    props: {
      headerData,
      error,
      loading: !headerData && !error, // Set loading state based on the data fetched
    },
  };
};


export default MyApp;
