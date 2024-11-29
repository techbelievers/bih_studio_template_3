import React, { useState, useEffect } from 'react';
import styles from '../css/Services.module.css'; // Import the CSS module
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
    <div className={styles.template1ServicesContainer}>
      {headerData ? (
        <>
          {/* First box with logo */}
          <div className={`${styles.template1Card} ${styles.template1BusinessStrategy}`}>
            <div className={styles.template1Icon}>
              <img src={headerData.logo} alt="Logo" style={{ maxWidth: '200px', borderRadius: '10px' }} />
            </div>
            <h3>{headerData.builder_name}</h3>
          </div>

          {/* Second box with location */}
          <div className={`${styles.template1Card} ${styles.template1LocalMarketing}`}>
            <img
              src="https://www.buyindiahomes.in/location2.png"
              alt="Location Icon"
              style={{ width: '50px', height: '50px' }}
            />
            <h3>
              {sublocationDisplay}
              <br /> {headerData.location}
            </h3>
          </div>

          {/* Redesigned third box */}
          <div className={`${styles.template1Card} ${styles.template1PropertyDetails}`}>
            <div className={styles.propertyDetailsContent}>
              <img
                src="https://www.buyindiahomes.in/apartment_2.png"
                alt="Property Icon"
                style={{ width: '40px', borderRadius: '50%' }}
              />
              <h3>{headerData.property_type_price_range_text}</h3>
              <h6 style={{ margin: '5px 0' }}>{headerData.property_area_min_max}</h6>
              <p className={styles.updatedText}>
                <em>Last Updated:</em> {headerData.property_last_updated}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Services;
