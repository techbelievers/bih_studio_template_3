import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API , DEFAULT_DOMAIN} from '../Config';
// import './index.css'
import Loader from './components/Loader';
// Import template components
import Template1 from './components/template1/App';
import Template2 from './components/template2/App';
import Template3 from './components/template3/App';
// import Template3 from './components/template3/Template3';

const App = ({ propertyDetails }) => {
  const [templateId, setTemplateId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get current website domain dynamically
    // const website = window.location.hostname; // This will get the current domain name

    // const Loader = () => {
    //   return (
    //     <div className="loader">
    //       <div className="spinner"></div>
    //     </div>
    //   );
    // };

    // Fetch templateId based on website parameter
    const fetchTemplateId = async () => {
      try {
        const response = await axios.get(API.TEMPLATE());
        setTemplateId(response.data.templateId);  // Assuming API returns templateId
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch template data');
        setLoading(false);
      }
    };

    fetchTemplateId();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  // Conditional rendering based on templateId
  switch (templateId) {
    case "1":
      return <Template1 propertyDetails={propertyDetails}/>;
      
    case "2":
      return <Template2 propertyDetails={propertyDetails} />;
    
    case "3":
       return <Template3 propertyDetails={propertyDetails} />;
    // case 3:
    //   return <Template3 />;
    default:
      return <div>Template not found {templateId}</div>;
  }
};


//  getServerSideProps to fetch property details
export async function getServerSideProps(context) {
  console.log("getServerSideProps - AppTemplate");
  const { req } = context;
  const rawWebsiteDomain = req.headers['x-forwarded-host'] || DEFAULT_DOMAIN;
  const websiteDomain = rawWebsiteDomain.startsWith('www.') 
    ? rawWebsiteDomain.replace('www.', '') 
    : rawWebsiteDomain;

  const finalDomain = websiteDomain === 'localhost:3000' ? DEFAULT_DOMAIN : websiteDomain;

  let propertyDetails = null;
  let error = null;

  try {
    const propertyResponse = await axios.get(API.PROPERTY_DETAILS(finalDomain));
    const propertyData = propertyResponse.data;




    console.log(propertyData); 

    if (!propertyData || !propertyData.property_details) {
      error = 'Property details not found.';
    } else {
      propertyDetails = propertyData.property_details;
    }
  } catch (err) {
    error = `Failed to fetch property details: ${err.message} - ${API.PROPERTY_DETAILS(finalDomain)}`;
  }

  return {
    props: {
      propertyDetails,
      error,
    },
  };
}
export default App;
