import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../../../Config'; // Adjust the path as needed
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import EnquirePopup from './EnquirePopup';
import styles from '../css/FloatingButtons.module.css';

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
      <div className={styles.floatingButtons}>
        {footerData && (
          <>
            <a
              href={`https://wa.me/${footerData.g_setting.footer_phone}`}
              className={`${styles.floatingButton} ${styles.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href={`tel:${footerData.g_setting.footer_phone}`}
              className={`${styles.floatingButton} ${styles.call}`}
              aria-label="Call us"
            >
              <FaPhoneAlt />
            </a>
            <div
              className={`${styles.floatingButton} ${styles.enquire}`}
              onClick={() => setIsPopupOpen(true)}
              aria-label="Send us an email"
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
