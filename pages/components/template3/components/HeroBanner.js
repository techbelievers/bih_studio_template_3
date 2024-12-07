import React, { useEffect, useState } from "react";
import styles from "../css/HeroBanner.module.css";
import { API } from "../../../../Config";

const HeroBanner = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          <p className={styles.heroLocation}>{heroData.sublocation}</p>
          <p className={styles.heroLocation}>{heroData.location}</p>
          <p className={styles.heroDescription}>{heroData.description}</p>
          <button className={styles.enquireButton}>Enquire Now</button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
