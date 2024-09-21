import React, { useState, useEffect } from 'react';
import '../css/Services.css'; // Adjusted import to point to the correct path
import { API } from '../../../Config'; // Corrected import for API configuration
import axios from 'axios';

const Services = () => {
  const [headerData, setHeaderData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await axios.get(API.HEADER());
        setHeaderData(response.data);
      } catch (err) {
        setError('Failed to fetch header data');
      }
    };

    fetchHeaderData();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div className="template1-services-container">
      {headerData ? (
        <>
          {/* First box with logo */}
          <div className="template1-card template1-business-strategy">
            <div className="template1-icon">
              <img src={headerData.logo} alt="Logo" style={{ maxWidth: '100px' }} />
            </div>
            <h3>{headerData.property_name}</h3>
            <p>Welcome to {headerData.builder_name}</p>
          </div>

          {/* Second box with location */}
          <div className="template1-card template1-local-marketing">
            <div className="template1-icon">🗺️</div> {/* Static icon */}
            <h3>{headerData.location},<br></br> {headerData.sublocation}</h3>
          </div>

          {/* Third box with property type and price range */}
          <div className="template1-card template1-social-media">
            <div className="template1-icon">🏢</div> {/* Static icon */}
            <h3>{headerData.property_type_price_range_text}</h3>

          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Services;
