import React, { useState, useEffect } from 'react';
import '../css/Gallery.css'; // Ensure the path is correct
import { API } from '../../../Config'; // Use your config.js structure

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
    <div className="template1-gallery-container">
      <h2>{heading}</h2>
      <h4>{subheading}</h4>
      <div className="template1-gallery-grid">
        {galleryData.length > 0 ? (
          galleryData.map(photo => (
            <div
              key={photo.id}
              className="template1-gallery-item"
              onClick={() => openModal(photo.photo, photo.caption)}
            >
              <img src={photo.photo} alt={`Property ${photo.property_id}`} />
              <div className="template1-overlay">
                <div className="template1-overlay-text">View Image</div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading photos...</p>
        )}
      </div>

      {selectedImage && (
        <div className="template1-modal" onClick={closeModal}>
          <span className="template1-close">&times;</span>
          <img className="template1-modal-content" src={selectedImage} alt="Large view" />
          {caption && <div className="template1-caption">{caption}</div>}
        </div>
      )}
    </div>
  );
};

export default Gallery;
