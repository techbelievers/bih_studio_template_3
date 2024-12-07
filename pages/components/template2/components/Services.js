import React, { useState, useEffect } from 'react';
import styles from '../css/Services.module.css'; // Import the updated CSS module
import { API } from '../../../../Config'; // Corrected import for API configuration
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


  const sublocationDisplay = headerData && headerData.sublocation !== 'Default Sublocation'
    ? headerData.sublocation
    : '';

  return (
    <div className={styles.servicesContainer}>
      {headerData ? (
        <>
          {/* Hero Banner Section with 3 cards */}
          <div className={styles.heroBanner}>
            {/* <h1>Welcome to Our Services</h1>
            <p>Explore our exceptional offerings tailored for you</p> */}

            {/* Cards inside Hero Banner */}
            <div className={styles.heroCards}>
              <div className={styles.card}>
                <img src={headerData.logo} alt="Logo" className={styles.logoImage} />
                <h3>{headerData.builder_name}</h3>
                {/* <p>A leading real estate builder known for quality and customer satisfaction.</p> */}
              </div>
              <div className={styles.card}>
                <img
                  src="https://www.buyindiahomes.in/location2.png"
                  alt="Location Icon"
                  className={styles.locationIcon}
                />
                <div>
                  <h3>{sublocationDisplay}</h3>
                  <h4>{headerData.location}</h4>
                </div>
              </div>
              <div className={styles.card}>
                <img
                  src="https://www.buyindiahomes.in/apartment_2.png"
                  alt="Property Icon"
                  className={styles.propertyIcon}
                />
                <div>
                  <h3>{headerData.property_type_price_range_text}</h3>
                  <p>{headerData.property_area_min_max}</p>
                  <p className={styles.updatedText}>
                    <em>Last Updated:</em> {headerData.property_last_updated}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Services Section in one row with lines separating them */}
          <div className={styles.servicesRow}>
            {/* More sections can be added here as needed */}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Services;
