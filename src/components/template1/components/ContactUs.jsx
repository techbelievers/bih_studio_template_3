import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../../config.js";
import styles from "../css/ContactUs.module.css";

const ContactUs = () => {
  const [data, setData] = useState(null);
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
        note:""
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
    <section id="contact" className={styles.contactUsSection}>
      <div className={styles.contactContainer}>
        {/* Left Side - Visual Info Section with Unique Design */}
        <div className={styles.infoSection}>
          <div className={styles.infoContent}>
            {/* Badge */}
            <div className={styles.sectionBadge}>
              <span className={styles.badgeIcon}>💬</span>
              <span>Contact Us</span>
            </div>

            {/* Heading */}
            <h2 className={styles.heading}>
              <span className={styles.headingMain}>
                {data?.contact_us?.name || "Let's Start"}
              </span>
              {/* <span className={styles.headingAccent}>a Conversation</span> */}
            </h2>

            {/* Description */}
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{
                __html:
                  data?.contact_us?.detail || "We would love to hear from you!",
              }}
            ></div>

            {/* Contact Methods */}
            <div className={styles.contactMethods}>
              <div className={styles.contactMethod}>
                <div className={styles.methodIcon}>📞</div>
                <div className={styles.methodContent}>
                  <span className={styles.methodLabel}>Call Us</span>
                  <a
                    href={`tel:${data?.contact_us?.contact_phone || "+918181817136"}`}
                    className={styles.methodValue}
                  >
                    {data?.contact_us?.contact_phone || "+91-81818-17136"}
                  </a>
                </div>
              </div>
              {/* <div className={styles.contactMethod}>
                <div className={styles.methodIcon}>✉️</div>
                <div className={styles.methodContent}>
                  <span className={styles.methodLabel}>Email Us</span>
                  <span className={styles.methodValue}>info@buyindiahomes.in</span>
                </div>
              </div> */}
             
            </div>

            {/* Trust Indicators */}
            <div className={styles.trustIndicators}>
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>✓</span>
                <span>100% Response Rate</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>✓</span>
                <span>24/7 Support</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustIcon}>✓</span>
                <span>Quick Response</span>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className={styles.decorativeCircle1}></div>
          <div className={styles.decorativeCircle2}></div>
          <div className={styles.decorativeCircle3}></div>
        </div>

        {/* Right Side - Form Section with Unique Design */}
        <div className={styles.formSection}>
          <div className={styles.formWrapper}>
            {/* Form Header */}
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>Send us a Message</h3>
              <p className={styles.formSubtitle}>Fill in the form below and we'll get back to you</p>
            </div>

            {/* Success/Error Messages */}
            {submitSuccess && (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>✓</div>
                <div className={styles.successContent}>
                  <strong>Success!</strong>
                  <p>Your message has been sent successfully. We'll contact you soon!</p>
                </div>
                <button onClick={closeThankYou} className={styles.closeButton}>
                  ×
                </button>
              </div>
            )}
            {submitError && (
              <div className={styles.errorMessage}>
                <span>⚠️</span>
                <span>{submitError}</span>
              </div>
            )}

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              {/* Name Fields - Side by Side */}
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>First Name *</label>
                  <input
                    type="text"
                    name="first_name"
                    className={styles.input}
                    placeholder="John"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Last Name *</label>
                  <input
                    type="text"
                    name="last_name"
                    className={styles.input}
                    placeholder="Doe"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Phone Number *</label>
                <input
                  type="tel"
                  name="phone_number"
                  className={styles.input}
                  placeholder="+91 98765 43210"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                  maxLength={10}
                  pattern="\d{10}"
                  title="Phone number must be exactly 10 digits"
                />
              </div>

              {/* Email Field */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Email Address</label>
                <input
                  type="email"
                  name="email_id"
                  className={styles.input}
                  placeholder="john.doe@example.com"
                  value={formData.email_id}
                  onChange={handleChange}
                />
              </div>

              {/* Message Field */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Your Message</label>
                <textarea
                  name="message"
                  className={styles.textarea}
                  placeholder="Tell us about your requirements..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span className={styles.submitArrow}>→</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
