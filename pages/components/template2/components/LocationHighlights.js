import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { API } from '../../../../Config'; // Adjust the path
import styles from '../css/LocationHighlights.module.css'; // Ensure the path is correct
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const LocationHighlights = () => {
  const [locationData, setLocationData] = useState([]);
  const [heading, setHeading] = useState('');

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

  return (
    <div className={styles.locationHighlightsContainer}>
      <h2 className={styles.heading}>{heading}</h2>
      {locationData.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className={styles.slider}
        >
          {locationData.map((item) => (
            <SwiperSlide key={item.id} className={styles.slide}>
              <div className={styles.slideContent}>
                <div className={styles.imageContainer}>
                  <img src={item.location_image} alt={item.location} className={styles.image} />
                </div>
                <div className={styles.textContent}>
                  <h3 className={styles.locationName}>{item.location}</h3>
                  <p className={styles.distance}>{item.distance}</p>
                  <p className={styles.description}>{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className={styles.loadingText}>Loading location highlights...</p>
      )}
    </div>
  );
};

export default LocationHighlights;
