import React, { useState, useEffect } from 'react';
import styles from '../css/Gallery.module.css';
import { API } from '../../../../config.js';

const RealEstateGallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [heading, setHeading] = useState('');
  const [subheading, setSubHeading] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch(API.GALLERY())
      .then((response) => response.json())
      .then((data) => {
        setGalleryData(data.property_photos);
        setHeading(data.page[0]?.heading || 'Gallery');
        setSubHeading(data.page[0]?.subheading || 'Explore Stunning Properties');
      })
      .catch((error) => console.error('Error fetching gallery data:', error));
  }, []);

  const openModal = (image) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  if (!galleryData.length) {
    return <p className={styles.loadingText}>Loading gallery...</p>;
  }

  return (
    <div id="gallery" className={styles.galleryContainer}>
      <h2 className={styles.luxuryHeading}>{heading}</h2>
      <p className={styles.subheading}>{subheading}</p>
      <div className={styles.galleryGrid}>
        {galleryData.map((photo) => (
          <div
            key={photo.id}
            className={styles.galleryItem}
            onClick={() => openModal(photo.photo)}
          >
            <div className={styles.imageWrapper}>
              <img
                src={photo.photo}
                alt={`Property ${photo.property_id}`}
                className={styles.image}
              />
              <div className={styles.clipOverlay}></div>
            </div>
            {photo.caption && <p className={styles.caption}>{photo.caption}</p>}
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent}>
            <img src={selectedImage} alt="Enlarged View" className={styles.modalImage} />
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealEstateGallery;
