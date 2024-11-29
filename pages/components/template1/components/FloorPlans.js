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
        setFloorPlansData(data.Floor_plans);
        setHeading(data.page[0]?.heading || 'Floor Plans');
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

  if (floorPlansData.length === 0) {
    return null; // Render a message if data is empty
 }


  return (
    <div className={styles.floorplansContainer}>
      <div className={styles.floorplansHeader}>
        <h2 className={styles.floorplansHeading}>{heading}</h2>
      </div>
      <div className={styles.floorplansGrid}>
        {floorPlansData.map(plan => (
          <div key={plan.id} className={styles.floorplanItem}>
            <img 
              src={plan.layout_image} 
              alt={plan.layout_name} 
              className={styles.floorplanImage}
              onClick={() => handleImageClick(plan.layout_image)}
            />
            <div className={styles.layoutName}>{plan.layout_name}</div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className={styles.fullscreenOverlay} onClick={closeModal}>
          <div className={styles.fullscreenContent}>
            <img src={selectedImage} alt="Fullscreen" className={styles.fullscreenImage} />
            <button className={styles.closeButton} onClick={closeModal}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloorPlans;
