// pages/_app.js
import './components/Loader.css'; // Ensure this file exists
import './index.css';
import Head from 'next/head';
import React from 'react';
import AppTemplate from './AppTemplate';
import axios from 'axios';
import { API } from '../Config';

const MyApp = ({ Component, pageProps }) => {
  const { headerData, error, isLoading } = pageProps;

  // Show loading state until the header data is fetched
  if (isLoading) {
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

// Fetching data in getServerSideProps
MyApp.getServerSideProps = async (context) => {
  let headerData = null;
  let error = null;
  const websiteDomain = context.req ? context.req.headers.host : 'buyindiahomes.in';

  try {
    const response = await axios.get(API.METAHEADER(websiteDomain));
    headerData = response.data;
  } catch (err) {
    error = `Failed to fetch header data: ${err.message} - ${API.METAHEADER(websiteDomain)}`;
  }

  return {
    props: {
      headerData,
      error,
      isLoading: !headerData && !error, // Determine loading state
    },
  };
};

export default MyApp;
