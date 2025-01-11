import React, { useState, useEffect } from "react";
import styles from "./Gallery.module.css";
import { API } from "../../../../../Config";

const RealEstateGallery = ({ slug }) => {
  const [galleryData, setGalleryData] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    fetch(API.GALLERY_STUDIO(slug))
      .then((response) => response.json())
      .then((data) => {
        setGalleryData(data.property_photos);
      })
      .catch((error) => console.error("Error fetching gallery data:", error));
  }, [slug]);

  const nextImage = () =>
    setSelectedImageIndex((prevIndex) =>
      prevIndex + 1 < galleryData.length ? prevIndex + 1 : 0
    );

  const prevImage = () =>
    setSelectedImageIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : galleryData.length - 1
    );

  return (
    <section className={styles.gallerySection}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Luxury Property Showcase</h2>
        <p className={styles.subheading}>Explore exquisite properties in stunning visuals</p>

        {/* Main Image Display */}
        <div className={styles.mainImageContainer}>
          {galleryData.length > 0 && (
            <>
              <button className={styles.prevButton} onClick={prevImage}>&#10094;</button>
              <img src={galleryData[selectedImageIndex].photo} alt="Property View" className={styles.mainImage} />
              <button className={styles.nextButton} onClick={nextImage}>&#10095;</button>
            </>
          )}
        </div>

        {/* Thumbnail Navigation */}
        <div className={styles.thumbnailContainer}>
          {galleryData.map((photo, index) => (
            <img
              key={index}
              src={photo.photo}
              alt="Thumbnail"
              className={`${styles.thumbnail} ${index === selectedImageIndex ? styles.activeThumbnail : ""}`}
              onClick={() => setSelectedImageIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealEstateGallery;
