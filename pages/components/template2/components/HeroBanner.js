import React, { useEffect, useState } from 'react';
import styles from '../css/HeroBanner.module.css'; // Make sure the path to the CSS is correct
import { API } from '../../../../Config'; // Adjust the path as needed

const HeroBanner = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch(API.HEADER());
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setHeroData({
          backgroundImage: data.hero_banner_img,
          heading: data.property_name,
          description: data.hero_banner_subheading,
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  if (loading) {
    return <div className={styles.heroBanner}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.heroBanner}>Error loading hero banner: {error.message}</div>;
  }

  return (
    <div 
      className={styles.heroBanner} 
      style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
    >
      <div className={styles.overlay}></div>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1>{heroData.heading}</h1>
          <p>{heroData.description}</p>
          <a href="#contact" className={styles.enquireNow}>Enquire Now</a>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
