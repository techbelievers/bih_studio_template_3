import React, { useState } from "react";
import styles from "../css/PropertyDetails.module.css";
import EnquirePopup from "./EnquirePopup"; // Import the popup component

const PropertyDetails = ({ propertyDetails, error }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  if (!propertyDetails) {
    return <div className={styles.loading}> Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div id="about" className={styles.propertyDetailsContainer}>
   
       {/* Description Section */}
       {propertyDetails.property_information && propertyDetails.property_information.trim() !== "" && (
       <div className={styles.descriptionCard}>
        <h2 className={styles.sectionHeading}>Property Information</h2>
        <div
  className={`${styles.description} ${isExpanded ? styles.expanded : ''} ${styles.scrollableDescription}`}
  dangerouslySetInnerHTML={{
    __html: isExpanded
      ? propertyDetails.property_information
      : `${propertyDetails.property_information}`,
  }}
/>

      </div>
       )}

      {/* Enquire Popup */}
      {isPopupOpen && <EnquirePopup onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default PropertyDetails;
