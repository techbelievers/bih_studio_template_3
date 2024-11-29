import React, { useState, useEffect } from 'react';
import styles from '../css/Amenities.module.css'; // Ensure the path is correct
import { API } from '../../../../Config'; // Use your config.js structure

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
    <div id="amenities" className={styles.amenitiesContainer}>
      <h2 className={styles.amenitiesHeading}>{heading}</h2>
      <h3 className={styles.amenitiesSubHeading}>{subHeading}</h3>
      <div className={styles.amenitiesGrid}>
        {amenitiesData.length > 0 ? (
          amenitiesData.map(amenity => (
            <div key={amenity.id} className={styles.amenityItem}>
              <img src={amenity.property_amenities_photo} alt={amenity.amenity_name} />
              <div className={styles.amenityName}>{amenity.amenity_name}</div>
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
