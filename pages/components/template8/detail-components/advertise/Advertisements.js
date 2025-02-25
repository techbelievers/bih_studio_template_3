import React, { useState, useEffect } from "react";
import { API } from "../../../../../Config";
import styles from "./Advertisements.module.css";

const Advertisements = ({ slug }) => {
  const [ads, setAds] = useState([]);
  const [heading, setHeading] = useState("");
  const [selectedAd, setSelectedAd] = useState(null);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await fetch(API.STUDIO_ADVERTISEMENT_SLUG(slug));
        const data = await response.json();
        setAds(data.advertisements || []);
        setHeading(data.page[0]?.heading || "Featured Advertisements");
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      }
    };
    fetchAdvertisements();
  }, []);

  if (!ads || ads.length === 0) return null; // Hide section if no ads

  return (
    <section className={styles.advertisementSection}>
      <h2 className={styles.heading}>{heading}</h2>
      
      {/* GRID LAYOUT */}
      <div className={styles.gridContainer}>
        {ads.map((ad, index) => (
          <div key={index} className={styles.gridItem} onClick={() => setSelectedAd(ad)}>
            {ad.above_category_1 && (
              <img src={ad.above_category_1} alt={`Advertisement ${index + 1}`} className={styles.adImage} />
            )}
          </div>
        ))}
      </div>

      {/* MODAL POPUP */}
      {selectedAd && (
        <div className={styles.modalOverlay} onClick={() => setSelectedAd(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setSelectedAd(null)}>✖</button>
            <img src={selectedAd.above_category_1} alt="Ad Detail" className={styles.modalImage} />
            <a href={selectedAd.above_category_1_url || "#"} target="_blank" rel="noopener noreferrer" className={styles.visitButton}>Visit</a>
          </div>
        </div>
      )}
    </section>
  );
};

export default Advertisements;
