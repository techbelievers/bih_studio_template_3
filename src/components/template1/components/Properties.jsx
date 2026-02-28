import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../css/Properties.module.css";
import { API } from "../../../../config.js";

const PropertiesSection = () => {
  const [properties, setProperties] = useState([]);
  const [sectionInfo, setSectionInfo] = useState({ heading: "", subheading: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(API.GET_PROPERTIES(), { timeout: 10000 });
        setProperties(response.data.property_details || []);
        if (response.data.page?.[0]) {
          setSectionInfo({
            heading: response.data.page[0].heading,
            subheading: response.data.page[0].subheading,
          });
        }
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.state}>
          <div className={styles.spinner} />
          <p>Loading properties...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.section}>
        <div className={styles.stateError}>
          <p>{error}</p>
          <p className={styles.stateSub}>Please try refreshing the page.</p>
        </div>
      </section>
    );
  }

  if (!properties?.length) {
    return (
      <section className={styles.section}>
        <div className={styles.state}>
          <h3>No properties available</h3>
          <p>Check back soon for new listings.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="properties" className={styles.section}>
      <header className={styles.head}>
        <h2 className={styles.headTitle}>
          {sectionInfo.heading || "Discover"}
        </h2>
        {sectionInfo.subheading && (
          <p className={styles.headSub}>{sectionInfo.subheading}</p>
        )}
      </header>

      <div className={styles.list}>
        {properties.map((property) => (
          <article
            key={property.id}
            className={styles.card}
            onClick={() => (window.location.href = `/studios/${property.property_slug}`)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                window.location.href = `/studios/${property.property_slug}`;
              }
            }}
            role="button"
            tabIndex={0}
          >
            <div className={styles.cardImage}>
              <img
                src={`https://buyindiahomes.in/uploads/property_featured_photos/${property.property_featured_photo || "default-image.jpg"}`}
                alt={property.property_name || "Property"}
                onError={(e) => { e.target.src = "/default-image.jpg"; }}
              />
              <span className={styles.cardPrice}>
                ₹ {property.property_price} Lakhs *
              </span>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>
                {property.property_name || "Premium Property"}
              </h3>
              {property.builder_name && (
                <p className={styles.cardMeta}>{property.builder_name}</p>
              )}
              {([property.sub_location, property.property_location_name].filter(Boolean).join(", ") || null) && (
                <p className={styles.cardLocation}>
                  {[property.sub_location, property.property_location_name].filter(Boolean).join(", ")}
                </p>
              )}
              <div className={styles.cardSpecs}>
                {property.property_type_price_range && (
                  <span>{property.property_type_price_range}</span>
                )}
                {property.property_price_range && (
                  <span>{property.property_price_range}</span>
                )}
              </div>
              <span className={styles.cardAction}>View details →</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PropertiesSection;
