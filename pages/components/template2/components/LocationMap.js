import React, { useState, useEffect } from 'react';
import { API } from '../../../../Config';
import styles from '../css/LocationMap.module.css';

const LocationMap = () => {
  const [mapData, setMapData] = useState({ heading: '', subheading: '', map: '' });

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await fetch(API.LOCATION_MAP());
        const data = await response.json();
        setMapData({
          heading: data.heading || 'Location',
          subheading: data.subheading || '',
          map: data.map || ''
        });
      } catch (error) {
        console.error('Error fetching location map data:', error);
      }
    };

    fetchMapData();
  }, []);

  return (
    <div id="location" className={styles.locationMapContainer}>
      <h2 className={styles.luxuryHeading}>{mapData.heading}</h2>
      {mapData.subheading && <h4 className={styles.subheading}>{mapData.subheading}</h4>}
      <div className={styles.locationMap} dangerouslySetInnerHTML={{ __html: mapData.map }}></div>
    </div>
  );
};

export default LocationMap;
