import React, { useState, useEffect } from "react";
import { API } from "../../../../config.js";
import styles from "../css/Amenities.module.css";

const Amenities = () => {
  const [list, setList] = useState([]);
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");

  useEffect(() => {
    fetch(API.AMENITIES())
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => {
        setList(data.amenities?.amenities || []);
        setHeading(data.amenities?.page?.heading || "Amenities");
        setSubHeading(data.amenities?.page?.subheading || "Features that enhance your living experience.");
      })
      .catch(console.error);
  }, []);

  if (!list.length) return null;

  return (
    <section id="amenities" className={styles.section}>
      <h2 className={styles.title}>{heading}</h2>
      {subHeading && <p className={styles.sub}>{subHeading}</p>}
      <div className={styles.grid}>
        {list.map((a) => (
          <article key={a.id} className={styles.card}>
            <div className={styles.imgWrap}>
              <img src={a.property_amenities_photo} alt={a.amenity_name} className={styles.img} />
            </div>
            <h3 className={styles.name}>{a.amenity_name}</h3>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Amenities;
