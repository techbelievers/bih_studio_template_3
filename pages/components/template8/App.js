import React from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import Footer from './components/Footer';
import FAQ from './components/FAQ';
import EMICalculator from './components/EMICalculator';
import Blogs from './components/Blogs';
import BankPartners from './components/BankPartners';
import ContactUs from './components/ContactUs';
import Adverties from './components/Advertisements';
import FloatingButtons from './components/FloatingButtons';
import Properties from './components/Properties';


// import BlogDetail from './components/BlogDetail';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App({ propertyDetails  }) {
  return (
    // <Router basename="/AppTemplate">
    //   <Routes>
    //     <Route path="/" element={
          <div className="App">
            <Header />
            <HeroBanner />
            <Adverties/>
            <Properties />
            
            {/* <MahareraInformation /> */}
            {/* <PropertyPriceTable /> */}
            {/* <PropertyDetails propertyDetails={propertyDetails} /> */}
            {/* <Gallery /> */}
            {/* <MasterPlan /> */}
            {/* <Video /> */}
            {/* <UnitLayout /> */}
            {/* <FloorPlans /> */}
            {/* <Amenities /> */}
            <ContactUs />
            {/* <LocationMap /> */}
            {/* <LocationHighlights /> */}
            <BankPartners />
            {/* <EMICalculator /> */}
            <Blogs />
            <FAQ />
            <Footer />
            <FloatingButtons slug={propertyDetails.property_website}/>
          </div>
        // } />
      //  <Route path="/blogs/:post_slug" component={BlogDetail} />

      // </Routes>
    // </Router>
  );
}

export default App;
