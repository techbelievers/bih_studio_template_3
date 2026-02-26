import React, { useState, useEffect } from "react";
import styles from "../css/Gallery.module.css";
import { API } from "../../../../config.js";

const RealEstateGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [modal, setModal] = useState(null);

  useEffect(() => {
    fetch(API.GALLERY())
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data.property_photos || []);
        setHeading(data.page?.[0]?.heading || "Gallery");
        setSubheading(data.page?.[0]?.subheading || "");
      })
      .catch(console.error);
  }, []);

  if (!photos.length) return null;

  return (
    <section id="gallery" className={styles.section}>
      <h2 className={styles.title}>{heading}</h2>
      {subheading && <p className={styles.sub}>{subheading}</p>}
      <div className={styles.grid}>
        {photos.map((photo) => (
          <button
            key={photo.id}
            type="button"
            className={styles.item}
            onClick={() => setModal(photo.photo)}
          >
            <img src={photo.photo} alt={photo.caption || "Gallery"} className={styles.img} />
            {photo.caption && <span className={styles.cap}>{photo.caption}</span>}
          </button>
        ))}
      </div>
      {modal && (
        <div className={styles.overlay} onClick={() => setModal(null)} role="dialog" aria-modal="true">
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <img src={modal} alt="Enlarged" className={styles.modalImg} />
            <button type="button" className={styles.close} onClick={() => setModal(null)} aria-label="Close">×</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default RealEstateGallery;
