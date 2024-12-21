import React from 'react';
import Header from './components/Header';
import HeroBanner from './detail-components/HeroBanner/HeroBanner';
import Footer from './components/Footer';
import PropertyPriceTable from './detail-components/property-price/PropertyPriceTable';
import MasterPlan from './detail-components/plans/MasterPlan';
import Amenities from './detail-components/amenities/Amenities';
import Gallery from './detail-components/gallery/Gallery';
import LocationMap from './detail-components/location/LocationMap';
import FloatingButtons from './components/FloatingButtons';
// import PropertyDetails from './detail-components/property-details/PropertyDetails';

// Dynamically import PropertyDetails with SSR disabled
import dynamic from 'next/dynamic';
const PropertyDetails = dynamic(() => import('./detail-components/property-details/PropertyDetails'), {
  ssr: false,
});

function App({ propertyDetails, headerData, galleryData }) {
  // Validate required props
  if (!propertyDetails || !propertyDetails.property_slug) {
    return <div>Error: Property details are missing or invalid.</div>;
  }

  return (
    <div className="App">
      {/* Header */}
      <Header headerData={headerData} />

      {/* Hero Banner */}
      <HeroBanner 
        propertyDetails={propertyDetails} 
        slug={propertyDetails.property_slug} 
        galleryData={galleryData} 
        servicesData = {headerData}
      />

      {/* Property Price Table */}
      <PropertyPriceTable slug={propertyDetails.property_slug} />

      {/* Property Details */}
      <PropertyDetails propertyDetails={propertyDetails} />

      {/* Master Plan */}
      <MasterPlan slug={propertyDetails.property_slug} />

      {/* Amenities */}
      <Amenities slug={propertyDetails.property_slug} />

      {/* Gallery */}
      <Gallery slug={propertyDetails.property_slug} />

      {/* Location Map */}
      <LocationMap slug={propertyDetails.property_slug} />

      {/* Footer */}
      <Footer />

      {/* Floating Buttons */}
      <FloatingButtons />
    </div>
  );
}

// Fetch data in getInitialProps
App.getInitialProps = async (context) => {
  const { req, query } = context;
  const property_slug = query?.property_slug || '';

  let propertyDetails = null;
  let headerData = null;
  let galleryData = [];
  let error = null;

  try {
    // Fetch domain from headers
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
