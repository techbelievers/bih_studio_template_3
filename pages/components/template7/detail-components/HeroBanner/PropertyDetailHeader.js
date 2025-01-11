import React from "react";
import { motion } from "framer-motion";
import styles from "./PropertyDetailHeader.module.css";

const PropertyDetails = ({ propertyDetails, servicesData }) => {
  return (
    <section className={styles.propertyContainer}>
      <motion.h2 
        className={styles.heading}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Property <span className={styles.highlight}>Details</span>
      </motion.h2>

      <motion.div 
        className={styles.detailsGrid}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {[
          { icon: "🏗️", label: "Builder", value: servicesData?.builder_name || "Not Available" },
          { icon: "📍", label: "Location", value: servicesData?.location || "Not Available" },
          { icon: "🏡", label: "Property Type", value: servicesData?.property_type_price_range_text || "Not Available" },
          { icon: "📏", label: "Area", value: servicesData?.property_area_min_max || "Not Available" },
          { icon: "📅", label: "Last Updated", value: servicesData?.property_last_updated || "Not Available" },
        ].map((item, index) => (
          <motion.div 
            key={index} 
            className={styles.detailCard}
            whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)" }}
            transition={{ duration: 0.3 }}
          >
            <span className={styles.icon}>{item.icon}</span>
            <strong>{item.label}</strong>
            <p>{item.value}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default PropertyDetails;
