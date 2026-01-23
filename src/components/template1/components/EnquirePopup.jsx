import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../../config.js";
import styles from "../css/EnquirePopup.module.css";

const EnquirePopup = ({ onClose, slug}) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    phone_number: "",
    message: "",
    note:""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [headerData, setHeaderData] = useState({});

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await fetch(API.HEADER());
        const data = await response.json();
        setHeaderData(data);
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    };

    fetchHeaderData();
  }, []);

  // Prevent body scroll when popup is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      formData.note =slug;
      await axios.post(API.postContactUs, formData);
      setSubmitSuccess(true);
      setFormData({
        first_name: "",
        last_name: "",
        email_id: "",
        phone_number: "",
        message: "",
        note:""
      });
    } catch (error) {
      console.log(error);
      setSubmitError("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeThankYou = () => {
    setSubmitSuccess(false);
    onClose();
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div className={styles.popupBackdrop} onClick={onClose}></div>
      
      {submitSuccess && (
        <div className={styles.thankYouPopup}>
          <div className={styles.thankYouContent}>
            <button className={styles.thankYouClose} onClick={closeThankYou} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <div className={styles.successIcon}>
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="30" fill="#28A745" opacity="0.1"/>
                <path d="M20 30L27 37L40 24" stroke="#28A745" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
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
      {!submitSuccess && (
        <div className={styles.enquirePopup}>
          <div className={styles.enquirePopupContent}>
            {/* Header Section */}
            <div className={styles.popupHeader}>
              <button className={styles.enquirePopupClose} onClick={onClose} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              {headerData.logo && (
                <div className={styles.logoContainer}>
                  <img
                    src={headerData.logo}
                    alt="Builder Logo"
                    className={styles.enquirePopupLogo}
                  />
                </div>
              )}
              <div className={styles.headerText}>
                <h5 className={styles.enquireNowHeading}>Enquire Now</h5>
                <p className={styles.popupSubtitle}>Fill in your details and we'll get back to you soon</p>
              </div>
            </div>

            {/* Error Message */}
            {submitError && (
              <div className={styles.enquirePopupError}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M10 6V10M10 14H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>{submitError}</span>
              </div>
            )}

            {/* Form Section */}
            <form onSubmit={handleSubmit} className={styles.enquireForm}>
              <div className={styles.formRow}>
                <div className={styles.inputWrapper}>
                  <label htmlFor="first_name" className={styles.inputLabel}>First Name *</label>
                  <input
                    id="first_name"
                    type="text"
                    name="first_name"
                    placeholder="John"
                    value={formData.first_name}
                    onChange={handleChange}
                    className={styles.formInput}
                    required
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <label htmlFor="last_name" className={styles.inputLabel}>Last Name *</label>
                  <input
                    id="last_name"
                    type="text"
                    name="last_name"
                    placeholder="Doe"
                    value={formData.last_name}
                    onChange={handleChange}
                    className={styles.formInput}
                    required
                  />
                </div>
              </div>

              <div className={styles.inputWrapper}>
                <label htmlFor="phone_number" className={styles.inputLabel}>Phone Number *</label>
                <input
                  id="phone_number"
                  type="tel"
                  name="phone_number"
                  placeholder="+91 98765 43210"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className={styles.formInput}
                  required
                  maxLength={10}
                  pattern="\d{10}"
                  title="Phone number must be exactly 10 digits"
                />
              </div>

              <div className={styles.inputWrapper}>
                <label htmlFor="email_id" className={styles.inputLabel}>Email Address</label>
                <input
                  id="email_id"
                  type="email"
                  name="email_id"
                  placeholder="john.doe@example.com"
                  value={formData.email_id}
                  onChange={handleChange}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.inputWrapper}>
                <label htmlFor="message" className={styles.inputLabel}>Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your requirements..."
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.formTextarea}
                  rows={4}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EnquirePopup;
