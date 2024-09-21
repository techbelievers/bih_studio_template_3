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
      <Footer />
    </div>
  );
}

export default App;
