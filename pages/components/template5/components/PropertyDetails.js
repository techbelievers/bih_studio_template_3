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
          {propertyDetails.tagline || "Luxury Living at its Best"}
        </p>
      </div>

      {/* Description Section */}
      <div className={styles.descriptionCard}>
        <h2 className={styles.sectionHeading}>About the Property</h2>
        <div
          className={`${styles.description} ${
            isExpanded ? styles.expanded : ""
          }`}
          dangerouslySetInnerHTML={{
            __html: isExpanded
              ? propertyDetails.property_description
              : `${propertyDetails.property_description.slice(0, 1000)}...`,
          }}
        />
        <button className={styles.readMoreButton} onClick={handleReadMore}>
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </div>

      {/* Action Buttons Section */}
      <div className={styles.actionButtons}>
        {/* Call Now Button */}
        <button
          className={`${styles.callButton} ${styles.animatedButton}`}
          onClick={() => (window.location.href = "tel:+918600020568")}
        >
          <span className={styles.buttonIcon}>📞</span> Call Now
        </button>

        {/* Enquire Now Button */}
        <button
          className={`${styles.enquireButton} ${styles.animatedButton}`}
          onClick={() => setIsPopupOpen(true)} // Open popup on click
        >
          <span className={styles.buttonIcon}>✉️</span> Enquire Now
        </button>
      </div>

       {/* Description Section */}
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

      {/* Enquire Popup */}
      {isPopupOpen && <EnquirePopup onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default PropertyDetails;
