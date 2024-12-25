// HeroBanner.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import styles from "../css/HeroBanner.module.css";
import { API } from "../../../../Config";

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
          ? heroImages.mobile[0]
          : heroImages.desktop[0];

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
    return <div className={styles.heroBanner}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={styles.heroBanner}>
        Error loading hero banner: {error}
      </div>
    );
  }

  return (
    <div
      className={styles.heroBanner}
      style={{
        backgroundImage: `url(${heroData.backgroundImage})`,
      }}
    >
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className={styles.heroContent}
        initial={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className={styles.heading}>{heroData.heading}</h1>
        <p className={styles.subheading}>{heroData.subheading}</p>
        <motion.a
          href="#properties"
          className={styles.ctaButton}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Properties
        </motion.a>
      </motion.div>
    </div>
  );
};

export default HeroBanner;
