import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // For animations
import axios from "axios";
import styles from "../css/Properties.module.css"; // Updated CSS Module
import { API } from "../../../../Config";

const PropertiesSection = () => {
  const [properties, setProperties] = useState([]);
  const [sectionInfo, setSectionInfo] = useState({ heading: "", subheading: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(API.GET_PROPERTIES());
        setProperties(response.data.property_details);
        if (response.data.page && response.data.page.length > 0) {
          setSectionInfo({
            heading: response.data.page[0].heading,
            subheading: response.data.page[0].subheading,
          });
        }
      } catch (err) {
        setError("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <div className={styles.propertiesSection}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={styles.propertiesSection}>
        Error loading properties: {error}
      </div>
    );
  }

  return (
    <section id="properties" className={styles.propertiesSection}>
      <div className={styles.header}>
        <h2>{sectionInfo.heading}</h2>
        <p>{sectionInfo.subheading}</p>
      </div>
      <div className={styles.propertiesGrid}>
        {properties.map((property) => (
          <motion.div
            className={styles.propertyCard}
            key={property.id}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
            }}
            transition={{ duration: 0.3 }}
            onClick={() => (window.location.href = `/studios/${property.property_slug}`)}
          >
            <div className={styles.cardImage}>
              <img
                src={`https://buyindiahomes.in/uploads/property_featured_photos/${property.property_featured_photo || "default-image.jpg"}`}
                alt={property.property_name}
              />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.propertyName}>{property.property_name}</h3>
              <p className={styles.builderName}>By: {property.builder_name}</p>
              <div className={styles.propertyDetails}>
                <p>
                  <strong>Type:</strong> {property.property_type_price_range}
                </p>
                <p>
                  <strong>Size:</strong> {property.property_price_range}
                </p>
                <p>
                  <strong>Price:</strong> ₹{property.property_price} Lakhs
                </p>
              </div>
              <p className={styles.lastUpdated}>
                <em>Last Updated: {property.last_updated}</em>
              </p>
              <button className={styles.viewButton}>View Details</button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PropertiesSection;
