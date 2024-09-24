import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { API } from '../../../../Config'; // Adjust the path to your config.js file
import styles from '../css/LocationHighlights.module.css'; // Ensure the path is correct
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const LocationHighlights = () => {
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch(API.LOCATION_ADVANTAGES());
        const data = await response.json();
        setLocationData(data.location_advantages);
      } catch (error) {
        console.error('Error fetching location advantages data:', error);
      }
    };

    fetchLocationData();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true, // Optional: enable center mode
    centerPadding: '20px', // Optional: add padding to center items
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  

  return (
    <div className={styles.locationHighlightsContainer}>
      {locationData.length > 0 ? (
        <Slider {...sliderSettings}>
          {locationData.map((item) => (
            <div key={item.id} className={styles.locationHighlightItem}>
              <h3>{item.location}</h3>
              <p>{item.distance}</p>
              <p>{item.description}</p>
            </div>
          ))}
        </Slider>
      ) : (
        <p>Loading location highlights...</p>
      )}
    </div>
  );
};

export default LocationHighlights;
