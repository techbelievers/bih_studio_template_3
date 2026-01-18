import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { API } from "../../../../../config.js";
import styles from "./HeroBanner.module.css";
  
const HeroBanner = ({ propertyDetails, slug, servicesData: initialServiceData, galleryData: initialGalleryData }) => {
  const [galleryData, setGalleryData] = useState(initialGalleryData || []);
  const [servicesData, setServicesData] = useState(initialServiceData || {});
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    phone_number: "",
    message: "",
    note: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch Gallery Data
  useEffect(() => {
    if (!initialGalleryData) {
    fetch(API.GALLERY_STUDIO(slug))
      .then((response) => response.json())
        .then((data) => {
          const photos = data.property_photos || [];
          setGalleryData(photos);
        })
      .catch((error) => console.error("Error fetching gallery data:", error));
    } else {
      setGalleryData(initialGalleryData);
    }
  }, [slug, initialGalleryData]);

  // Auto-slide images
  useEffect(() => {
    if (galleryData.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % galleryData.length);
      }, 5000); // Change image every 5 seconds
      return () => clearInterval(interval);
    }
  }, [galleryData.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryData.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryData.length) % galleryData.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Fetch Services Data
  useEffect(() => {
    if (!initialServiceData || Object.keys(initialServiceData).length === 0) {
    const fetchServicesData = async () => {
      try {
        const response = await axios.get(API.HEADER_STUDIO(slug));
        setServicesData(response.data);
      } catch (error) {
        console.error("Error fetching services data:", error);
      }
    };
    fetchServicesData();
    } else {
      setServicesData(initialServiceData);
    }
  }, [slug, initialServiceData]);

  // Form Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      formData.note = slug;
      await axios.post(API.postContactUs, formData);
      setFormSubmitted(true);
      setFormData({
        first_name: "",
        last_name: "",
        email_id: "",
        phone_number: "",
        message: "",
        note: ""
      });
      setTimeout(() => {
      window.location.replace("/thank-you");
      }, 1500);
    } catch (error) {
      setSubmitError("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!propertyDetails) {
    return <div className={styles.loadingState}>Loading...</div>;
  }

  // Prepare images array
  const allImages = galleryData.length > 0 
    ? galleryData.map(photo => photo.photo)
    : [propertyDetails.property_featured_photo || "/default-image.jpg"];

  return (
    <section className={styles.heroBanner}>
      {/* Full-Width Image Slider */}
      <div className={styles.imageSliderContainer}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className={styles.sliderImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7 }}
            style={{
              backgroundImage: `url(${allImages[currentImageIndex]})`,
            }}
          >
            <div className={styles.imageOverlayGradient}></div>
          </motion.div>
        </AnimatePresence>


        {/* Image Dots Indicator */}
        {allImages.length > 1 && (
          <div className={styles.imageDots}>
            {allImages.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentImageIndex ? styles.activeDot : ''}`}
                onClick={() => goToImage(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Image Counter */}
        {allImages.length > 1 && (
          <div className={styles.imageCounter}>
            <span>{currentImageIndex + 1} / {allImages.length}</span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className={styles.heroContent}>
        <div className={styles.contentGrid}>
          {/* Left Side - Property Info */}
          <motion.div 
            className={styles.propertyInfo}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className={styles.heroBadge}>
              <span className={styles.badgeIcon}>⭐</span>
              <span>Premium Property</span>
            </div>

            {/* Property Name */}
            <h1 className={styles.propertyName}>
              {propertyDetails.property_name || "Luxury Living"}
            </h1>

            {/* Property Tagline */}
            {propertyDetails.tagline && (
              <p className={styles.propertyTagline}>
                {propertyDetails.tagline}
              </p>
            )}

            {/* Quick Info Cards */}
            {servicesData && Object.keys(servicesData).length > 0 && (
              <div className={styles.quickInfoGrid}>
                {servicesData.location && (
                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>📍</div>
                    <div className={styles.infoContent}>
                      <span className={styles.infoLabel}>Location</span>
                      <span className={styles.infoValue}>{servicesData.location}</span>
            </div>
          </div>
        )}
                {servicesData.builder_name && (
                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>🏗️</div>
                    <div className={styles.infoContent}>
                      <span className={styles.infoLabel}>Builder</span>
                      <span className={styles.infoValue}>{servicesData.builder_name}</span>
          </div>
                  </div>
                )}
                {servicesData.property_type_price_range_text && (
                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>🏠</div>
                    <div className={styles.infoContent}>
                      <span className={styles.infoLabel}>Type</span>
                      <span className={styles.infoValue}>{servicesData.property_type_price_range_text}</span>
                    </div>
                  </div>
                    )}
                  </div>
            )}

            {/* CTA Buttons */}
            <div className={styles.ctaButtons}>
              <motion.a
                href="#price"
                className={styles.primaryCta}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View Pricing</span>
                <span className={styles.ctaArrow}>→</span>
              </motion.a>
              <motion.a
                href="#amenities"
                className={styles.secondaryCta}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Explore Amenities</span>
              </motion.a>
          </div>
          </motion.div>

          {/* Right Side - Contact Form Card */}
          <motion.div 
            className={styles.contactCard}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Builder Logo */}
      {servicesData.property_builder_photo && (
    <div className={styles.builderLogoContainer}>
      <img
        src={servicesData.property_builder_photo}
                  alt={servicesData.builder_name || "Builder"}
        className={styles.builderLogo}
      />
    </div>
  )}

            <h2 className={styles.formHeading}>
              I'm Interested in<br />
              <span className={styles.formHeadingAccent}>{propertyDetails.property_name}</span>
        </h2>
 
        <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
            <input
              type="text"
              name="first_name"
              placeholder="First Name *"
              value={formData.first_name}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name *"
              value={formData.last_name}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>
         
          <input
            type="tel"
            name="phone_number"
            placeholder="Phone Number *"
            value={formData.phone_number}
            onChange={handleInputChange}
            className={styles.input}
            required
            maxLength={10}
              pattern="\d{10}"
              title="Phone number must be exactly 10 digits"
          />

           <input
            type="email"
            name="email_id"
                placeholder="Email Address"
            value={formData.email_id}
            onChange={handleInputChange}
            className={styles.input}
              />
            
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleInputChange}
            className={styles.textarea}
                rows="4"
              ></textarea>
            
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
                {isSubmitting ? (
                  <span className={styles.buttonLoader}></span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span className={styles.buttonArrow}>→</span>
                  </>
                )}
          </button>

          {formSubmitted && (
                <div className={styles.successMessage}>
                  ✓ Thank you! We'll get back to you soon.
                </div>
              )}

              {submitError && (
                <div className={styles.errorMessage}>{submitError}</div>
              )}
        </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
