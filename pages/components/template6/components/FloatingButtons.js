import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../../Config";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import styles from "../css/FloatingButtons.module.css";

const FloatingButtons = (slug) => {
  const [footerData, setFooterData] = useState(null);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isWhatsAppPopupOpen, setIsWhatsAppPopupOpen] = useState(false);
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    phone_number: "",
    message: "",
    note:""
  });

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

  // WhatsApp message submission handler
  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    if (whatsappMessage.trim()) {
      const whatsappUrl = `https://wa.me/${footerData.g_setting.footer_phone}?text=${encodeURIComponent(
        whatsappMessage
      )}`;
      window.open(whatsappUrl, "_blank");
      setIsWhatsAppPopupOpen(false);
      setWhatsappMessage(""); // Reset the message
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.note =slug.slug;
      await axios.post(API.postContactUs, formData);
      setFormData({
        first_name: "",
        last_name: "",
        email_id: "",
        phone_number: "",
        message: "",
        note:""
      });
      alert("Message sent successfully!");
      setIsContactFormOpen(false);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <>
      {footerData && (
        <div className={styles.floatingButtons}>
          {/* WhatsApp Button */}
          <div
            className={`${styles.floatingButton} ${styles.whatsapp}`}
            onClick={() => setIsWhatsAppPopupOpen((prev) => !prev)}
          >
            <FaWhatsapp />
          </div>

          {/* Call Button */}
          <a
            href={`tel:${footerData.g_setting.footer_phone}`}
            className={`${styles.floatingButton} ${styles.call}`}
          >
            <FaPhoneAlt />
          </a>

          {/* Contact Us Button */}
          <div
            className={`${styles.floatingButton} ${styles.enquire}`}
            onClick={() => setIsContactFormOpen((prev) => !prev)}
          >
            <FaEnvelope />
          </div>
        </div>
      )}

      {/* WhatsApp Popup */}
      {isWhatsAppPopupOpen && (
        <div className={styles.whatsappPopup}>
          <div className={styles.popupHeader}>
            <h3>Chat with us on WhatsApp</h3>
            <button
              className={styles.closeButton}
              onClick={() => setIsWhatsAppPopupOpen(false)}
            >
              &times;
            </button>
          </div>
          <form onSubmit={handleSendWhatsApp}>
            <textarea
              className={styles.textArea}
              placeholder="Type your message here..."
              value={whatsappMessage}
              onChange={(e) => setWhatsappMessage(e.target.value)}
              required
            ></textarea>
            <button type="submit" className={styles.sendButton}>
              Send
            </button>
          </form>
        </div>
      )}

      {/* Contact Us Popup */}
      {isContactFormOpen && (
        <div className={styles.contactFormPopup}>
          <div className={styles.popupHeader}>
            <h3>Contact Us</h3>
            <button
              className={styles.closeButton}
              onClick={() => setIsContactFormOpen(false)}
            >
              &times;
            </button>
          </div>
          <form onSubmit={handleContactFormSubmit}>
            <input
              type="text"
              name="first_name"
              className={styles.inputField}
              placeholder="First Name*"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="last_name"
              className={styles.inputField}
              placeholder="Last Name*"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone_number"
              className={styles.inputField}
              placeholder="Phone Number*"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email_id"
              className={styles.inputField}
              placeholder="Email"
              value={formData.email_id}
              onChange={handleChange}
            />
            <textarea
              name="message"
              className={styles.textArea}
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default FloatingButtons;
