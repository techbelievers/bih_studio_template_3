import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../../../Config";
import styles from "./HeroBanner.module.css";

const GalleryWithEnquiry = ({ propertyDetails, slug }) => {
  const [galleryData, setGalleryData] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    phone_number: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [modalImage, setModalImage] = useState(null); // For modal
  const [servicesData, setServicesData] = useState(null); // Services Data

  useEffect(() => {
    fetch(API.GALLERY_STUDIO(slug))
      .then((response) => response.json())
      .then((data) => setGalleryData(data.property_photos || []))
      .catch((error) => console.error("Error fetching gallery data:", error));
  }, [slug]);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const response = await axios.get(API.HEADER());
        setServicesData(response.data);
      } catch (error) {
        console.error("Error fetching services data:", error);
      }
    };
    fetchServicesData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(API.postContactUs, formData);
      setFormSubmitted(true);
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
      setTimeout(() => setFormSubmitted(false), 3000);
    }
  };

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className={styles.container}>
      {/* Left Column: Gallery and Property Details */}
      <div className={styles.leftColumn}>
        {/* Gallery Section */}
        <div className={styles.gallery}>
          <h2 className={styles.heading}>{propertyDetails.property_name}</h2>
          <p className={styles.subheading}>
            {propertyDetails.seo_meta_description}
          </p>
          <div
            className={`${styles.galleryGrid} ${
              galleryData.length < 6 ? styles.centeredGrid : ""
            }`}
          >
            {galleryData.map((photo, index) => (
              <div
                key={index}
                className={styles.galleryItem}
                onClick={() => openModal(photo.photo)}
              >
                <img
                  src={photo.photo || "/placeholder-image.jpg"}
                  alt={`Property ${index}`}
                  className={styles.galleryImage}
                />
                <div className={styles.overlay}>
                  <span className={styles.overlayText}>View</span>
                </div>
              </div>
            ))}
          </div>
        </div>

         {/* Modal */}
      {modalImage && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent}>
            <img src={modalImage} alt="Enlarged View" className={styles.modalImage} />
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
          </div>
        </div>
      )}

  
        {/* Property Details Section */}
        {servicesData && (
          <div className={styles.propertyDetails}>
            <h2 className={styles.servicesHeading}>Explore Property Details</h2>
            <div className={styles.servicesContent}>
              <div className={styles.servicesRow}>
                <strong>Builder:</strong> {servicesData.builder_name}
              </div>
              <div className={styles.servicesRow}>
                <strong>Location:</strong> {servicesData.location}
              </div>
              <div className={styles.servicesRow}>
                <strong>Property Type:</strong>{" "}
                {servicesData.property_type_price_range_text}
              </div>
              <div className={styles.servicesRow}>
                <strong>Area:</strong> {servicesData.property_area_min_max}
              </div>
              <div className={styles.servicesRow}>
                <strong>Last Updated:</strong> {servicesData.property_last_updated}
              </div>
            </div>
          </div>
        )}


        
      </div>
  
      {/* Right Column: Contact Form */}
      <div className={styles.contactFormSection}>
        <h2 className={styles.heading}>Enquire Now</h2>
        <p className={styles.subheading}>
          Contact us to learn more about these properties.
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>
          <input
            type="email"
            name="email_id"
            placeholder="Email"
            value={formData.email_id}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
          <input
            type="tel"
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleInputChange}
            className={styles.textarea}
            required
          ></textarea>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
          {formSubmitted && (
            <p className={styles.successMessage}>Thank you for your enquiry!</p>
          )}
          {submitError && <p className={styles.errorMessage}>{submitError}</p>}
        </form>
      </div>
    </div>
  );
  
};

export default GalleryWithEnquiry;
