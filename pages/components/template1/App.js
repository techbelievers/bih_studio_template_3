import React from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import Footer from './components/Footer';
import Services from './components/Services';
import MahareraInformation from './components/MahaReraInformation';
import Gallery from './components/Gallery';
import PropertyPriceTable from './components/PropertyPriceTable';
import PropertyDetails from './components/PropertyDetails';
import UnitLayout from './components/UnitLayout';
import FloorPlans from './components/FloorPlans';
import MasterPlan from './components/MasterPlan';
import Amenities from './components/Amenities';
import LocationMap from './components/LocationMap';
import LocationHighlights from './components/LocationHighlights';
import Video from './components/Video';
import FAQ from './components/FAQ';
import EMICalculator from './components/EMICalculator';
import Blogs from './components/Blogs';
import BankPartners from './components/BankPartners';
import ContactUs from './components/ContactUs';
import FloatingButtons from './components/FloatingButtons';
import BlogDetail from './components/BlogDetail';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    // <Router basename="/AppTemplate">
    //   <Routes>
    //     <Route path="/" element={
          <div className="App">
            <Header />
            <HeroBanner />
            <Services />
            <MahareraInformation />
            <PropertyPriceTable />
            <PropertyDetails />
            <Gallery />
            <Video />
            <UnitLayout />
            <MasterPlan />
            <FloorPlans />
            <Amenities />
            <LocationMap />
            <LocationHighlights />
            <BankPartners />
            <ContactUs />
            <EMICalculator />
            <Blogs />
            <FAQ />
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
