import React, { useState, useEffect } from 'react';
import '../css/Amenities.css'; // Ensure the path is correct
import { API } from '../../../Config'; // Use your config.js structure

const Amenities = () => {
  const [amenitiesData, setAmenitiesData] = useState([]);
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");

  useEffect(() => {
    const fetchAmenitiesData = async () => {
      try {
        const response = await fetch(API.AMENITIES());
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched amenities data:', data); // Debugging line
        setAmenitiesData(data.amenities?.amenities || []);
        setHeading(data.amenities?.page?.heading || 'Amenities');
        setSubHeading(data.amenities?.page?.subheading || 'Discover the features that enhance your living experience');
      } catch (error) {
        console.error('Error fetching amenities data:', error);
      }
    };

    fetchAmenitiesData();
  }, []);

  return (
    <div className="template1-amenities-container">
      <h2>{heading}</h2>
      <h4>{subHeading}</h4>
      <div className="template1-amenities-grid">
        {amenitiesData.length > 0 ? (
          amenitiesData.map(amenity => (
            <div key={amenity.id} className="template1-amenity-item">
              <img src={amenity.property_amenities_photo} alt={amenity.amenity_name} />
              <div className="template1-amenity-name">{amenity.amenity_name}</div>
            </div>
          ))
        ) : (
          <p>Loading amenities...</p>
        )}
      </div>
    </div>
  );
};

export default Amenities;
