import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { API } from "../../../../../Config";
import styles from "./HeroBanner.module.css";

const HeroBanner = ({ propertyDetails, slug }) => {
  const [galleryData, setGalleryData] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(API.GALLERY_STUDIO(slug));
        setGalleryData(response.data.property_photos || []);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      }
    };
    fetchGallery();
  }, [slug]);

  useEffect(() => {
    if (galleryData.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % galleryData.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [galleryData]);

  return (
    <section className={styles.heroBanner}>
      <AnimatePresence mode="wait">
        {galleryData.length > 0 && (
          <motion.div
            key={currentImageIndex}
            className={styles.heroBackground}
            style={{ backgroundImage: `url(${galleryData[currentImageIndex].photo})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className={styles.overlay}></div>

      {/* Hero Content */}
      <motion.div 
        className={styles.heroContent} 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.heroTextBox}>
          <h1 className={styles.heroTitle}>{propertyDetails.property_name}</h1>
          <p className={styles.heroSubtitle}>{propertyDetails.seo_meta_description}</p>
          <motion.button 
            className={styles.ctaButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Property
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroBanner;
