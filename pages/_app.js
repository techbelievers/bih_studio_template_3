// pages/_app.js
import './components/Loader.css'; // Ensure this file exists
import './index.css';
import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import AppTemplate from './AppTemplate';
import { API } from '../Config';

const MyApp = ({ Component, pageProps, headerData, error }) => {
  const router = useRouter();

  if (router.pathname === '/') {
    // Render AppTemplate without meta tags
    return <AppTemplate />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Construct meta tags based on the fetched header data
  const title = `${headerData.property_name} - ${headerData.location}`;
  const description = `${headerData.property_name} - ${headerData.property_type_price_range_text} in ${headerData.location}, ${headerData.sublocation}, by ${headerData.builder_name}`;
  const keywords = `real estate, ${headerData.property_name}, ${headerData.location}, ${headerData.sublocation}, property for sale`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={headerData.hero_banner_img || ''} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

MyApp.getInitialProps = async ({ ctx }) => {
  let headerData = null;
  let error = null;
  const websiteDomain = ctx.req.headers.host; 
  try {
    
    const response = await axios.get(API.METAHEADER(websiteDomain));
    headerData = response.data;
  } catch (err) {
    error = `Failed to fetch header data: ${err.message} - ${API.METAHEADER(websiteDomain)}`;
  }

  // Return the fetched data as props
  return { headerData, error };
};

export default MyApp;
