import React, { useState } from 'react';
import styles from '../css/PropertyDetails.module.css';
import { API } from '../../../../Config';

const PropertyDetails = ({ propertyDetails, error }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!propertyDetails) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div id="about" className={styles.property_details_section}>
      <h1 className={styles.property_title}>{propertyDetails.property_name}</h1>
      <div
        className={styles.property_description}
        dangerouslySetInnerHTML={{
          __html: isExpanded
            ? propertyDetails.property_description
            : `${propertyDetails.property_description.slice(0, 1000)}...`,
        }}
      />
      <button className={styles.read_more_btn} onClick={handleReadMore}>
        {isExpanded ? 'Read Less' : 'Read More'}
      </button>
    </div>
  );
};


export default PropertyDetails;
