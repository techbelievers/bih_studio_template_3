import React, { useState } from 'react';
import styles from './PropertyDetails.module.css';

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
    <div id="about" className={styles.propertyDetailsContainer}>
      {/* Clip Path Background */}
      <div className={styles.clipPathBackground}></div>

      {/* Header */}
      <div className={styles.headerCard}>
        <h1 className={styles.heading}>{propertyDetails.property_name}</h1>
        <p className={styles.propertyTagline}>
          {propertyDetails.tagline || 'Luxury Living at its Best'}
        </p>
      </div>

      {/* Description Section */}
      <div className={styles.descriptionCard}>
        <h2 className={styles.sectionHeading}>About the Property</h2>
        <div
          className={`${styles.description} ${
            isExpanded ? styles.expanded : ''
          }`}
          dangerouslySetInnerHTML={{
            __html: isExpanded
              ? propertyDetails.property_description
              : `${propertyDetails.property_description.slice(0, 2000)}...`,
          }}
        />
        <button className={styles.readMoreButton} onClick={handleReadMore}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </div>
    
    </div>
  );
};

export default PropertyDetails;
