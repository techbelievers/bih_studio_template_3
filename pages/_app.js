// pages/_app.js
import './components/Loader.css'; // Ensure this file exists
import './index.css';
import Head from 'next/head';
import React from 'react';
import AppTemplate from './AppTemplate';
import axios from 'axios';
import { API, DEFAULT_DOMAIN } from '../Config';
import App from 'next/app'; // Import the default App from Next.js

const MyApp = ({ Component, pageProps, headerData, error ,propertyDetails , domain }) => {
  // Show loading state until the header data is fetched
  if (!headerData && !error) {
    return <div>Loading...</div>; // Replace with your Loader component if needed
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const canonicalUrl = `https://${domain}`;

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
        <link rel="canonical" href={canonicalUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={headerData.data.favicon} />
        <meta
        name="robots"
        content={headerData.data.status === 'Active' ? 'index, follow' : 'noindex, nofollow'}
      />


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


 {/* {Component.name === "Home" ? <AppTemplate propertyDetails={propertyDetails} /> : <Component {...pageProps} propertyDetails={propertyDetails} />} */}

{/* Main content with <h1> tag for SEO */}
<main>
        <h1 className="hidden-h1">{title}</h1> {/* Main heading of the page */}
        {/* Pass propertyDetails as a prop to the component */}
        {Component.name === "Home" ? (
          <AppTemplate propertyDetails={propertyDetails} />
        ) : (
          <Component {...pageProps} propertyDetails={propertyDetails} />
        )}
      </main>


    </>
  );
};

// Using getInitialProps to fetch data
MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext); // Use the imported App component

  let headerData = null;
  let propertyDetails = null;
  let error = null;
  let domain = DEFAULT_DOMAIN; 
  const { req } = appContext.ctx;
  // console.log('Default domain',API);
  const rawWebsiteDomain = req.headers['x-forwarded-host'] || (DEFAULT_DOMAIN);
  const websiteDomain = rawWebsiteDomain.startsWith('www.')
  ? rawWebsiteDomain.replace('www.', '')
  : rawWebsiteDomain;

  // const finalDomain = 'smp-amberwoodrahatani.com';
  const finalDomain = websiteDomain === 'localhost:3000' ? DEFAULT_DOMAIN : websiteDomain;
  domain = finalDomain
  // const finalDomain = websiteDomain;
  console.log('finaldomain : ', finalDomain);

  try {
    const response = await axios.get(API.SEO_DETAIL(finalDomain));
    headerData = response.data;

    const propertyResponse = await  axios.get(API.PROPERTY_DETAILS(finalDomain));
    const propertyData = await propertyResponse.data;




    console.log(propertyDetails);

    if (!propertyData || !propertyData.property_details) {
      error = 'Property details not found.';
    } else {
      propertyDetails = propertyData.property_details;
    }

    // const response = await axios.get(API.SEO_DETAIL(finalDomain), {
    //   headers: {
    //     'Cache-Control': 'no-cache', // Ensures data isn't cached
    //   },
    // });
    
 
  } catch (err) {
    error = `Failed to fetch header data: ${err.message} - ${API.SEO_DETAIL(finalDomain)}`;
  }

  return {
    ...appProps,
    headerData,
    propertyDetails,
    domain,
    error,
  };
};




export default MyApp;
