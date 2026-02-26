import React, { useState } from "react";
import styles from "../css/PropertyDetails.module.css";

const PropertyDetails = ({ propertyDetails, error }) => {
  const [expanded, setExpanded] = useState(false);

  if (!propertyDetails) return <div className={styles.loading}>Loading…</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  const html = propertyDetails.studio_description || propertyDetails.property_description || "";
  const short = html.slice(0, 800);
  const isLong = html.length > 800;
  const showShort = !expanded && isLong;

  return (
    <section id="about" className={styles.section}>
      <h2 className={styles.title}>About this property</h2>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: showShort ? short + (isLong ? "…" : "") : html,
        }}
      />
      {isLong && (
        <button type="button" className={styles.toggle} onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </section>
  );
};

export default PropertyDetails;
