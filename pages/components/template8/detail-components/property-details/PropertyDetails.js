import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./PropertyDetails.module.css";

const PropertyDetails = ({ propertyDetails, error }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  if (!propertyDetails) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <section id="about" className={styles.propertyDetailsContainer}>
      {/* Background Overlay */}
      <div className={styles.backgroundOverlay}></div>

      {/* Property Header */}
      <motion.div 
        className={styles.headerCard}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className={styles.heading}>{propertyDetails.property_name}</h1>
        <p className={styles.propertyTagline}>
          {propertyDetails.tagline || "Luxury Living at its Finest"}
        </p>
      </motion.div>

      {/* Description Section */}
      <motion.div 
        className={styles.descriptionCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className={styles.sectionHeading}>About the Property</h2>

        <AnimatePresence>
          <motion.div
            className={`${styles.description} ${isExpanded ? styles.expanded : ""}`}
            key={isExpanded ? "expanded" : "collapsed"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <p
              dangerouslySetInnerHTML={{
                __html: isExpanded
                  ? propertyDetails.property_description
                  : `${propertyDetails.property_description.slice(0, 600)}...`,
              }}
            />
          </motion.div>
        </AnimatePresence>

        <motion.button 
          className={styles.readMoreButton} 
          onClick={handleReadMore}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          {isExpanded ? "Read Less" : "Read More"}
        </motion.button>
      </motion.div>
    </section>
  );
};

export default PropertyDetails;
