import React, { useState, useEffect } from 'react';
import { API } from '../../../Config'; // Use your config.js structure
import '../css/LocationHighlights.css'; // Ensure the path is correct

const LocationHighlights = () => {
  const [locationData, setLocationData] = useState([]);
  const [heading, setHeading] = useState("");
  const [subheading, setSubHeading] = useState("");

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch(API.LOCATION_ADVANTAGES());
        const data = await response.json();
        setLocationData(data.location_advantages);
        setHeading(data.page[0]?.heading || 'Location Advantages');
        setSubHeading(data.page[0]?.subheading || '');
      } catch (error) {
        console.error('Error fetching location advantages data:', error);
      }
    };

    fetchLocationData();
  }, []);

  return (
    <div className="template1-location-highlights-container">
      <h2>{heading}</h2>
      <h4>{subheading}</h4>
      <div className="template1-location-highlights-list">
        {locationData.length > 0 ? (
          locationData.map((item) => (
            <div key={item.id} className="template1-location-highlight-item">
              <div className="template1-location-highlight-icon">
                <i className="fas fa-map-marker-alt"></i> {/* Use FontAwesome for icons */}
              </div>
              <div className="template1-location-highlight-details">
                <h5>{item.location}</h5>
                <p>{item.distance}</p>
                <p>{item.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading location highlights...</p>
        )}
      </div>
    </div>
  );
};

export default LocationHighlights;
