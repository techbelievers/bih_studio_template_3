import React, { useEffect, useState } from 'react';
import '../css/PropertyDetails.css'; // Add styling in this file

const PropertyDetails = () => {
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Fetch property details from the API
    fetch("http://buyindiahomes.in/api/propert-details?website=buyindiahomes.in")
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
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="property-details-section">
      {/* Render only when propertyDetails is loaded */}
      {propertyDetails && (
        <>
          <h1 className="property-title">{propertyDetails.property_name}</h1>
          <div
            className="property-description"
            dangerouslySetInnerHTML={{ __html: isExpanded ? propertyDetails.property_description : `${propertyDetails.property_description.slice(0, 1000)}...` }}
          />
          <button className="read-more-btn" onClick={handleReadMore}>
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        </>
      )}
    </div>
  );
};

export default PropertyDetails;
