import React, { useState, useEffect } from 'react';
import { API } from '../../../../Config'; // Adjust the path as needed
import styles from '../css/Advertisements.module.css'; // Ensure the path is correct

const Advertisements = () => {
  const [ads, setAds] = useState(null);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await fetch(API.ADVERTISEMENT());
        const data = await response.json();
        setAds(data.contact_us);
      } catch (error) {
        console.error('Error fetching advertisements:', error);
      }
    };

    fetchAdvertisements();
  }, []);

  if (!ads) return null;

  return (
    <div className={styles.advertisementContainer}>
      {ads.above_category_status !== 'Hide' && (
        <div className={styles.adSection}>
          {ads.above_category_1 && (
            <a href={ads.above_category_1_url} target="_blank" rel="noopener noreferrer">
              <img src={ads.above_category_1} alt="Advertisement 1" className={styles.adImage} />
            </a>
          )}
          {ads.above_category_2 && (
            <a href={ads.above_category_2_url} target="_blank" rel="noopener noreferrer">
              <img src={ads.above_category_2} alt="Advertisement 2" className={styles.adImage} />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default Advertisements;
