import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // For animations
import axios from "axios";
import styles from "../css/Properties.module.css"; // Updated CSS Module
import { API } from "../../../../config.js";

const PropertiesSection = () => {
  const [properties, setProperties] = useState([]);
  const [sectionInfo, setSectionInfo] = useState({ heading: "", subheading: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Prefetch data immediately when component mounts
    const fetchProperties = async () => {
      try {
        const response = await axios.get(API.GET_PROPERTIES(), {
          // Add timeout to prevent hanging
          timeout: 10000,
        });
        setProperties(response.data.property_details || []);
        if (response.data.page && response.data.page.length > 0) {
          setSectionInfo({
            heading: response.data.page[0].heading,
            subheading: response.data.page[0].subheading,
          });
        }
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    // Start fetching immediately, don't wait for intersection
    fetchProperties();
  }, []);

  if (loading) {
    return (
      <section className={styles.propertiesSection}>
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading properties...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.propertiesSection}>
        <div className={styles.errorState}>
          <span className={styles.errorIcon}>⚠️</span>
          <p>Error loading properties: {error}</p>
          <p className={styles.errorSubtext}>Please try refreshing the page</p>
        </div>
      </section>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <section className={styles.propertiesSection}>
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>🏠</span>
          <h3>No Properties Available</h3>
          <p>Check back soon for new property listings</p>
        </div>
      </section>
    );
  }

  return (
    <section id="properties" className={styles.propertiesSection}>
      {/* Unique Header Design */}
      <div className={styles.sectionHeader}>
        <div className={styles.headerBadge}>
          <span>🏢</span>
          <span>Premium Properties</span>
        </div>
        <h2 className={styles.heading}>
          <span className={styles.headingAccent}>{sectionInfo.heading || "Discover Your Dream"}</span>
          <span className={styles.headingSubtext}>Home</span>
        </h2>
        {sectionInfo.subheading && (
          <p className={styles.subheading}>{sectionInfo.subheading}</p>
        )}
        <div className={styles.headerDivider}></div>
      </div>

      {/* Fixed Grid Layout - Better Alignment */}
      <div className={styles.propertiesContainer}>
        {properties.map((property, index) => {
          // Fixed: Card variants - CSS handles responsive behavior
          // Large cards: Every 4th card (when enough cards exist)
          const isLarge = properties.length > 4 && index % 4 === 0;
          // Wide cards: Every 5th card (when enough cards exist)
          const isWide = properties.length > 5 && index % 5 === 0;
          
          return (
            <motion.div
              className={`${styles.propertyCard} ${isLarge ? styles.largeCard : ''} ${isWide ? styles.wideCard : ''}`}
              key={property.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => (window.location.href = `/studios/${property.property_slug}`)}
            >
              {/* Card Image with Overlay */}
                <div className={styles.imageContainer}>
                <img
                  src={`https://buyindiahomes.in/uploads/property_featured_photos/${property.property_featured_photo || "default-image.jpg"}`}
                  alt={property.property_name || "Property"}
                  className={styles.propertyImage}
                  onError={(e) => {
                    e.target.src = "/default-image.jpg";
                  }}
                />
                <div className={styles.imageOverlay}>
                  <div className={styles.priceBadge}>
                    <span className={styles.priceSymbol}>₹</span>
                    <span className={styles.priceAmount}>{property.property_price}</span>
                    <span className={styles.priceUnit}>Lakhs</span>
                  </div>
                  <div className={styles.quickView}>
                    <span>👁️</span>
                    <span>Quick View</span>
                  </div>
                </div>
                <div className={styles.cardGradient}></div>
              </div>

              {/* Card Content - Unique Layout */}
              <div className={styles.cardBody}>
                <div className={styles.cardHeader}>
                  <div className={styles.propertyInfo}>
                    <h3 className={styles.propertyName}>
                      {property.property_name || "Premium Property"}
                    </h3>
                    {property.builder_name && (
                      <div className={styles.builderTag}>
                        <span className={styles.builderIcon}>🏗️</span>
                        <span>{property.builder_name}</span>
                      </div>
                    )}
                  </div>
                  {index < 3 && (
                    <div className={styles.propertyBadge}>
                      <span>New</span>
                    </div>
                  )}
                </div>

                {/* Location with Icon */}
                {property.sub_location && (
                  <div className={styles.locationInfo}>
                    <span className={styles.locationIcon}>📍</span>
                    <span className={styles.locationText}>{property.sub_location}</span>
                  </div>
                )}

                {/* Property Details Grid */}
                <div className={styles.detailsGrid}>
                  {property.property_type_price_range && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailIcon}>🏠</span>
                      <div className={styles.detailContent}>
                        <span className={styles.detailLabel}>Type</span>
                        <span className={styles.detailValue}>{property.property_type_price_range}</span>
                      </div>
                    </div>
                  )}
                  {property.property_price_range && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailIcon}>📐</span>
                      <div className={styles.detailContent}>
                        <span className={styles.detailLabel}>Size</span>
                        <span className={styles.detailValue}>{property.property_price_range}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <motion.button
                  className={styles.viewButton}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `/studios/${property.property_slug}`;
                  }}
                >
                  <span>View Details</span>
                  <span className={styles.buttonArrow}>→</span>
                </motion.button>
              </div>

              {/* Corner Decoration */}
              <div className={styles.cornerDecoration}></div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default PropertiesSection;
