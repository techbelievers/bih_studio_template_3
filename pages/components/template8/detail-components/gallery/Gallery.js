import React, { useState, useEffect } from "react";
import styles from "./Gallery.module.css";
import { API } from "../../../../../Config";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

const RealEstateGallery = ({ slug }) => {
  const [galleryData, setGalleryData] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    fetch(API.GALLERY_STUDIO(slug))
      .then((response) => response.json())
      .then((data) => {
        setGalleryData(data.property_photos);
      })
      .catch((error) => console.error("Error fetching gallery data:", error));
  }, [slug]);

  const openLightbox = (index) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);
  const nextImage = () =>
    setSelectedImageIndex((prevIndex) =>
      prevIndex + 1 < galleryData.length ? prevIndex + 1 : 0
    );
  const prevImage = () =>
    setSelectedImageIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : galleryData.length - 1
    );

  return (
    <section id="gallery" className={styles.gallerySection}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Luxury Property Showcase</h2>
        <p className={styles.subheading}>Explore exquisite properties in stunning visuals</p>

        {/* Masonry Thumbnail Grid */}
        <div className={styles.masonryGrid}>
          {galleryData.map((photo, index) => (
            <div
              key={index}
              className={styles.masonryItem}
              onClick={() => openLightbox(index)}
            >
              <img src={photo.photo} alt="Thumbnail" className={styles.thumbnail} />
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImageIndex !== null && (
          <div className={styles.lightbox}>
            <button className={styles.closeButton} onClick={closeLightbox}>
              <FaTimes />
            </button>
            <button className={styles.prevButton} onClick={prevImage}>
              <FaChevronLeft />
            </button>
            <img
              src={galleryData[selectedImageIndex].photo}
              alt="Property View"
              className={styles.lightboxImage}
            />
            <button className={styles.nextButton} onClick={nextImage}>
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RealEstateGallery;
