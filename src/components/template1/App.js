// src/App.js
import React from 'react';
// import Header from './components/Header';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import Footer from './components/Footer';
// import 'App'
import Services from './components/Services';
import MahareraInformation from './components/MahaReraInformation';
import Gallery from './components/Gallery';
import PropertyPriceTable  from './components/PropertyPriceTable';
import PropertyDetails  from './components/PropertyDetails';
import UnitLayout  from './components/UnitLayout';
import FloorPlans  from './components/FloorPlans';
import MasterPlan from './components/MasterPlan';
import Amenities from './components/Amenities';
import LocationMap from './components/LocationMap';
import LocationHighlights from './components/LocationHighlights';
import Video from './components/Video';
import FAQ from './components/FAQ';
import EMICalculator from './components/EMICalculator';
import BankPartners from './components/BankPartners';
// import Blogs from './components/Blogs';
import ContactUs from './components/ContactUs';
import FloatingButtons from './components/FloatingButtons';
// import UnitLayout_2  from './components/UnitLayout_2';
// import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';



function App() {
  return (
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
      {/* <Blogs /> */}
      <FAQ />
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default App;
