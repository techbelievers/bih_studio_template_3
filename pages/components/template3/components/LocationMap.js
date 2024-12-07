import React, { useState, useEffect } from "react";
import { API } from "../../../../Config";
import styles from "../css/LocationMap.module.css";

const LuxuriousLocation = () => {
  const [mapData, setMapData] = useState({ heading: "", subheading: "", map: "" });
  const [locationData, setLocationData] = useState([]);
  const [heading, setHeading] = useState("");
  const [visibleItems, setVisibleItems] = useState(8); // Initially show 8 items

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await fetch(API.LOCATION_MAP());
        const data = await response.json();
        setMapData({
          heading: data.heading || "Location",
          subheading: data.subheading || "",
          map: data.map || "",
        });
      } catch (error) {
        console.error("Error fetching location map data:", error);
      }
    };

    const fetchLocationData = async () => {
      try {
        const response = await fetch(API.LOCATION_ADVANTAGES());
        const data = await response.json();
        setLocationData(data.location_advantages);
        setHeading(data.page[0]?.heading || "Location Highlights");
      } catch (error) {
        console.error("Error fetching location advantages data:", error);
      }
    };

    fetchMapData();
    fetchLocationData();
  }, []);

  const handleSeeMore = () => {
    setVisibleItems((prev) => prev + 8); // Show more items on click
  };

  return (
    <section className={styles.luxuriousLocation}>
      {/* Location Map Section */}
      <div className={styles.mapSection}>
        <h2 className={styles.mapHeading}>{mapData.heading}</h2>
        {mapData.subheading && <h4 className={styles.mapSubheading}>{mapData.subheading}</h4>}
        <div
          className={styles.mapContainer}
          dangerouslySetInnerHTML={{ __html: mapData.map }}
        ></div>
      </div>

      {/* Location Highlights Section */}
      <div className={styles.highlightsSection}>
        <h2 className={styles.highlightsHeading}>{heading}</h2>
        <div className={styles.highlightsGrid}>
          {locationData.slice(0, visibleItems).map((item) => (
            <div key={item.id} className={styles.highlightCard}>
              <div className={styles.imageContainer}>
                <img
                  src={item.location_image}
                  alt={item.location}
                  className={styles.image}
                />
              </div>
              <div className={styles.textContainer}>
                <h3 className={styles.locationName}>{item.location}</h3>
                <p className={styles.distance}>{item.distance}</p>
                <p className={styles.description}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        {visibleItems < locationData.length && (
          <button onClick={handleSeeMore} className={styles.seeMoreButton}>
            See More
          </button>
        )}
      </div>
    </section>
  );
};

export default LuxuriousLocation;
