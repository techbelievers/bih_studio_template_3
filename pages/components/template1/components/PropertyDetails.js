import React, { useEffect, useState } from 'react';
import styles from '../css/PropertyDetails.module.css'; // Add styling in this file
import { API } from '../../../../Config';

const PropertyDetails = () => {
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Fetch property details from the API
    fetch(API.PROPERTY_DETAILS())
      .then((response) => response.json())
      .then((data) => {
        setPropertyDetails(data.property_details);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching property details.");
        setLoading(false);
      });
  }, []);

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div id="about" className={styles.property_details_section}>
      {/* Render only when propertyDetails is loaded */}
      {propertyDetails && (
        <>
          <h1 className={styles.property_title}>{propertyDetails.property_name}</h1>
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
  );
};

export default PropertyDetails;
