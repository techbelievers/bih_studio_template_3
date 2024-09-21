import React, { useState, useEffect } from 'react';
import { API } from '../../../Config';
import '../css/FloorPlans.css';

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

  return (
    <div className="template1 floorplans-container">
       <br></br><br></br>
      <div className="floorplans-header">
      <h2 className="floorplans-heading">{heading}</h2>
        {/* You can add a subheading here if needed */}
      </div>
      <div className="floorplans-grid">
        {floorPlansData.map(plan => (
          <div key={plan.id} className="floorplan-item">
            <img 
              src={plan.layout_image} 
              alt={plan.layout_name} 
              className="floorplan-image"
              onClick={() => handleImageClick(plan.layout_image)}
            />
            <div className="layout-name">{plan.layout_name}</div>
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

export default FloorPlans;
