import React, { useState, useEffect } from "react";
import { API } from "../../../../config.js";
import styles from "../css/LocationHighlights.module.css";

const LocationHighlights = () => {
  const [items, setItems] = useState([]);
  const [heading, setHeading] = useState("");
  const [show, setShow] = useState(8);

  useEffect(() => {
    fetch(API.LOCATION_ADVANTAGES())
      .then((res) => res.json())
      .then((data) => {
        setItems(data.location_advantages || []);
        setHeading(data.page?.[0]?.heading || "Location advantages");
      })
      .catch(console.error);
  }, []);

  if (!items.length) return null;

  const list = items.slice(0, show);
  const hasMore = show < items.length;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{heading}</h2>
      <div className={styles.grid}>
        {list.map((item) => (
          <div key={item.id} className={styles.card}>
            {item.location_image && (
              <img src={item.location_image} alt={item.location} className={styles.img} />
            )}
            <div className={styles.body}>
              <h3 className={styles.name}>{item.location}</h3>
              {item.distance && <p className={styles.dist}>{item.distance}</p>}
              {item.description && <p className={styles.desc}>{item.description}</p>}
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className={styles.moreWrap}>
          <button type="button" className={styles.more} onClick={() => setShow((s) => s + 8)}>
            See more
          </button>
        </div>
      )}
    </section>
  );
};

export default LocationHighlights;
