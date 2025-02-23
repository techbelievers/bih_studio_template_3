import React from 'react';
import Header from './components/Header';
import HeroBanner from './detail-components/HeroBanner/HeroBanner';
import Footer from './components/Footer';
import Gallery from './detail-components/gallery/Gallery';
import PropertyPriceTable from './detail-components/property-price/PropertyPriceTable';
// import PropertyDetails from './detail-components/property-details/PropertyDetails';

import MasterPlan from './detail-components/plans/MasterPlan';
import Amenities from './detail-components/amenities/Amenities';
import LocationMap from './detail-components/location/LocationMap';

import FloatingButtons from './components/FloatingButtons';

import dynamic from 'next/dynamic';

const PropertyDetails = dynamic(() => import('./detail-components/property-details/PropertyDetails'), {
    ssr: false,
  });

// import BlogDetail from './components/BlogDetail';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App({ propertyDetails , headerData , galleryData}) {
    
  return (
    // <Router basename="/AppTemplate">
    //   <Routes>
    //     <Route path="/" element={
          <div className="App">
            <Header headerData={headerData}/>
            <HeroBanner propertyDetails={propertyDetails} slug={propertyDetails.property_slug} galleryData={galleryData}/>
            <PropertyPriceTable slug={propertyDetails.property_slug}/>
            {/* <MahareraInformation propertyDetails={propertyDetails} slug={propertyDetails.property_slug}/> */}
            <PropertyDetails propertyDetails={propertyDetails} />
            <MasterPlan slug={propertyDetails.property_slug} /> 
            <Amenities  slug={propertyDetails.property_slug}/>
            <Gallery  slug={propertyDetails.property_slug}/>
            <LocationMap  slug={propertyDetails.property_slug}/>

            {/* <LocationHighlights /> */}
            {/* <ContactUs /> */}

            {/* <Properties /> */}
            {/* <Adverties/> */}
            {/* <Video /> */}
            {/* <BankPartners /> */}
            {/* <EMICalculator /> */}
            {/* <Blogs />
            <FAQ /> */}
            <Footer />
            <FloatingButtons />
          </div>
        // } />
      //  <Route path="/blogs/:post_slug" component={BlogDetail} />

      // </Routes>
    // </Router>
  );
}

export default App;
