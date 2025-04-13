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
    <div id="about" className={styles.propertyDetailsContainer}>
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


      {propertyDetails.property_specification && propertyDetails.property_specification.trim() !== "" && (
      <div className={styles.descriptionCardabout}>
        <h2 className={styles.sectionHeading}>About Builder</h2>
        <div
          className={`${styles.scrollableDescription} ${
            isExpanded ? styles.expanded : ''
          }`}
          dangerouslySetInnerHTML={{
            __html: isExpanded
              ? propertyDetails.property_specification
              : `${propertyDetails.property_specification}`,
          }}
        />
      </div>
      )}

    </div>
  );
};

export default PropertyDetails;
