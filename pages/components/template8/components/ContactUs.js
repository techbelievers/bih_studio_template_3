import React, { useState } from "react";
import axios from "axios";
import { API } from "../../../../Config";
import { motion } from "framer-motion";
import styles from "../css/ContactUs.module.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    phone_number: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(API.postContactUs, formData);
      setSubmitSuccess(true);
      setFormData({
        first_name: "",
        last_name: "",
        email_id: "",
        phone_number: "",
        message: "",
      });
    } catch (error) {
      setSubmitError("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.contactSection}>
      {/* Left Side - Image & Overlay */}
      <div className={styles.imageContainer}>
        <div className={styles.overlay}>
          <h2>Find Your Dream Home</h2>
          <p>Let's connect and turn your dreams into reality.</p>
        </div>
      </div>

      {/* Right Side - Contact Form */}
      <div className={styles.formContainer}>
        <motion.div
          className={styles.contactFormBox}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.formTitle}>📩 Get in Touch</h2>

          {submitSuccess && (
            <div className={styles.successMessage}>
              🎉 Your message has been sent successfully!
              <button onClick={() => setSubmitSuccess(false)} className={styles.closeButton}>
                Close
              </button>
            </div>
          )}
          {submitError && <p className={styles.errorMessage}>{submitError}</p>}

          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.inputGroup}>
              <input type="text" name="first_name" placeholder="First Name*" value={formData.first_name} onChange={handleChange} required />
              <input type="text" name="last_name" placeholder="Last Name*" value={formData.last_name} onChange={handleChange} required />
            </div>
            <div className={styles.inputGroup}>
              <input type="tel" name="phone_number" placeholder="Phone Number*" value={formData.phone_number} onChange={handleChange} required />
              <input type="email" name="email_id" placeholder="Email" value={formData.email_id} onChange={handleChange} />
            </div>
            <textarea className={styles.textarea} name="message" placeholder="Your Message" value={formData.message} onChange={handleChange}></textarea>
            <motion.button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
