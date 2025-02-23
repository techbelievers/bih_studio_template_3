import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import styles from "../css/HeroBanner.module.css";
import { API } from "../../../../Config";

const HeroBanner = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await axios.get(API.HEADER());
        const data = response.data;

        const isMobile = window.innerWidth < 768;
        const heroImages = data.hero_banner_img;
        const selectedImage = isMobile
          ? heroImages.mobile[0]
          : heroImages.desktop[0];

        setHeroData({
          backgroundImage: selectedImage,
          heading: data.hero_banner_heading,
          subheading: data.hero_banner_subheading,
        });
      } catch (err) {
        setError("Failed to load hero banner");
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  if (loading) return <div className={styles.heroBanner}>Loading...</div>;
  if (error) return <div className={styles.heroBanner}>{error}</div>;

  return (
    <div
      className={styles.heroBanner}
      style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
    >
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className={styles.heroContent}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className={styles.heading}>{heroData.heading}</h1>
        <p className={styles.subheading}>{heroData.subheading}</p>
        <div className={styles.buttons}>
          <motion.a
            href="#properties"
            className={styles.ctaButton}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Properties
          </motion.a>
          {/* <motion.button
            className={styles.contactButton}
            onClick={() => setShowForm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
          </motion.button> */}
        </div>
      </motion.div>

      {/* Contact Form Popup */}
      {showForm && (
        <motion.div
          className={styles.contactForm}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.formHeader}>
            <h3>Contact Us</h3>
            <button className={styles.closeButton} onClick={() => setShowForm(false)}>×</button>
          </div>
          <form>
            <input type="text" placeholder="Your Name" className={styles.inputField} />
            <input type="email" placeholder="Your Email" className={styles.inputField} />
            <input type="text" placeholder="Phone Number" className={styles.inputField} />
            <textarea placeholder="Message" className={styles.textArea}></textarea>
            <button type="submit" className={styles.submitButton}>Send Message</button>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default HeroBanner;
