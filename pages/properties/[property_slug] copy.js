import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API, DEFAULT_DOMAIN } from '../../Config'; 
import styles from "./index.module.css"; // Ensure the CSS module path is correct

const PropertyDetails = () => {
  const router = useRouter();
  const { property_slug } = router.query; // Get the slug from the route
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (!property_slug) return; // Avoid running before the slug is available
      try {
        const response = await fetch(`${API.PROPERTY_DETAILS_STUDIO(property_slug)}`);
        const data = await response.json();
        setProperty(data.property_details);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch property details.");
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [property_slug]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.propertyDetailsContainer}>
      <h1 className={styles.propertyName}>{property.property_name}</h1>
      <img
        src={property.property_image || "/default-image.png"}
        alt={property.property_name}
        className={styles.propertyImage}
      />
      <p className={styles.propertyDescription}>
        {property.property_description}
      </p>
      <div className={styles.propertyMeta}>
        <p>
          <strong>Location:</strong> {property.location || "N/A"}
        </p>
        <p>
          <strong>Price Range:</strong> {property.property_price_range || "N/A"}
        </p>
        <p>
          <strong>Last Updated:</strong> {property.last_updated || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default PropertyDetails;
