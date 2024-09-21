import React, { useState, useEffect } from 'react';
import { API } from '../../../Config';
import '../css/MasterPlan.css';

const MasterPlan = () => {
  const [masterPlansData, setMasterPlansData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchMasterPlansData = async () => {
      try {
        const response = await fetch(API.MASTER_LAYOUT());
        const data = await response.json();
        setMasterPlansData(data.master_layout); // Adjust based on actual API response
      } catch (error) {
        console.error('Error fetching master plans data:', error);
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

  return (
    <div className="template1 masterplan-container">
      <div className="masterplan-header">
        <h1 className="masterplan-heading">Master Plan</h1>
      </div>
      <div className="masterplan-grid">
        {masterPlansData.map(plan => (
          <div key={plan.id} className="masterplan-item">
            <img 
              src={plan.layout_image} 
              alt={plan.layout_name} 
              className="masterplan-image"
              onClick={() => handleImageClick(plan.layout_image)}
            />
            <div className="masterplan-name">{plan.layout_name}</div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fullscreen-overlay" onClick={closeModal}>
          <div className="fullscreen-content">
            <img src={selectedImage} alt="Fullscreen" className="fullscreen-image" />
            <button className="close-button" onClick={closeModal}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasterPlan;
