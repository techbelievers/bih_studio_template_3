import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../Config';
// import './index.css'
import Loader from './components/Loader';
// Import template components
import Template1 from './components/template1/App';
import Template2 from './components/template2/App';
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
      return <Template2 />;
    // case 3:
    //   return <Template3 />;
    default:
      return <div>Template not found {templateId}</div>;
  }
};

export default App;
