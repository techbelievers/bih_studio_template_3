import React from "react";
import { motion } from "framer-motion";
import styles from "./PropertyDetailHeader.module.css";

const PropertyDetails = ({ propertyDetails, servicesData }) => {
  const details = [
    {
      icon: servicesData?.property_builder_photo ? (
        <img
          src={servicesData.property_builder_photo}
          alt="Builder Logo"
          className={styles.builderImage}
        />
      ) : (
        "🏗️"
      ),
      label: "Builder",
      value: servicesData?.builder_name || "Not Available",
    },
    { icon: "📍", label: "Location", value: servicesData?.location || "Not Available" },
    { icon: "🏡", label: "Property Type", value: servicesData?.property_type_price_range_text || "Not Available" },
    { icon: "📏", label: "Area", value: servicesData?.property_area_min_max || "Not Available" },
    { icon: "📅", label: "Last Updated", value: servicesData?.property_last_updated || "Not Available" },
  ];

  return (
    <section className={styles.propertyContainer}>
      <motion.h2 
        className={styles.heading}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Property <span className={styles.highlight}>Insights</span>
      </motion.h2>

      <motion.div 
        className={styles.detailsRow}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {details.map((item, index) => (
          <motion.div 
            key={index} 
            className={styles.detailItem}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
            transition={{ duration: 0.3 }}
          >
            <span className={styles.icon}>{item.icon}</span>
            <div className={styles.textWrapper}>
              <strong className={styles.label}>{item.label}</strong>
              <p className={styles.value}>{item.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default PropertyDetails;
