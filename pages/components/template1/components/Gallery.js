import React, { useState, useEffect } from 'react';
import styles from '../css/Gallery.module.css'; // Ensure the path is correct
import { API } from '../../../../Config'; // Use your config.js structure
// import { color } from 'chart.js/helpers';

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [heading, setHeading] = useState("");
  const [subheading, setSubHeading] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // For modal view
  const [caption, setCaption] = useState(""); // For image caption

  useEffect(() => {
    // Fetch the gallery data using API from config
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
    <div id="gallery" className={styles.template1_gallery_container}>
        <br></br>
      <h2>{heading}</h2>
      <h3>{subheading}</h3>
      <div className={styles.template1_gallery_grid}>
        {galleryData.length > 0 ? (
          galleryData.map(photo => (
            <div
              key={photo.id}
              className={styles.template1_gallery_item}
              onClick={() => openModal(photo.photo, photo.caption)}
            >
              <img src={photo.photo} alt={`Property ${photo.property_id}`} />
              <div className={styles.template1_overlay}>
                <div className={styles.template1_overlay_text}>View Image</div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading photos...</p>
        )}
      </div>

      {selectedImage && (
        <div className={styles.template1_modal} onClick={closeModal}>
          <span className={styles.template1_close}>&times;</span>
          <img className={styles.template1_modal_content} src={selectedImage} alt="Large view" />
          {caption && <div className={styles.template1_caption}>{caption}</div>}
        </div>
      )}
    </div>
  );
};

export default Gallery;
