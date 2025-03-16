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

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": propertyDetails.property_name,
    "description": propertyDetails.property_description,
    "url": `${process.env.SITE_URL}/property/${propertyDetails.id}`,
    "image": propertyDetails.property_image,
  };

  return (
    <>
    
    <div id="about" className={styles.property_details_section}>
      <h2 className={styles.property_title}>{propertyDetails.property_name}</h2>
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
    </div>

    {propertyDetails.property_specification && propertyDetails.property_specification.trim() !== "" && (
    <div id="about" className={styles.property_details_section}>
      <h2 className={styles.property_title}>About Builders</h2>
      <div
        className={styles.property_description}
        dangerouslySetInnerHTML={{
          __html: isExpanded
            ? propertyDetails.property_specification
            : `${propertyDetails.property_specification}`,
        }}
      />
  
    </div>
    )}


    </>
  );
};


export default PropertyDetails;
