import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // For animations
import axios from "axios";
import styles from "../css/HeroBanner.module.css"; // Updated CSS Module
import { API } from "../../../../Config"; // API Configuration
import EnquirePopup from "./EnquirePopup";

const HeroBannerWithIntegratedServices = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
          heading: data.property_name,
          description: data.hero_banner_subheading,
          location: data.location,
          sublocation: data.sublocation !== "Default Sublocation" ? data.sublocation : "",
          builderName: data.builder_name,
          builderLogo: data.builder_logo,
          propertyType: data.property_type_price_range_text,
          propertyArea: data.property_area_min_max,
          lastUpdated: data.property_last_updated,
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
      <div className={styles.overlay}></div>
      <div className={styles.heroContent}>
        <motion.div
          initial={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Main Heading */}
          <h1 className={styles.heading}>{heroData.heading}</h1>
          <p className={styles.location}>
  {heroData.sublocation ? `${heroData.sublocation}, ` : ''}
  {heroData.location}
</p>

          {/* <p className={styles.description}>{heroData.description}</p> */}

          {/* Service Cards Inside Hero */}
          <div className={styles.servicesWrapper}>
            {/* Builder Card */}
            <motion.div
              className={styles.serviceCard}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.3)",
              }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={heroData.builderLogo}
                alt="Builder Logo"
                className={styles.logoImage}
              />
              <h3 className={styles.serviceTitle}>{heroData.builderName}</h3>
            </motion.div>

            {/* Property Details Card */}
            <motion.div
              className={styles.serviceCard}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.3)",
              }}
              transition={{ duration: 0.5 }}
            >
              <h3 className={styles.serviceTitle}>
                {heroData.propertyType}
              </h3>
              <p className={styles.serviceDetail}>{heroData.propertyArea}</p>
              <p className={styles.serviceDetail}>
                <em>Last Updated:</em> {heroData.lastUpdated}
              </p>
            </motion.div>
          </div>

          {/* Call to Action */}
          <button
            onClick={() => setIsPopupOpen(true)}
            className={styles.enquireButton}
          >
            Enquire Now
          </button>
        </motion.div>
      </div>

      {isPopupOpen && <EnquirePopup onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default HeroBannerWithIntegratedServices;
