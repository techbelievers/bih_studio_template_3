import React, { lazy, Suspense } from 'react';
import Header from './components/Header';
import HeroBanner from './detail-components/HeroBanner/HeroBanner';
import Returns from './detail-components/returns/know-your-returns';
import Footer from './components/Footer';
import PropertyPriceTable from './detail-components/property-price/PropertyPriceTable';
import MasterPlan from './detail-components/plans/MasterPlan';
import Advertise from './detail-components/advertise/Advertisements';
import Amenities from './detail-components/amenities/Amenities';
import Gallery from './detail-components/gallery/Gallery';
import LocationMap from './detail-components/location/LocationMap';
import FloatingButtons from './components/FloatingButtons';
import Loader from '../loader/Loader';

// Dynamically import PropertyDetails
const PropertyDetails = lazy(() => import('./detail-components/property-details/PropertyDetails'));

function StudioTemplate({ propertyDetails, headerData, galleryData }) {
  if (!propertyDetails || !propertyDetails.property_slug) {
    return <div>Error: Property details are missing or invalid.</div>;
  }

  return (
    <div className="App">
      <Header 
        headerData={headerData} 
        slug={propertyDetails.property_slug}
      />
      <HeroBanner
        propertyDetails={propertyDetails}
        slug={propertyDetails.property_slug}
        galleryData={galleryData}
        servicesData={headerData}
      />
      <PropertyPriceTable slug={propertyDetails.property_slug} />
      <Returns slug={propertyDetails.property_slug}/>
      <Suspense fallback={<Loader />}>
        <PropertyDetails propertyDetails={propertyDetails} />
      </Suspense>
      <Advertise slug={propertyDetails.property_slug}/>
      <MasterPlan slug={propertyDetails.property_slug} />
      <Amenities slug={propertyDetails.property_slug} />
      <Gallery slug={propertyDetails.property_slug} />
      <LocationMap slug={propertyDetails.property_slug} />
      <Footer />
      <FloatingButtons slug={propertyDetails.property_slug} />
    </div>
  );
}

export default StudioTemplate;

