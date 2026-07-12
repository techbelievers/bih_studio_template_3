import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../css/Properties.module.css";
import { API } from "../../../../config.js";
import { enrichPropertiesWithRera } from "../../../utils/reraSearch";

const PropertiesSection = () => {
  const [properties, setProperties] = useState([]);
  const [sectionInfo, setSectionInfo] = useState({ heading: "", subheading: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(API.GET_PROPERTIES(), { timeout: 10000 });
        const propertiesData = response.data.property_details || [];
        setProperties(propertiesData);
        if (response.data.page?.[0]) {
          setSectionInfo({
            heading: response.data.page[0].heading,
            subheading: response.data.page[0].subheading,
          });
        }
        // Attach RERA ids in the background so listings become searchable by
        // their MahaRERA number without blocking the initial render.
        enrichPropertiesWithRera(propertiesData).then((enriched) => {
          setProperties(enriched);
        });
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

  const normalizedQuery = query.trim().toLowerCase();
  const filteredProperties = normalizedQuery
    ? properties.filter((property) =>
        [
          property.property_name,
          property.builder_name,
          property.sub_location,
          property.property_location_name,
          ...(property.rera_ids || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)
      )
    : properties;

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

      <div className={styles.searchBar}>
        <svg
          className={styles.searchIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Search by name, builder, location or RERA ID…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search properties"
        />
        {query && (
          <button
            type="button"
            className={styles.searchClear}
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>

      {!filteredProperties.length ? (
        <div className={styles.state}>
          <h3>No matches found</h3>
          <p>Try a different name, builder or location.</p>
        </div>
      ) : (
      <div className={styles.list}>
        {filteredProperties.map((property) => (
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
      )}
    </section>
  );
};

export default PropertiesSection;
