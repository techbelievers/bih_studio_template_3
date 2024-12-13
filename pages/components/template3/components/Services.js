import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // For animations
import axios from "axios";
import styles from "../css/Services.module.css"; // CSS Module
import { API } from "../../../../Config"; // API Configuration

const Services = () => {
  const [headerData, setHeaderData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await axios.get(API.HEADER());
        setHeaderData(response.data);
      } catch (err) {
        setError("Failed to fetch header data");
      }
    };

    fetchHeaderData();
  }, []);

  if (error) return <div className={styles.error}>{error}</div>;

  const sublocationDisplay =
    headerData && headerData.sublocation !== "Default Sublocation"
      ? headerData.sublocation
      : "";

  return (
    <div className={styles.servicesContainer}>
      {headerData ? (
        <motion.div
          className={styles.heroBanner}
          initial={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 1 }}
        >
          {/* <h2 className={styles.heading}>Explore Our Offerings</h2>
          <p className={styles.subheading}>
            Discover premium real estate services tailored for you.
          </p> */}
          <div className={styles.heroCards}>
            {/* Builder Card */}
            <motion.div
              className={styles.card}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px rgba(227, 249, 84, 0.3)",
              }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.cardContent}>
                <img
                  src={headerData.builder_logo}
                  alt="Builder Logo"
                  className={styles.logoImage}
                />
                <h3 className={styles.title}>{headerData.builder_name}</h3>
              </div>
            </motion.div>

            {/* Location Card */}
            <motion.div
              className={styles.card}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px rgba(227, 249, 84, 0.3)",
              }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.cardContent}>
                <img
                  src="https://www.buyindiahomes.in/location_ui3.png"
                  alt="Location Icon"
                  className={styles.locationIcon}
                />
                <h3 className={styles.title}>{sublocationDisplay}</h3>
                <p className={styles.subtitle}>{headerData.location}</p>
              </div>
            </motion.div>

            {/* Property Card */}
            <motion.div
              className={styles.card}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px rgba(227, 249, 84, 0.3)",
              }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.cardContent}>
                <img
                  src="https://www.buyindiahomes.in/apartment_3.png"
                  alt="Property Icon"
                  className={styles.propertyIcon}
                />
                <h3 className={styles.title}>
                  {headerData.property_type_price_range_text}
                </h3>
                <p className={styles.subtitle}>
                  {headerData.property_area_min_max}
                </p>
                <p className={styles.updatedText}>
                  <em>Last Updated:</em> {headerData.property_last_updated}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <div className={styles.loading}>Loading...</div>
      )}
    </div>
  );
};

export default Services;
