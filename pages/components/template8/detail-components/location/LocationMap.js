import React, { useState, useEffect, useRef } from "react";
import { API } from "../../../../../Config";
import { motion } from "framer-motion";
import styles from "./LocationMap.module.css";

const LocationMap = ({ slug }) => {
  const [mapData, setMapData] = useState({ heading: "", map: "" });
  const [locationData, setLocationData] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await fetch(API.LOCATION_MAP_STUDIO(slug));
        const data = await response.json();
        setMapData({ heading: data.heading || "Prime Location", map: data.map || "" });
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

  return (
    <section id="location" className={styles.locationSection}>
       <h2 className={styles.heading}>{mapData.heading}</h2>
      {/* Fullscreen Map */}
      <motion.div 
  className={styles.mapWrapper}
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
>
 
  <div className={styles.mapContainer} dangerouslySetInnerHTML={{ __html: mapData.map }}></div>
</motion.div>


      {/* Horizontal Scroll Section */}
      <motion.div className={styles.locationScrollWrapper}>
        <h2 className={styles.subHeading}>Nearby Attractions</h2>

        <div className={styles.scrollContainer} ref={scrollRef}>
          {locationData.map((item) => (
            <motion.div 
              key={item.id} 
              className={styles.locationCard}
              whileHover={{ scale: 1.05 }}
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
        </div>

        {/* Scroll Buttons */}
        <button className={styles.scrollLeft} onClick={() => scrollRef.current.scrollBy({ left: -200, behavior: "smooth" })}>‹</button>
        <button className={styles.scrollRight} onClick={() => scrollRef.current.scrollBy({ left: 200, behavior: "smooth" })}>›</button>
      </motion.div>
    </section>
  );
};

export default LocationMap;
