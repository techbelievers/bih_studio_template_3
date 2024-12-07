import React, { useState } from 'react';
import styles from '../css/PropertyDetails.module.css'; // CSS Module

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
      {/* Title Section */}
      <div className={styles.headerCard}>
        <h1 className={styles.propertyName}>{propertyDetails.property_name}</h1>
        <p className={styles.propertyTagline}>
          {/* {propertyDetails.tagline || 'Discover Luxury'} */}
        </p>
      </div>

      {/* Property Description */}
      <div className={styles.descriptionCard}>
        <h2 className={styles.sectionHeading}>About the Property</h2>
        <div
          className={`${styles.description} ${
            isExpanded ? styles.expanded : ''
          }`}
          dangerouslySetInnerHTML={{
            __html: isExpanded
              ? propertyDetails.property_description
              : `${propertyDetails.property_description.slice(0, 700)}...`,
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
