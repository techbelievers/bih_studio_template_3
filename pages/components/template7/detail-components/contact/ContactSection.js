import React, { useState } from "react";
import axios from "axios";
import { API } from "../../../../../Config";
import styles from "./ContactSection.module.css";

const ContactSection = ({slug}) => {
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
      await axios.post(API.postContactUs, formData);
      setIsSubmitted(true);
      setFormData({
        first_name: "",
        last_name: "",
        email_id: "",
        phone_number: "",
        message: "",
        note: slug.slug
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setError("Failed to send message. Please try again.");
    }
  };
  const closeThankYou = () => {
    setIsSubmitted(false);
    // onClose();
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Get In Touch</h2>
        <p className={styles.subheading}>
          Contact us today to learn more about our luxurious properties.
        </p>

        {/* Success Message */}
        {/* { && <p className={styles.successMessage}>Message sent successfully!</p>} */}
        {isSubmitted && (
        <div className={styles.thankYouPopup}>
          <div className={styles.thankYouContent}>
            <h2>Thank You!</h2>
            <p>
              Your message has been sent successfully. We will get back to you
              shortly.
            </p>
            <button onClick={closeThankYou} className={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
        {error && <p className={styles.errorMessage}>{error}</p>}

        {/* Contact Form */}
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="first_name"
              placeholder="First Name*"
              value={formData.first_name}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name*"
              value={formData.last_name}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="tel"
              name="phone_number"
              placeholder="Phone Number*"
              value={formData.phone_number}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
            <input
              type="email"
              name="email_id"
              placeholder="Email"
              value={formData.email_id}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className={styles.textArea}
          ></textarea>

          <button type="submit" className={styles.submitButton}>Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
