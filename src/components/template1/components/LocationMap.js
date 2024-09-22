import React, { useState, useEffect } from 'react';
import { API } from '../../../Config'; // Adjust the path to your config.js file
import '../css/LocationMap.css'; // Ensure the path is correct

const LocationMap = () => {
  const [mapData, setMapData] = useState({ heading: '', subheading: '', map: '' });
  const [heading, setHeading] = useState("");
//   const [subheading, setSubHeading] = useState("");

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch(API.LOCATION_ADVANTAGES());
        const data = await response.json();
        setHeading(data.page[0]?.heading || 'Location Advantages');
        // setSubHeading(data.page[0]?.subheading || '');
      } catch (error) {
        console.error('Error fetching location advantages data:', error);
      }
    };

    fetchLocationData();
  }, []);

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
    <div id="location" className="location-map-container">
      <h2>{mapData.heading} & {heading}</h2>
      {mapData.subheading && <h4>{mapData.subheading}</h4>}
      <div className="location-map" dangerouslySetInnerHTML={{ __html: mapData.map }}></div>
    </div>
  );
};

export default LocationMap;
