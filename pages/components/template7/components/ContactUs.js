import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../../Config";
import styles from "../css/ContactUs.module.css";

const ContactUs = () => {
  const [data, setData] = useState(null);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API.CONTACT_US());
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching contact us data:", error);
      }
    };
    fetchData();
  }, []);

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

  const closeThankYou = () => {
    setSubmitSuccess(false);
  };

  return (
    <section className={styles.contactUsSection}>
      {/* Hero Section */}
      <div className={styles.heroBanner}>
        <h1>Your Dream Property Awaits</h1>
        <p>Get in touch with us today, and let’s make it a reality.</p>
      </div>

      {/* Contact Form Section */}
      <div className={styles.contactFormSection}>
        <h2 className={styles.formHeading}>📩 Get in Touch</h2>
        <p>Fill out the form below, and we’ll get back to you shortly.</p>
        {submitSuccess && (
          <div className={styles.successMessage}>
            🎉 Your message has been sent successfully!
            <button onClick={closeThankYou} className={styles.closeButton}>
              Close
            </button>
          </div>
        )}
        {submitError && <p className={styles.errorMessage}>{submitError}</p>}
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="first_name"
              placeholder="First Name*"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name*"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="tel"
              name="phone_number"
              placeholder="Phone Number*"
              value={formData.phone_number}
              onChange={handleChange}
              required
              maxLength={10}
              pattern="\d{10}"
              title="Phone number must be exactly 10 digits"
            />
            <input
              type="email"
              name="email_id"
              placeholder="Email"
              value={formData.email_id}
              onChange={handleChange}
            />
          </div>
          <textarea
            className={styles.textarea}
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
