import React, { useState, useEffect } from "react";
import { API } from "../../../../Config";
import styles from "../css/LocationMap.module.css";

const CompactLocation = () => {
  const [mapData, setMapData] = useState({ heading: "", map: "" });
  const [locationData, setLocationData] = useState([]);
  const [visibleItems, setVisibleItems] = useState(4); // Initially show 4 items

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await fetch(API.LOCATION_MAP());
        const data = await response.json();
        setMapData({
          heading: data.heading || "Location",
          map: data.map || "",
        });
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };

    const fetchLocationData = async () => {
      try {
        const response = await fetch(API.LOCATION_ADVANTAGES());
        const data = await response.json();
        setLocationData(data.location_advantages || []);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchMapData();
    fetchLocationData();
  }, []);

  const handleSeeMore = () => {
    setVisibleItems((prev) => prev + 4);
  };

  return (
    <section id="location" className={styles.compactLocation}>
      {/* Map and Highlights Header */}
      <div className={styles.header}>
        <h2 className={styles.heading}>{mapData.heading}</h2>
      </div>

      <div className={styles.contentWrapper}>
        {/* Map Section */}
        <div className={styles.mapContainer}>
          <div
            className={styles.map}
            dangerouslySetInnerHTML={{ __html: mapData.map }}
          ></div>
        </div>

        {/* Location Highlights Section */}
        <div className={styles.highlightsContainer}>
          {locationData.slice(0, visibleItems).map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img
                  src={item.location_image}
                  alt={item.location}
                  className={styles.image}
                />
              </div>
              <div className={styles.textWrapper}>
                <h3 className={styles.locationName}>{item.location}</h3>
                <p className={styles.distance}>{item.distance}</p>
              </div>
            </div>
          ))}
          {visibleItems < locationData.length && (
            <button onClick={handleSeeMore} className={styles.seeMoreButton}>
              See More
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CompactLocation;
