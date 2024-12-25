import React from 'react';
import axios from 'axios';
import Header from './components/Header';
import HeroBanner from './detail-components/HeroBanner/HeroBanner';
import Returns from './detail-components/returns/know-your-returns';
import Footer from './components/Footer';
import PropertyPriceTable from './detail-components/property-price/PropertyPriceTable';
import MasterPlan from './detail-components/plans/MasterPlan';
import Amenities from './detail-components/amenities/Amenities';
import Gallery from './detail-components/gallery/Gallery';
import LocationMap from './detail-components/location/LocationMap';
import FloatingButtons from './components/FloatingButtons';
import dynamic from 'next/dynamic';
import { API, DEFAULT_DOMAIN } from '../../../Config';

// Dynamically import PropertyDetails with SSR disabled
const PropertyDetails = dynamic(() => import('./detail-components/property-details/PropertyDetails'), {
  ssr: false,
});

// // Default domain for fallback
// const DEFAULT_DOMAIN = 'buyindiahomes.in';

// // API endpoints
// const API = {
//   PROPERTY_DETAILS_STUDIO: (domain, slug) =>
//     `https://${domain}/api/properties/${slug}/details`,
//   HEADER_STUDIO: (domain, slug) =>
//     `https://${domain}/api/header/${slug}`,
//   GALLERY_STUDIO: (domain, slug) =>
//     `https://${domain}/api/gallery/${slug}`,
// };

function App({ propertyDetails, headerData, galleryData }) {
  if (!propertyDetails || !propertyDetails.property_slug) {
    return <div>Error: Property details are missing or invalid.</div>;
  }

  return (
    <div className="App">
      <Header headerData={headerData} />
      <HeroBanner
        propertyDetails={propertyDetails}
        slug={propertyDetails.property_slug}
        galleryData={galleryData}
        servicesData={headerData}
      />
      <PropertyPriceTable slug={propertyDetails.property_slug} />
      <Returns slug={propertyDetails.property_slug}/>
      <PropertyDetails propertyDetails={propertyDetails} />
      
      <MasterPlan slug={propertyDetails.property_slug} />
      <Amenities slug={propertyDetails.property_slug} />
      <Gallery slug={propertyDetails.property_slug} />
      <LocationMap slug={propertyDetails.property_slug} />
      <Footer />
      <FloatingButtons />
    </div>
  );
}

App.getInitialProps = async (context) => {
  const { req, query } = context;
  const property_slug = query?.property_slug || '';

  let propertyDetails = null;
  let headerData = null;
  let galleryData = [];
  let error = null;

  try {
    const rawWebsiteDomain = req?.headers['x-forwarded-host'] || 'localhost:3000';
    const websiteDomain = rawWebsiteDomain.startsWith('www.')
      ? rawWebsiteDomain.replace('www.', '')
      : rawWebsiteDomain;

    const finalDomain =
      websiteDomain === 'localhost:3000' ? DEFAULT_DOMAIN : websiteDomain;

    // Fetch data from APIs
    const propertyResponse = await axios.get(
      API.PROPERTY_DETAILS_STUDIO(finalDomain, property_slug)
    );
    propertyDetails = propertyResponse.data?.property_details || null;

    const headerResponse = await axios.get(
      API.HEADER_STUDIO(finalDomain, property_slug)
    );
    headerData = headerResponse.data || null;

    const galleryResponse = await axios.get(
      API.GALLERY_STUDIO(finalDomain, property_slug)
    );
    galleryData = Array.isArray(galleryResponse.data?.property_photos)
      ? galleryResponse.data.property_photos
      : [];
  } catch (err) {
    console.error('Error fetching data:', err.message);
    error = `Failed to fetch data: ${err.message}`;
  }

  return {
    propertyDetails,
    headerData,
    galleryData,
    error,
  };
};

export default App;
