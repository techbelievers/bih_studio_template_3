import React from 'react';
import axios from 'axios';
import Head from 'next/head';
import { API } from '../Config';
import AppTemplate from '.';

const withMetaTags = (WrappedComponent) => {
  return class extends React.Component {
    static async getInitialProps(ctx) {
      let headerData = null;
      let error = null;
      try {
        const response = await axios.get(API.HEADER());
        headerData = response.data;
      } catch (err) {
        error = `Failed to fetch header data: ${err.message}`;
      }

      return { headerData, error };
    }

    render() {
      const { headerData, error } = this.props;
      if (error) return <div>Error: {error}</div>;

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
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

const HomePage = (props) => {
  return (
    <AppTemplate>
      {/* Your AppTemplate content goes here */}
    </AppTemplate>
  );
};

export default withMetaTags(HomePage);
