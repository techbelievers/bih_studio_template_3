import React, { useState, useEffect } from "react";
import { API } from "../../../../../Config";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./LocationMap.module.css";

const LocationMap = ({ slug }) => {
  const [mapData, setMapData] = useState({ heading: "", map: "" });
  const [locationData, setLocationData] = useState([]);
  const [activeTab, setActiveTab] = useState("0–5 km");

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await fetch(API.LOCATION_MAP_STUDIO(slug));
        const data = await response.json();
        setMapData({
          heading: data.heading || "Prime Location",
          map: data.map || "",
        });
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };

    const fetchLocationData = async () => {
      try {
        const response = await fetch(API.LOCATION_ADVANTAGES_STUDIO(slug));
        const data = await response.json();
        setLocationData(data.location_advantages || []);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchMapData();
    fetchLocationData();
  }, [slug]);

  const groupedLocations = {
    "0–5 km": locationData.filter((item) => parseFloat(item.distance) <= 5),
    "5–10 km": locationData.filter((item) => parseFloat(item.distance) > 5 && parseFloat(item.distance) <= 10),
    "10+ km": locationData.filter((item) => parseFloat(item.distance) > 10),
  };

  return (
    <section id="location" className={styles.locationSection}>
      <motion.div 
        className={styles.mapWrapper}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className={styles.heading}>{mapData.heading}</h2>
        <div className={styles.mapContainer} dangerouslySetInnerHTML={{ __html: mapData.map }}></div>
      </motion.div>

      <motion.div className={styles.highlightsSection}>
        <h2 className={styles.heading}>Nearby Attractions</h2>
        <div className={styles.tabs}>
          {Object.keys(groupedLocations).map((tab) => (
            <motion.button
              key={tab}
              className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className={styles.groupItems}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {groupedLocations[activeTab].map((item) => (
              <motion.div 
                key={item.id} 
                className={styles.locationCard}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
              >
                <div className={styles.imageWrapper}>
                  <img src={item.location_image} alt={item.location} className={styles.image} />
                </div>
                <div className={styles.textWrapper}>
                  <h4 className={styles.locationName}>{item.location}</h4>
                  <p className={styles.distance}>{item.distance} km away</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default LocationMap;
