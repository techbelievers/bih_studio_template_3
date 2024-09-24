import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import { API } from '../Config'; // Adjust the import path
import AppTemplate from './AppTemplate';

const HomePage = ({ headerData, error }) => {
  if (error) return <div>{error}</div>;

  const title = `${headerData.property_name} - ${headerData.location}`;
  const description = `${headerData.property_name} - ${headerData.property_type_price_range_text} in ${headerData.location}, ${headerData.sublocation}, by ${headerData.builder_name}`;
  const keywords = `real estate, ${headerData.property_name}, ${headerData.location}, ${headerData.sublocation}, property for sale`;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={headerData.hero_banner_img || ''} />
        <meta property="og:type" content="website" />
      </Head>
      <AppTemplate>
      </AppTemplate>
    </div>
  );
};

export async function getStaticProps() {
  try {
    const response = await axios.get(API.HEADER());
    return {
      props: {
        headerData: response.data,
      },
      // Revalidate every 10 minutes to ensure content is fresh
      revalidate: 600, // Regenerates the page every 600 seconds (10 minutes)
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        headerData: null,
        error: 'Failed to fetch header data',
      },
      revalidate: 600, // Retry static regeneration after 10 minutes
    };
  }
}

export default HomePage;
