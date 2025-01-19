// pages/_app.js
import './components/loader/Loader.module.css'; // Ensure this file exists
import './index.css';
import Head from 'next/head';
// import React from 'react';
import React, { useEffect, useState } from "react";
import AppTemplate from './AppTemplate';
import axios from 'axios';
import { API, DEFAULT_DOMAIN } from '../Config';
import App from 'next/app'; // Import the default App from Next.js

const MyApp = ({ Component, pageProps, headerData, error ,propertyDetails , domain ,slug}) => {
  // Show loading state until the header data is fetched

  useEffect(() => {
    // Disable right-click
    const disableRightClick = (event) => {
      event.preventDefault();
    };

    // Disable copy, cut, and paste
    const disableCopyCut = (event) => {
      event.preventDefault();
    };

    document.addEventListener('contextmenu', disableRightClick);
    document.addEventListener('copy', disableCopyCut);
    document.addEventListener('cut', disableCopyCut);

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
      document.removeEventListener('copy', disableCopyCut);
      document.removeEventListener('cut', disableCopyCut);
    };
  }, []);

  if (!headerData && !error) {
    return <div>Loading...App</div>; // Replace with your Loader component if needed
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
        <meta property="og:url" content={canonicalUrl} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={headerData.data.favicon} />
        <meta
        name="robots"
        content={headerData.data.status === 'Active' ? 'index, follow' : 'noindex, nofollow'}
      />


      {/* Google Tag (gtag.js) */}
        {headerData?.data?.gtag_id && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${headerData.data.gtag_id}`} />
            <script dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${headerData.data.gtag_id}');
              `,
            }} />
          </>
        )}

        {/* Event Snippet for WhatsApp Conversion */}
          {headerData?.data?.whatsapp_gtag_id && (
            <>
              <script dangerouslySetInnerHTML={{
                __html: `
                  gtag('event', 'conversion', {'send_to': '${headerData.data.whatsapp_gtag_id}'});
                `,
              }} />
            </>
          )}


          {/* Phone Conversion Tracking */}
          {headerData?.data?.phone_conversation_id && headerData?.data?.phone_conversation_number && (
            <>
              <script dangerouslySetInnerHTML={{
                __html: `
                  gtag('config', '${headerData.data.phone_conversation_id}', {
                    'phone_conversion_number': '${headerData.data.phone_conversation_number}'
                  });
                `,
              }} />
            </>
          )}


        {/* Conditionally add custom scripts */}

        {/* Inject raw HTML directly into Head */}
        {/* {headerData.data.script_1 && (
          <div dangerouslySetInnerHTML={{ __html: headerData.data.script_1 }} suppressHydrationWarning />
        )} */}

  
      {headerData.data.script_1 && (
        <script dangerouslySetInnerHTML={{ __html: headerData.data.script_1 }} />
      ) }

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
        <h2 className="hidden-h1">{description}</h2>
        {/* Pass propertyDetails as a prop to the component */}
        {Component.name === "Home" ? (
          <AppTemplate  />
        ) : (
          <Component {...pageProps}  />
        )}
      </main>


    </>
  );
};



MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { req, query } = appContext.ctx;

  let headerData = null;
  let propertyDetails = null;
  let error = null; 
  let flag = true;

  console.log("query.slug", query?.property_slug);
  let slug = null;
  // Determine the domain
  let domain = DEFAULT_DOMAIN;

  const rawWebsiteDomain = req?.headers["x-forwarded-host"] || DEFAULT_DOMAIN;
  const websiteDomain = rawWebsiteDomain.startsWith("www.")
    ? rawWebsiteDomain.replace("www.", "")
    : rawWebsiteDomain;

  const finalDomain = websiteDomain === "localhost:3000" ? DEFAULT_DOMAIN : websiteDomain;
  domain = finalDomain;
  console.log("finaldomain : ", finalDomain);


  try {
    // Ensure the rawSlug is extracted correctly and sanitize it
    const rawSlug = query.property_slug || (req && req.url.replace(/\/$/, "").split("/").pop()); // Remove trailing slash
    console.log("rawslug:", rawSlug);

    // Validate and extract slug only if the URL contains '/studios'
    if (req?.url.includes("/studios")) {
      // Check if the slug matches the expected pattern (adjust regex as per your slug format)
      // const isValidSlug = /^[a-zA-Z0-9_-]+$/.test(rawSlug);
      // if (isValidSlug) {
        slug = rawSlug && rawSlug.split(".json")[0].split("?")[0]; // Clean the slug
        
        console.log("Cleaned slug:", slug);
        flag = false;
      // } else {
      //   console.warn("Invalid slug format:", rawSlug);
      // }
    }

    if (!slug) {
      console.log("No valid slug found for '/studios'.");
    }

    
    // Fetch data based on the flag and slug
    if (flag) {
      const response = await axios.get(API.SEO_DETAIL(finalDomain));
      headerData = response.data;

      const propertyResponse = await axios.get(API.PROPERTY_DETAILS(finalDomain));
      const propertyData = await propertyResponse.data;

      if (!propertyData || !propertyData.property_details) {
        error = "Property details not found.";
      } else {
        propertyDetails = propertyData.property_details;
      }
    } else {
      if (slug) {
        const response = await axios.get(API.SEO_DETAIL_STUDIO(finalDomain, slug));
        headerData = response.data;

        const propertyResponse = await axios.get(API.PROPERTY_DETAILS(finalDomain));
        const propertyData = await propertyResponse.data;

        if (!propertyData || !propertyData.property_details) {
          error = "Property details not found.";
        } else {
          propertyDetails = propertyData.property_details;
        }
      } else {
        console.warn("Skipping SEO fetch as slug is invalid.");
      }
    }
  } catch (err) {
    error = `Failed to fetch header data: ${err.message} - ${API.SEO_DETAIL(finalDomain)}`;
    console.error(error);
  }

  return {
    ...appProps,
    headerData,
    propertyDetails,
    domain,
    slug,
    error,
  };
};




export default MyApp;
