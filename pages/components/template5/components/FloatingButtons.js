import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../../Config";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import EnquirePopup from "./EnquirePopup";
import styles from "../css/FloatingButtons.module.css";

const FloatingButtons = ({name}) => {
  const [footerData, setFooterData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await axios.get(API.FOOTER());
        setFooterData(response.data);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };
    fetchFooterData();
  }, []);

  return (
    <>     
      {footerData && (
        <div className={styles.bottomNav}>
          {/* WhatsApp Button */}
          <a
           href={`https://wa.me/${footerData.g_setting.footer_phone}?text=${encodeURIComponent(`I Am Interested in ${name}`)}`}
            className={`${styles.navButton} ${styles.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
          >
            <FaWhatsapp />
            <span>WhatsApp</span>
          </a>

          {/* Call Button */}
          <a
            href={`tel:${footerData.g_setting.footer_phone}`}
            className={`${styles.navButton} ${styles.call}`}
            aria-label="Call us"
          >
            <FaPhoneAlt />
            <span>Call Us</span>
          </a>

          {/* Enquire Button */}
          <div
            className={`${styles.navButton} ${styles.enquire}`}
            onClick={() => setIsPopupOpen(true)}
            aria-label="Enquire with us"
          >
            <FaEnvelope />
            <span>Enquire</span>
          </div>
        </div>
      )}
      {isPopupOpen && <EnquirePopup onClose={() => setIsPopupOpen(false)} />}
    </>
  );
};

export default FloatingButtons;
