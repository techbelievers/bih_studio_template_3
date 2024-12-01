import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import styles from '../css/Amenities.module.css'; // Adjust the path based on your project
import { API } from '../../../../Config'; // Adjust API path

const Amenities = () => {
  const [amenitiesData, setAmenitiesData] = useState([]);
  const [heading, setHeading] = useState('');
  const [subHeading, setSubHeading] = useState('');

  useEffect(() => {
    const fetchAmenitiesData = async () => {
      try {
        const response = await fetch(API.AMENITIES());
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setAmenitiesData(data.amenities?.amenities || []);
        setHeading(data.amenities?.page?.heading || 'Amenities');
        setSubHeading(
          data.amenities?.page?.subheading ||
            'Discover the features that enhance your living experience'
        );
      } catch (error) {
        console.error('Error fetching amenities data:', error);
      }
    };

    fetchAmenitiesData();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section id="amenities" className={styles.amenitiesSection}>
      <div className={styles.container}>
        <h2 className={styles.luxuryHeading}>{heading}</h2>
        <p className={styles.subHeading}>{subHeading}</p>
        <Slider {...sliderSettings} className={styles.slider}>
          {amenitiesData.map((amenity) => (
            <div key={amenity.id} className={styles.card}>
              <img
                src={amenity.property_amenities_photo}
                alt={amenity.amenity_name}
                className={styles.image}
              />
              <div className={styles.overlay}>
                <h3 className={styles.name}>{amenity.amenity_name}</h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Amenities;
