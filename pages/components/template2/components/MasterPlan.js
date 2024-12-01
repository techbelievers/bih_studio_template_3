import React, { useState, useEffect } from 'react';
import { API } from '../../../../Config';
import styles from '../css/MasterPlan.module.css';

const ModernMasterPlan = () => {
  const [masterPlansData, setMasterPlansData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [heading, setHeading] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMasterPlans = async () => {
      try {
        const response = await fetch(API.MASTER_LAYOUT());
        if (!response.ok) throw new Error('Failed to fetch master plans');
        const data = await response.json();
        setMasterPlansData(data.master_layout);
        setHeading(data.page[0].heading);
      } catch (error) {
        console.error(error);
        setError('Could not load master plans.');
      } finally {
        setLoading(false);
      }
    };

    fetchMasterPlans();
  }, []);

  const openModal = (image) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  if (loading) return <div className={styles.loader}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <section className={styles.masterPlanSection}>
      <div className={styles.header}>
        <h2 className={styles.luxuryHeading}>{heading}</h2>
        <p className={styles.subheading}>Discover our master plans designed for luxury living.</p>
      </div>
      <div className={styles.grid}>
        {masterPlansData.map((plan) => (
          <div
            key={plan.id}
            className={styles.card}
            onClick={() => openModal(plan.layout_image)}
          >
            <div className={styles.imageContainer}>
              <img
                src={plan.layout_image}
                alt={plan.layout_name}
                className={styles.cardImage}
              />
              <div className={styles.overlay}>
                <span className={styles.viewDetails}>View Details</span>
              </div>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{plan.layout_name}</h3>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent}>
            <img src={selectedImage} alt="Master Plan Full View" className={styles.modalImage} />
            <button className={styles.closeButton} onClick={closeModal}>×</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ModernMasterPlan;
