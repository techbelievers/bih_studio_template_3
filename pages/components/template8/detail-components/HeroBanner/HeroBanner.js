import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { API } from "../../../../../Config";
import styles from "./HeroBanner.module.css";

const HeroBanner = ({ propertyDetails, servicesData, slug }) => {
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
      {/* Background Image Slider */}
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

      {/* Overlay & Content */}
      <div className={styles.overlay}></div>
      <div className={styles.heroContent}>
        <div className={styles.textContainer}>
          {/* Property Name & Description */}
          <h1 className={styles.heroTitle}>{propertyDetails.property_name}</h1>
          <p className={styles.heroSubtitle}>{propertyDetails.seo_meta_description}</p>
          <button 
  className={styles.ctaButton} 
  onClick={() => document.getElementById("price")?.scrollIntoView({ behavior: "smooth" })}
>
  Get Details
</button>
        </div>

        {/* Right Side - Builder Logo + Information Box */}
        <div className={styles.infoSection}>
          {/* Builder Logo Above Details */}
          {servicesData?.property_builder_photo && (
            <div className={styles.builderLogoContainer}>
              <img src={servicesData.property_builder_photo} alt="Builder Logo" className={styles.builderLogo} />
            </div>
          )}

          {/* Information Box */}
          <div className={styles.infoContainer}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>🏗️ Builder</span>
              <span className={styles.infoValue}>{servicesData?.builder_name || "N/A"}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>📍 Location</span>
              <span className={styles.infoValue}>{servicesData?.location || "N/A"}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>🏡 Property Type</span>
              <span className={styles.infoValue}>{servicesData?.property_type_price_range_text || "N/A"}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>📏 Area</span>
              <span className={styles.infoValue}>{servicesData?.property_area_min_max || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
