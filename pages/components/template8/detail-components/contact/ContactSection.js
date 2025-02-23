import React, { useState } from "react";
import axios from "axios";
import { API } from "../../../../../Config";
import styles from "./ContactSection.module.css";
import { FaPhoneAlt, FaEnvelope, FaUser } from "react-icons/fa";

const ContactSection = ({ slug }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    phone_number: "",
    message: "",
    note: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.note = slug;
      await axios.post(API.postContactUs, formData);
      setIsSubmitted(true);
      setFormData({
        first_name: "",
        last_name: "",
        email_id: "",
        phone_number: "",
        message: "",
        note: ""
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setError("Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.contactCard}>
          <h2 className={styles.heading}>Get In Touch</h2>
          <p className={styles.subheading}>
            Let’s talk about your dream property. Fill out the form below.
          </p>

          {isSubmitted && (
            <div className={styles.thankYouMessage}>
              <h2>Thank You!</h2>
              <p>Your message has been sent. We will contact you soon.</p>
            </div>
          )}
          {error && <p className={styles.errorMessage}>{error}</p>}

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <FaUser className={styles.icon} />
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className={styles.inputField}
                placeholder="First Name *"
              />
            </div>

            <div className={styles.inputGroup}>
              <FaUser className={styles.icon} />
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className={styles.inputField}
                placeholder="Last Name *"
              />
            </div>

            <div className={styles.inputGroup}>
              <FaPhoneAlt className={styles.icon} />
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
                className={styles.inputField}
                placeholder="Phone Number *"
              />
            </div>

            <div className={styles.inputGroup}>
              <FaEnvelope className={styles.icon} />
              <input
                type="email"
                name="email_id"
                value={formData.email_id}
                onChange={handleChange}
                className={styles.inputField}
                placeholder="Email Address"
              />
            </div>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={styles.textArea}
              placeholder="Your Message"
            ></textarea>

            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
