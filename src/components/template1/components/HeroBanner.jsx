import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../css/HeroBanner.module.css";
import { API } from "../../../../config.js";

const HeroBanner = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await axios.get(API.HEADER());
        const data = response.data;
        const isMobile = window.innerWidth < 768;
        const heroImages = data.hero_banner_img;
        const selectedImage = isMobile
          ? heroImages?.mobile?.[0]
          : heroImages?.desktop?.[0];
        setHeroData({
          backgroundImage: selectedImage,
          heading: data.hero_banner_heading,
          subheading: data.hero_banner_subheading,
        });
      } catch (err) {
        setError("Failed to fetch header data");
      } finally {
        setLoading(false);
      }
    };
    fetchHeaderData();
  }, []);

  if (loading) {
    return (
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.skeleton} />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.errorText}>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: heroData?.backgroundImage ? `url(${heroData.backgroundImage})` : undefined }}
    >
      <div className={styles.overlay} />
      <div className={styles.heroInner}>
        <h1 className={styles.title}>{heroData?.heading || "Find Your Space"}</h1>
        {heroData?.subheading && (
          <p className={styles.subtitle}>{heroData.subheading}</p>
        )}
        <a href="#properties" className={styles.cta}>
          View properties
        </a>
        <p className={styles.trust}>MAHARERA Registered · Verified Listings</p>
      </div>
    </section>
  );
};

export default HeroBanner;
