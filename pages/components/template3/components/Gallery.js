import React, { useState, useEffect } from 'react';
import styles from '../css/Gallery.module.css';
import { API } from '../../../../Config';

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [heading, setHeading] = useState('');
  const [subheading, setSubHeading] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(API.GALLERY())
      .then((response) => response.json())
      .then((data) => {
        setGalleryData(data.property_photos);
        setHeading(data.page[0]?.heading || 'Gallery');
        setSubHeading(data.page[0]?.subheading || 'Elevate Your Living: Where Dreams Find a Home');
      })
      .catch((error) => console.error('Error fetching gallery data:', error));
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? galleryData.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === galleryData.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!galleryData.length) {
    return <p className={styles.loadingText}>Loading photos...</p>;
  }

  return (
    <div id="gallery" className={styles.galleryContainer}>
      <h2 className={styles.luxuryHeading}>{heading}</h2>
      <h3 className={styles.subheading}>{subheading}</h3>

      <div className={styles.carousel}>
        {/* Navigation Arrows */}
        <button className={styles.navButton} onClick={prevSlide}>
          &#10094;
        </button>
        <div className={styles.carouselItem}>
          <img
            src={galleryData[currentIndex]?.photo}
            alt={`Property ${galleryData[currentIndex]?.property_id}`}
            className={styles.carouselImage}
          />
          {galleryData[currentIndex]?.caption && (
            <div className={styles.caption}>{galleryData[currentIndex].caption}</div>
          )}
        </div>
        <button className={styles.navButton} onClick={nextSlide}>
          &#10095;
        </button>
      </div>

      {/* Thumbnail Navigator */}
      <div className={styles.thumbnailContainer}>
        {galleryData.map((photo, index) => (
          <img
            key={photo.id}
            src={photo.photo}
            alt={`Thumbnail ${photo.property_id}`}
            className={`${styles.thumbnail} ${
              index === currentIndex ? styles.activeThumbnail : ''
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
