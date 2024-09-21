// src/App.js
import React from 'react';
import Header from './components/template1/components/Header';
import HeroBanner from './components/template1/components/HeroBanner';
import Footer from './components/template1/components/Footer';
import './App.css';
import Services from './components/template1/components/Services';
import MahareraInformation from './components/template1/components/MahaReraInformation';
import Gallery from './components/template1/components/Gallery';
import PropertyPriceTable  from './components/template1/components/PropertyPriceTable';
import PropertyDetails  from './components/template1/components/PropertyDetails';
import UnitLayout  from './components/template1/components/UnitLayout';
// import UnitLayout_2  from './components/UnitLayout_2';





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
      <UnitLayout />
      {/* <UnitLayout_2 /> */}
      <Footer />
    </div>
  );
}

export default App;
