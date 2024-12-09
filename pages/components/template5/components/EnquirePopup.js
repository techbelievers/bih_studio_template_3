import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../../Config";
import { useRouter } from "next/router"; // Import the useRouter hook
import styles from "../css/EnquirePopup.module.css";

const EnquirePopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    phone_number: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [headerData, setHeaderData] = useState({});
  const router = useRouter(); // Initialize the useRouter hook

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
      await axios.post(API.postContactUs, formData);

      // Redirect to Thank You Page after successful submission
      router.push("/thank-you");
    } catch (error) {
      console.log(error);
      setSubmitError("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.enquirePopup}>
      <div className={styles.enquirePopupContent}>
        <button className={styles.enquirePopupClose} onClick={onClose}>
          ×
        </button>
        {headerData.logo && (
          <img
            src={headerData.logo}
            alt="Builder Logo"
            className={styles.enquirePopupLogo}
          />
        )}
        <h2 className={styles.propertyName}>{headerData.property_name}</h2>
        <h5 className={styles.enquireNowHeading}>Enquire Now</h5>
        {submitError && <p className={styles.enquirePopupError}>{submitError}</p>}
        <form onSubmit={handleSubmit} className={styles.enquireForm}>
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
          <input
            type="tel"
            name="phone_number"
            placeholder="Phone Number*"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email_id"
            placeholder="Email"
            value={formData.email_id}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquirePopup;
