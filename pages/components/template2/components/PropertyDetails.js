import React, { useEffect, useState } from 'react';
import styles from '../css/PropertyDetails.module.css'; // Add styling in this file
import { API } from '../../../../Config';

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
    <>
    <div id="about" className={styles.property_details_section}>
      {/* Render only when propertyDetails is loaded */}
      {propertyDetails && (
        <>
          <h2 className={styles.luxuryHeading}>{propertyDetails.property_name}</h2>
          <div
            className={styles.property_description}
            dangerouslySetInnerHTML={{ __html: isExpanded ? propertyDetails.property_description : `${propertyDetails.property_description.slice(0, 1000)}...` }}
          />
          <button className={styles.read_more_btn} onClick={handleReadMore}>
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        </>
      )}
    </div>

    {propertyDetails.property_specification && propertyDetails.property_specification.trim() !== "" && (
    <div id="about" className={styles.property_details_section}>
      {/* Render only when propertyDetails is loaded */}
      {propertyDetails && (
        <>
          <h2 className={styles.luxuryHeading}>About Builders</h2>
          <div
            className={styles.property_description}
            dangerouslySetInnerHTML={{ __html: isExpanded ? propertyDetails.property_specification : `${propertyDetails.property_specification}` }}
          />
       
        </>
      )}
    </div>
    )}

    </>
  );
};

export default PropertyDetails;
