import React, { useState, useEffect } from 'react';
import styles from '../css/Gallery.module.css'; // Ensure the path is correct
import { API } from '../../../../Config'; // Use your config.js structure

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [heading, setHeading] = useState("");
  const [subheading, setSubHeading] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // For modal view
  const [caption, setCaption] = useState(""); // For image caption

  useEffect(() => {
    fetch(API.GALLERY())
      .then(response => response.json())
      .then(data => {
        setGalleryData(data.property_photos);
        setHeading(data.page[0]?.heading || 'Gallery');
        setSubHeading(data.page[0]?.subheading || 'Elevate Your Living: Where Dreams Find a Home');
      })
      .catch(error => console.error('Error fetching gallery data:', error));
  }, []);

  const openModal = (photo, caption) => {
    setSelectedImage(photo);
    setCaption(caption);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setCaption("");
  };

  return (
    <div id="gallery" className={styles.galleryContainer}>
      <h2 className={styles.heading}>{heading}</h2>
      <h4 className={styles.subheading}>{subheading}</h4>
      <div className={styles.galleryGrid}>
        {galleryData.length > 0 ? (
          galleryData.map(photo => (
            <div
              key={photo.id}
              className={styles.galleryItem}
              onClick={() => openModal(photo.photo, photo.caption)}
            >
              <img src={photo.photo} alt={`Property ${photo.property_id}`} className={styles.image} />
              <div className={styles.overlay}>
                <div className={styles.overlayText}>View Image</div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading photos...</p>
        )}
      </div>

      {selectedImage && (
        <div className={styles.modal} onClick={closeModal}>
          <span className={styles.close}>&times;</span>
          <img className={styles.modalContent} src={selectedImage} alt="Large view" />
          {caption && <div className={styles.caption}>{caption}</div>}
        </div>
      )}
    </div>
  );
};

export default Gallery;
