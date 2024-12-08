import React, { useEffect, useState } from "react";
import styles from "../css/HeroBanner.module.css";
import { API } from "../../../../Config";
import EnquirePopup from './EnquirePopup';

const HeroBanner = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);


  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch(API.HEADER());
        if (!response.ok) {
          throw new Error("Failed to fetch hero data");
        }
        const data = await response.json();

        const isMobile = window.innerWidth < 768;
        const heroImages = data.hero_banner_img;
        const selectedImage = isMobile
          ? heroImages.mobile[0]
          : heroImages.desktop[0];

        setHeroData({
          backgroundImage: selectedImage,
          heading: data.property_name,
          description: data.hero_banner_subheading,
          location: data.location,
          sublocation: data.sublocation
        });
      } catch (error) {
        setError("Error loading hero banner");
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
    return (
      <div className={styles.heroBanner}>
        Error loading hero banner: {error}
      </div>
    );
  }

  const sublocationDisplay = heroData && heroData.sublocation !== 'Default Sublocation'
  ? heroData.sublocation
  : '';
  return (
    <div
      className={styles.heroBanner}
      style={{
        backgroundImage: `url(${heroData.backgroundImage})`,
      }}
    >
      <div className={styles.heroContent}>
        <div className={styles.heroTextWrapper}>
          <h1 className={styles.heroHeading}>{heroData.heading}</h1>
          <p className={styles.heroLocation}>{sublocationDisplay}</p>
          <p className={styles.heroLocation}>{heroData.location}</p>
          {/* <p className={styles.heroDescription}>{heroData.description}</p> */}
          <div onClick={() => setIsPopupOpen(true)}>
                <a href="#contact-form" className={styles.enquireButton}>Enquire Now</a>
              </div>
          {/* <button  onClick={() => setIsPopupOpen(true)} className={styles.enquireButton}>Enquire Now</button> */}
        </div>
      </div>
      {isPopupOpen && <EnquirePopup onClose={() => setIsPopupOpen(false)} />}
    </div>
    
  );
};

export default HeroBanner;
