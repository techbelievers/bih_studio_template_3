import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { API } from '../Config';
import Loader from './components/Loader';
// Import template components
import Template1 from './components/template1/App';
// import Template2 from './components/template2/App';
// import Template3 from './components/template3/Template3';

const App = ({ metaData, error }) => {
  const [templateId, setTemplateId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplateId = async () => {
      try {
        const response = await axios.get(API.TEMPLATE());
        setTemplateId(response.data.templateId);
      } catch (err) {
        console.error('Failed to fetch template data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplateId();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  // Conditional rendering based on templateId
  let TemplateComponent;
  switch (templateId) {
    case "1":
      TemplateComponent = <Template1 />;
      break;
    // case "2":
    //   TemplateComponent = <Template2 />;
    //   break;
    // case "3":
    //   TemplateComponent = <Template3 />;
    //   break;
    default:
      return <div>Template not found {templateId}</div>;
  }

  return (
    <>
      <Head>
        <title>{metaData.title || 'Default Title'}</title>
        <meta name="description" content={metaData.description || 'Default Description'} />
        <meta name="keywords" content={metaData.keywords || 'Default Keywords'} />
        <meta property="og:title" content={metaData.title || 'Default Title'} />
        <meta property="og:description" content={metaData.description || 'Default Description'} />
        <meta property="og:image" content={metaData.image || ''} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {TemplateComponent}
    </>
  );
};

// Fetch data with getServerSideProps
export const getServerSideProps = async (context) => {
  let metaData = {};
  let error = null;

  const websiteDomain = context.req.headers['x-website-domain'] || 'default.domain.com';

  try {
    // Fetch meta data based on the website domain
    const metaResponse = await axios.get(API.METAHEADER(websiteDomain));
    metaData = metaResponse.data;
  } catch (err) {
    error = `Failed to fetch data: ${err.message} - ${websiteDomain} `;
  }

  return {
    props: {
      metaData,
      error,
    },
  };
};

export default App;
