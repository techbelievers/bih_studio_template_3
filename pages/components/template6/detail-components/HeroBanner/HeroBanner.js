import React, { useState, useEffect } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import { API } from "../../../../../Config";
import styles from "./HeroBanner.module.css";
import styles_rera from "../../../../components/template6/detail-components/Maharera/Maharera.module.css";


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
  const [reraData, setReraData] = useState([]);
  const [reraLoading, setReraLoading] = useState(true);
  const [reraError, setReraError] = useState(null);

  // Fetch Gallery Data
  useEffect(() => {
    fetch(API.GALLERY_STUDIO(slug))
      .then((response) => response.json())
      .then((data) => setGalleryData(data.property_photos || []))
      .catch((error) => console.error("Error fetching gallery data:", error));
  }, [slug]);

  // Fetch Services Data
  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const response = await axios.get(API.HEADER_STUDIO(slug));
        setServicesData(response.data);
      } catch (error) {
        console.error("Error fetching services data:", error);
      }
    };
    fetchServicesData();
  }, []);

  // Fetch Maharera Data
  useEffect(() => {
    const fetchReraData = async () => {
      try {
        const response = await fetch(API.MAHARERA_STUDIO(slug));
        const data = await response.json();
        if (!response.ok) throw new Error("Failed to fetch data");
        setReraData(data.rera || []);
      } catch (err) {
        setReraError(err.message);
      } finally {
        setReraLoading(false);
      }
    };

    fetchReraData();
  }, [slug]);

  // Form Handlers
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

  const formatCompletionDate = (dateString) =>
    dateString
      ? new Date(dateString).toLocaleString("default", { month: "long", year: "numeric" })
      : "N/A";

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

        {/* Maharera Section */}
        <section className={styles_rera.mahareraSection}>
          <div className={styles_rera.sectionHeader}>
            <h2 className={styles_rera.mahareraHeading}>
              Maharera <span className={styles_rera.highlight}>Details</span>
            </h2>
            <p className={styles_rera.mahareraSubheading}>
              Ensuring transparency and trust in real estate projects.
            </p>
          </div>

          <div
            className={`${styles_rera.cardsContainer} ${
              reraData.length === 1 ? styles_rera.singleCardContainer : ""
            }`}
          >
            {reraLoading ? (
              <div className={styles_rera.loading}>Loading...</div>
            ) : reraError ? (
              <div className={styles_rera.error}>Error: {reraError}</div>
            ) : (
              reraData.map((rera, index) => (
                <motion.div
                  key={index}
                  className={styles_rera.card}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles_rera.cardHeader}>
                    <h3 className={styles_rera.phaseName}>{rera.phase_name}</h3>
                  </div>
                  <div className={styles_rera.cardBody}>
                    <ul className={styles_rera.detailsList}>
                      <li>
                        <strong>ID:</strong> {rera.rera_id}
                      </li>
                      <li>
                        <strong>Completion:</strong> {formatCompletionDate(rera.completion_date)}
                      </li>
                      <li>
                        <strong>Area:</strong> {rera.total_area} Sq.M
                      </li>
                      <li>
                        <strong>Acre:</strong> {rera.total_acre}
                      </li>
                      <li>
                        <strong>Towers:</strong> {rera.total_tower}
                      </li>
                      <li>
                        <strong>Units:</strong> {rera.total_units}
                      </li>
                    </ul>
                  </div>
                  <div className={styles_rera.cardFooter}>
                    {rera.rera_url ? (
                      <QRCodeCanvas
                        value={rera.rera_url}
                        size={70}
                        className={styles_rera.qrCode}
                      />
                    ) : (
                      <p className={styles_rera.noQr}>No QR Code</p>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>
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
