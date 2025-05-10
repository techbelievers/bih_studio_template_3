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

      window.location.replace("/thank-you");
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
      <div className={styles.container}>
        {/* Details Section */}
        <div className={styles.details}>
          <h2 className={styles.heading}>
            {data?.contact_us?.name || "Get in Touch"}
          </h2>
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html:
                data?.contact_us?.detail || "We would love to hear from you!",
            }}
          ></p>
          <p className={styles.info}>
            <strong>Phone:</strong> {data?.contact_us?.contact_phone || "N/A"}
          </p>
        </div>

        {/* Form Section */}
        <div className={styles.form}>
          <h2 className={styles.formHeading}>Contact Us</h2>
          {submitSuccess && (
            <div className={styles.successMessage}>
              Your message has been sent successfully!
              <button onClick={closeThankYou} className={styles.closeButton}>
                Close
              </button>
            </div>
          )}
          {submitError && <p className={styles.errorMessage}>{submitError}</p>}
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="first_name"
                className={styles.input}
                placeholder="First Name*"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="last_name"
                className={styles.input}
                placeholder="Last Name*"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <input
              type="tel"
              name="phone_number"
              className={styles.input}
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
              className={styles.input}
              placeholder="Email"
              value={formData.email_id}
              onChange={handleChange}
              
            />
            <textarea
              name="message"
              className={styles.textarea}
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
      </div>
    </section>
  );
};

export default ContactUs;
