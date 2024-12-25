import React, { useState, useEffect } from "react";
import { API } from "../../../../../Config";
import styles from "./Amenities.module.css";

const Amenities = ({ slug }) => {
  const [amenitiesData, setAmenitiesData] = useState([]);
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");

  useEffect(() => {
    const fetchAmenitiesData = async () => {
      try {
        const response = await fetch(API.AMENITIES_STUDIO(slug));
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setAmenitiesData(data.amenities?.amenities || []);
        setHeading(data.amenities?.page?.heading || "Amenities");
        setSubHeading(
          data.amenities?.page?.subheading ||
            "Discover the features that enhance your living experience"
        );
      } catch (error) {
        console.error("Error fetching amenities data:", error);
      }
    };

    fetchAmenitiesData();
  }, [slug]);

  return (
    <section id="amenities" className={styles.amenitiesSection}>
      <div className={styles.container}>
        <div className={styles.headingContainer}>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.subHeading}>{subHeading}</p>
        </div>
        <div className={styles.grid}>
          {amenitiesData.map((amenity, index) => (
            <div
              key={amenity.id}
              className={`${styles.card} ${styles.fadeIn}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={amenity.property_amenities_photo}
                  alt={amenity.amenity_name}
                  className={styles.image}
                />
              </div>
              <h3 className={styles.name}>{amenity.amenity_name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
