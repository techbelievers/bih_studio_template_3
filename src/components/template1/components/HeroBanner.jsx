import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // For animations
import axios from "axios";
import styles from "../css/HeroBanner.module.css"; // Updated CSS Module
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
    <div className={styles.heroBanner}>
      {/* Split Layout - Left Content, Right Image */}
      <div className={styles.heroContainer}>
        {/* Left Side - Content */}
        <div className={styles.heroContent}>
          <motion.div
            className={styles.contentWrapper}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className={styles.heroBadge}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className={styles.badgeIcon}>⭐</span>
              <span className={styles.badgeText}>Premium Real Estate</span>
            </motion.div>

            {/* Main Heading with Unique Typography */}
            <h1 className={styles.heading}>
              <motion.span
                className={styles.headingLine1}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {heroData.heading?.split(' ').slice(0, Math.ceil(heroData.heading.split(' ').length / 2)).join(' ')}
              </motion.span>
              <motion.span
                className={styles.headingLine2}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {heroData.heading?.split(' ').slice(Math.ceil(heroData.heading.split(' ').length / 2)).join(' ')}
              </motion.span>
            </h1>

            {/* Subheading */}
            <motion.p
              className={styles.subheading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              {heroData.subheading}
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              className={styles.featurePills}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <div className={styles.pill}>
                <span className={styles.pillIcon}>🏆</span>
                <span>MAHARERA Approved</span>
              </div>
              <div className={styles.pill}>
                <span className={styles.pillIcon}>🔐</span>
                <span>100% Secure</span>
              </div>
              <div className={styles.pill}>
                <span className={styles.pillIcon}>💎</span>
                <span>Premium Quality</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className={styles.ctaGroup}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <motion.a
                href="#properties"
                className={styles.primaryCta}
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Explore Properties</span>
                <span className={styles.ctaArrow}>→</span>
              </motion.a>
              <motion.a
                href="#contact"
                className={styles.secondaryCta}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>📞</span>
                <span>Schedule Visit</span>
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              className={styles.heroStats}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              <div className={styles.stat}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Happy Clients</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>50+</span>
                <span className={styles.statLabel}>Projects</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Satisfaction</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Image with Overlay */}
        <div className={styles.heroImage}>
          <div
            className={styles.imageBackground}
            style={{
              backgroundImage: `url(${heroData.backgroundImage})`,
            }}
          >
            <div className={styles.imageOverlay}></div>
            <div className={styles.imageDecoration}>
              <div className={styles.decorationCircle1}></div>
              <div className={styles.decorationCircle2}></div>
              <div className={styles.decorationCircle3}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
      >
        <span>Scroll Down</span>
        <div className={styles.scrollArrow}></div>
      </motion.div>
    </div>
  );
};

export default HeroBanner;
