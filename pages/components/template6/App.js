import React, { Suspense, lazy } from "react";
import FloatingButtons from "./components/FloatingButtons"; // Critical component, not dynamically imported
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
// Dynamically import components
const Footer = lazy(() => import("./components/Footer"));
const Services = lazy(() => import("./components/Services"));
const MahareraInformation = lazy(() => import("./components/MahaReraInformation"));
const Gallery = lazy(() => import("./components/Gallery"));
const PropertyPriceTable = lazy(() => import("./components/PropertyPriceTable"));
const PropertyDetails = lazy(() => import("./components/PropertyDetails"));
const UnitLayout = lazy(() => import("./components/UnitLayout"));
const FloorPlans = lazy(() => import("./components/FloorPlans"));
const MasterPlan = lazy(() => import("./components/MasterPlan"));
const Amenities = lazy(() => import("./components/Amenities"));
const LocationMap = lazy(() => import("./components/LocationMap"));
const LocationHighlights = lazy(() => import("./components/LocationHighlights"));
const Video = lazy(() => import("./components/Video"));
const FAQ = lazy(() => import("./components/FAQ"));
const EMICalculator = lazy(() => import("./components/EMICalculator"));
const Blogs = lazy(() => import("./components/Blogs"));
const BankPartners = lazy(() => import("./components/BankPartners"));
const ContactUs = lazy(() => import("./components/ContactUs"));
const Adverties = lazy(() => import("./components/Advertisements"));
const Properties = lazy(() => import("./components/Properties"));

function App({ propertyDetails }) {
  return (
    <div className="App">
      {/* Use Suspense to handle fallback UI during component loading */}
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <HeroBanner />
        <Properties />
        <Adverties />
        <ContactUs />
        <BankPartners />
        <EMICalculator />
        <Blogs />
        <FAQ />
        <Footer />
      </Suspense>

      {/* Always loaded */}
      <FloatingButtons />
    </div>
  );
}

export default App;
