import React, { useState, useEffect } from 'react';
import { API } from '../../../../config.js';
import styles from '../css/LocationHighlights.module.css'; // Ensure the path is correct

const LocationHighlights = () => {
  const [locationData, setLocationData] = useState([]);
  const [heading, setHeading] = useState('');
  const [visibleItems, setVisibleItems] = useState(8); // Initially show 6 items

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch(API.LOCATION_ADVANTAGES());
        const data = await response.json();
        setLocationData(data.location_advantages);
        setHeading(data.page[0]?.heading || 'Location Advantages');
      } catch (error) {
        console.error('Error fetching location advantages data:', error);
      }
    };

    fetchLocationData();
  }, []);

  const handleSeeMore = () => {
    setVisibleItems((prev) => prev + 8); // Increase by 6 on each click
  };

  return (
    <div className={styles.locationHighlightsContainer}>
      <h2 className={styles.luxuryHeading}>{heading}</h2>
      {locationData.length > 0 ? (
        <>
          <div className={styles.locationGrid}>
            {locationData.slice(0, visibleItems).map((item) => (
              <div key={item.id} className={styles.locationCard}>
                <div className={styles.imageContainer}>
                  <img src={item.location_image} alt={item.location} className={styles.image} />
                </div>
                <div className={styles.textContent}>
                  <h3 className={styles.locationName}>{item.location}</h3>
                  <p className={styles.distance}>{item.distance}</p>
                  <p className={styles.description}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          {visibleItems < locationData.length && (
            <button onClick={handleSeeMore} className={styles.seeMoreButton}>
              See More
            </button>
          )}
        </>
      ) : (
        <p className={styles.loadingText}>Loading location highlights...</p>
      )}
    </div>
  );
};

export default LocationHighlights;
