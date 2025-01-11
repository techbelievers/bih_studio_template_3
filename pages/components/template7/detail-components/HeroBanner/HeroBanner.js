import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { API } from "../../../../../Config";
import styles from "./HeroBanner.module.css";

const HeroBanner = ({ propertyDetails, slug }) => {
  const [galleryData, setGalleryData] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    phone_number: "",
    message: "",
  });

  // Fetch Gallery Data from API
  useEffect(() => {
    fetch(API.GALLERY_STUDIO(slug))
      .then((response) => response.json())
      .then((data) => setGalleryData(data.property_photos || []))
      .catch((error) => console.error("Error fetching gallery data:", error));
  }, [slug]);

  // Auto-change images every 5 seconds
  useEffect(() => {
    if (galleryData.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryData.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [galleryData]);

  // Handle Contact Form Submission
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API.postContactUs, formData);
      alert("Message sent successfully!");
      setIsContactFormOpen(false);
      setFormData({
        first_name: "",
        last_name: "",
        email_id: "",
        phone_number: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <section className={styles.hero}>
      {/* Background Image Transition */}
      <AnimatePresence mode="wait">
        {galleryData.length > 0 && (
          <motion.div
            key={currentImageIndex}
            className={styles.heroBackground}
            style={{ backgroundImage: `url(${galleryData[currentImageIndex].photo})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      {/* Overlay for Readability */}
      <div className={styles.overlay}></div>

      {/* Hero Content */}
      <motion.div 
        className={styles.heroContent} 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className={styles.heroTitle}>{propertyDetails.property_name}</h1>
        <p className={styles.heroSubtitle}>{propertyDetails.seo_meta_description}</p>
        <motion.button 
          className={styles.ctaButton}
          onClick={() => setIsContactFormOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enquire Now
        </motion.button>
      </motion.div>

      {/* Contact Form Popup */}
      {isContactFormOpen && (
        <div className={styles.popupOverlay}>
          <motion.div 
            className={styles.popupBox}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
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
                required
              ></textarea>
              <button type="submit" className={styles.submitButton}>
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default HeroBanner;
