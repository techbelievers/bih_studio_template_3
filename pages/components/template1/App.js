import React from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import Footer from './components/Footer';
import { API } from '../../../Config';
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
import BankPartners from './components/BankPartners';
import ContactUs from './components/ContactUs';
import FloatingButtons from './components/FloatingButtons';
import axios from 'axios';
import Head from 'next/head';

function App() {
  // if (error || !headerData || !headerData.property_name) {
  //   return (
  //     <div>
  //       <h1>Error</h1>
  //       <p>{error || 'Header data is incomplete or unavailable'}</p>
  //     </div>
  //   );
  // }

  // const title = `${headerData.property_name} - ${headerData.location}`;
  // const description = `${headerData.property_name} - ${headerData.property_type_price_range_text} in ${headerData.location}, ${headerData.sublocation}, by ${headerData.builder_name}`;
  // const keywords = `real estate, ${headerData.property_name}, ${headerData.location}, ${headerData.sublocation}, property for sale`;

  return (
    <div className="App">
      {/* <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={headerData.hero_banner_img || ''} />
        <meta property="og:type" content="website" />
      </Head> */}
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
      <FAQ />
      <Footer />
      <FloatingButtons />
    </div>
  );
}

// export async function getServerSideProps() {
//   try {
//     const response = await axios.get(API.HEADER());
//     return {
//       props: {
//         headerData: response.data || null,
//       },
//     };
//   } catch (err) {
//     console.error('Error fetching header data:', err);
//     return {
//       props: {
//         headerData: null,
//         error: 'Failed to fetch header data',
//       },
//     };
//   }
// }

export default App;
