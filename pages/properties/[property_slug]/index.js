import React from 'react';
import axios from 'axios';
import { API, DEFAULT_DOMAIN } from '../../../Config';
import Loader from '../../components/loader/Loader';
import Template6 from '../Property';



const App = ({ templateId, propertyDetails, headerData, galleryData, error }) => {
  if (error) return <div>{error}</div>;

  // Conditional rendering based on templateId
  switch (templateId) {
    case '6':
      return (
        <Template6
          propertyDetails={propertyDetails}
          headerData={headerData}
          galleryData={galleryData}
        />
      );
    default:
      return <div>Template not found: {templateId}</div>;
  }
};


App.getInitialProps = async (context) => {
  const { req, query, params } = context;
  const property_slug = query?.property_slug || params?.property_slug || '';
  let domain = DEFAULT_DOMAIN;

  try {
    // Determine domain
    const rawWebsiteDomain =
      (req && req.headers['x-forwarded-host']) || DEFAULT_DOMAIN;
    const websiteDomain = rawWebsiteDomain.startsWith('www.')
      ? rawWebsiteDomain.replace('www.', '')
      : rawWebsiteDomain;

    const finalDomain =
      websiteDomain === 'localhost:3000' ? DEFAULT_DOMAIN : websiteDomain;
    domain = finalDomain;

    console.log('Domain:', finalDomain);
    console.log('Property Slug:', property_slug);

    // Fetch Template ID
    const templateResponse = await axios.get(API.TEMPLATE_STUDIO(finalDomain));
    const templateId = templateResponse.data.templateId || null;

    console.log('Template ID:', templateId);

    // Fetch Property Details
    const propertyResponse = await axios.get(
      API.PROPERTY_DETAILS_STUDIO(finalDomain, property_slug)
    );
    const propertyDetails = propertyResponse.data?.property_details || null;

    console.log('Property Details:', propertyDetails);

    // Fetch Header Data
    const headerResponse = await axios.get(
      API.HEADER_STUDIO(finalDomain, property_slug)
    );
    const headerData = headerResponse.data || null;

    console.log('Header Data:', headerData);

    // Fetch Gallery Data
    const galleryResponse = await axios.get(
      API.GALLERY_STUDIO(finalDomain, property_slug)
    );
    const gallery_photos = galleryResponse.data?.property_photos || [];
    const galleryData = Array.isArray(gallery_photos) ? gallery_photos : [];

    console.log('Gallery Data:', galleryData);

    return {
      templateId,
      propertyDetails,
      headerData,
      galleryData,
      error: null,
    };
  } catch (err) {
    console.error('Error fetching data:', err.message);
    return {
      templateId: null,
      propertyDetails: null,
      headerData: null,
      galleryData: [],
      error: `Failed to fetch data: ${err.message}`,
    };
  }
};

export default App;
