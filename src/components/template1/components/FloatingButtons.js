// src/components/FloatingButtons.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../../Config'; // Adjust the path as needed
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import EnquirePopup from './EnquirePopup';
import '../css/FloatingButtons.css';

const FloatingButtons = () => {
  const [footerData, setFooterData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await axios.get(API.FOOTER());
        setFooterData(response.data);
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };
    fetchFooterData();
  }, []);

  return (
    <>
      <div className="floating-buttons">
        {footerData && (
          <>
            <a href={`https://wa.me/${footerData.g_setting.footer_phone}`} className="floating-button" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
            </a>
            <a href={`tel:${footerData.g_setting.footer_phone}`} className="floating-button">
              <FaPhoneAlt />
            </a>
            <div
              className="floating-button"
              onClick={() => setIsPopupOpen(true)}
            >
              <FaEnvelope />
            </div>
          </>
        )}
      </div>
      {isPopupOpen && <EnquirePopup onClose={() => setIsPopupOpen(false)} />}
    </>
  );
};

export default FloatingButtons;
