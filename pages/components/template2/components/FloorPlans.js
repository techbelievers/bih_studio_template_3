import React, { useState, useEffect } from 'react';
import { API } from '../../../../Config';
import styles from '../css/FloorPlans.module.css';

const FloorPlans = () => {
  const [floorPlansData, setFloorPlansData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [heading, setHeading] = useState('');

  useEffect(() => {
    const fetchFloorPlansData = async () => {
      try {
        const response = await fetch(API.FLOOR_PLANS());
        const data = await response.json();
        setFloorPlansData(data.Floor_plans || []);
        setHeading(data.page[0]?.heading || 'Explore Our Floor Plans');
      } catch (error) {
        console.error('Error fetching floor plans data:', error);
      }
    };

    fetchFloorPlansData();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={styles.floorPlansWrapper}>
      <header className={styles.header}>
        <h1 className={styles.luxuryHeading}>{heading}</h1>
        <p className={styles.subtitle}>Discover the thoughtfully designed layouts tailored to your lifestyle.</p>
      </header>

      <div className={styles.carousel}>
        {floorPlansData.map(plan => (
          <div key={plan.id} className={styles.card} onClick={() => handleImageClick(plan.layout_image)}>
            <div className={styles.imageContainer}>
              <img src={plan.layout_image} alt={plan.layout_name} className={styles.image} />
            </div>
            <div className={styles.cardFooter}>
              <h3 className={styles.planName}>{plan.layout_name}</h3>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent}>
            <img src={selectedImage} alt="Floor Plan" className={styles.modalImage} />
            <button className={styles.closeButton} onClick={closeModal} aria-label="Close">×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloorPlans;
