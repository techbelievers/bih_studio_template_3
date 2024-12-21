import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API, DEFAULT_DOMAIN } from '../../Config';
import Loader from '../components/loader/Loader';

// Import template components
import Template6 from '../components/template6/Property';

const App = ({ initialDomain, initialPropertySlug }) => {
  const [templateId, setTemplateId] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [headerData, setHeaderData] = useState(null);
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const finalDomain =
          initialDomain === 'localhost:3000' ? DEFAULT_DOMAIN : initialDomain;

        // Fetch templateId
        const templateResponse = await axios.get(API.TEMPLATE_STUDIO(finalDomain));
        setTemplateId(templateResponse.data.templateId);

        // Fetch property details
        const propertyResponse = await axios.get(
          API.PROPERTY_DETAILS_STUDIO(finalDomain, initialPropertySlug)
        );
        setPropertyDetails(propertyResponse.data?.property_details);

        // Fetch header data
        const headerResponse = await axios.get(
          API.HEADER_STUDIO(finalDomain, initialPropertySlug)
        );
        setHeaderData(headerResponse.data);

        // Fetch gallery data
        const galleryResponse = await axios.get(
          API.GALLERY_STUDIO(finalDomain, initialPropertySlug)
        );
        const gallery_photos = galleryResponse.data?.property_photos || [];
        setGalleryData(Array.isArray(gallery_photos) ? gallery_photos : []);
      } catch (err) {
        console.error('Error fetching data:', err.message);
        setError(`Failed to fetch data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialDomain, initialPropertySlug]);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

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
      return <div>Template not found {templateId}</div>;
  }
};

// Fetch initial data
App.getInitialProps = async (context) => {
  const { req, query, params } = context;
  const property_slug = query?.property_slug || params?.property_slug || '';

  const rawWebsiteDomain =
    (req && req.headers['x-forwarded-host']) || DEFAULT_DOMAIN;
  const websiteDomain = rawWebsiteDomain.startsWith('www.')
    ? rawWebsiteDomain.replace('www.', '')
    : rawWebsiteDomain;

  return {
    initialDomain: websiteDomain,
    initialPropertySlug: property_slug,
  };
};

export default App;
