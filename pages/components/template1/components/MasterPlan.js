import React, { useState, useEffect } from 'react';
import { API } from '../../../../Config';
import styles from '../css/MasterPlan.module.css';

const MasterPlan = () => {
  const [masterPlansData, setMasterPlansData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMasterPlansData = async () => {
      try {
        const response = await fetch(API.MASTER_LAYOUT());
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMasterPlansData(data.master_layout); // Adjust based on actual API response
      } catch (error) {
        console.error('Error fetching master plans data:', error);
        setError('Failed to load master plans.');
      } finally {
        setLoading(false);
      }
    };

    fetchMasterPlansData();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (loading) return <div>Loading master plans...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={`${styles.template1} ${styles.masterplanContainer}`}>
      <div className={styles.masterplanHeader}>
        <h1 className={styles.masterplanHeading}>Master Plan</h1>
      </div>
      <div className={styles.masterplanGrid}>
        {masterPlansData.map(plan => (
          <div key={plan.id} className={styles.masterplanItem}>
            <img 
              src={plan.layout_image} 
              alt={plan.layout_name} 
              className={styles.masterplanImage}
              onClick={() => handleImageClick(plan.layout_image)}
            />
            <div className={styles.masterplanName}>{plan.layout_name}</div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className={styles.fullscreenOverlay} onClick={closeModal}>
          <div className={styles.fullscreenContent}>
            <img src={selectedImage} alt="Fullscreen" className={styles.fullscreenImage} />
            <button className={styles.closeButton} onClick={closeModal} aria-label="Close modal">×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasterPlan;
