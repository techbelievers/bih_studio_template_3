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
  const title = headerData.data.title;
  const description = headerData.data.meta_description;
  const keywords =  headerData.data.keywords;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": title,
    "description": description,
    "address": headerData.data.location,
    "price": headerData.data.price,
    "builderName" : headerData.data.builder_name,
    "image": headerData.data.og_image || '',
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={headerData.data.og_title} />
        <meta property="og:description" content={headerData.data.og_description} />
        <meta property="og:image" content={headerData.data?.og_image || ''} />
        <meta property="og:type" content={headerData.data.og_type} />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Conditionally add custom scripts */}
      {headerData.data.script_1 && (
        <script dangerouslySetInnerHTML={{ __html: headerData.data.script_1 }} />
      )}
      {headerData.data.script_2 && (
        <script dangerouslySetInnerHTML={{ __html: headerData.data.script_2 }} />
      )}

      {/* Structured Data */}
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      {Component.name === "Home" ? <AppTemplate /> : <Component {...pageProps} />}
    </>
  );
};

// Using getInitialProps to fetch data
MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext); // Use the imported App component

  let headerData = null;
  let error = null;
  const { req } = appContext.ctx;
  const websiteDomain = req.headers['x-forwarded-host'] || 'builderkonnect.com';
  
  // Determine the domain properly
  // const isServer = !!appContext.ctx.req;
  // const websiteDomain = isServer
  //   ? appContext.ctx.req.headers.host // This gets the request host (e.g., localhost:3000)
  //   : window.location.hostname; // This gets the host in the client-side environment

  // Use a fallback for the local development environment
  // const finalDomain = '10.211.55.3';
  const finalDomain = websiteDomain === 'localhost:3000' ? 'builderkonnect.com' : websiteDomain;
  console.log('finaldomain : ', finalDomain);

  try {
    const response = await axios.get(API.SEO_DETAIL(finalDomain));
    headerData = response.data;
  } catch (err) {
    error = `Failed to fetch header data: ${err.message} - ${API.METAHEADER(finalDomain)}`;
  }

  return {
    ...appProps,
    headerData,
    error,
  };
};

export default MyApp;
