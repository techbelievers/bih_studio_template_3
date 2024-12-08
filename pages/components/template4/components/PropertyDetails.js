import React, { useState } from 'react';
import styles from '../css/PropertyDetails.module.css';

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
    <div className={styles.propertyDetailsContainer}>
      {/* Header */}
      <div className={styles.headerCard}>
        <h1 className={styles.propertyName}>{propertyDetails.property_name}</h1>
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
              : `${propertyDetails.property_description.slice(0, 1000)}...`,
          }}
        />
        <button className={styles.readMoreButton} onClick={handleReadMore}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </div>

      {/* Icon Section */}
      {/* <div className={styles.realEstateIcons}>
        <div className={styles.iconCard}>
          <img
            src="https://example.com/icon1.png"
            alt="Icon 1"
            className={styles.iconImage}
          />
          <p className={styles.iconLabel}>Prime Location</p>
        </div>
        <div className={styles.iconCard}>
          <img
            src="https://example.com/icon2.png"
            alt="Icon 2"
            className={styles.iconImage}
          />
          <p className={styles.iconLabel}>Spacious Interiors</p>
        </div>
        <div className={styles.iconCard}>
          <img
            src="https://example.com/icon3.png"
            alt="Icon 3"
            className={styles.iconImage}
          />
          <p className={styles.iconLabel}>World-Class Amenities</p>
        </div>
      </div> */}
    </div>
  );
};

export default PropertyDetails;
