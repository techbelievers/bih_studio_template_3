import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../css/HeroBanner.module.css'; // Import the CSS module
import EnquirePopup from './EnquirePopup';
import { API } from '../../../../Config'; // Adjust the path as needed

const HeroBanner = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [error, setError] = useState(null);

  // For form submission
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email_id: '',
    phone_number: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch(API.HEADER());
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const isMobile = window.innerWidth < 768; // Adjust this breakpoint as needed
        const heroImages = data.hero_banner_img;

        const selectedImage = isMobile ? heroImages.mobile[0] : heroImages.desktop[0];

        setHeroData({
          backgroundImage: selectedImage,
          heading: data.property_name,
          description: data.hero_banner_subheading,
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);

    try {
      await axios.post(API.postContactUs, formData);
      setSubmitSuccess(true);
      setFormData({
        first_name: '',
        last_name: '',
        email_id: '',
        phone_number: '',
        message: '',
      });
    } catch (error) {
      setSubmitError('Failed to submit the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className={styles.heroBanner}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.heroBanner}>Error loading hero banner: {error.message}</div>;
  }

  return (
    <div 
      className={styles.heroBanner} 
      style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
    >
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1>{heroData.heading}</h1>
          <p>{heroData.description}</p>
          <div onClick={() => setIsPopupOpen(true)}>
            <a href="#contact-form" className={styles.enquireNow}>Enquire Now</a>
          </div>
        </div>
        <div className={styles.contactFormContainer} id="contact-form">
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <h2>Contact Us</h2>
            {submitSuccess && <p className="form-success-message">Your message has been sent successfully!</p>}
            {submitError && <p className="form-error-message">{submitError}</p>}

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="first_name">First Name:</label>
                <input 
                  type="text" 
                  id="first_name" 
                  name="first_name" 
                  value={formData.first_name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="last_name">Last Name:</label>
                <input 
                  type="text" 
                  id="last_name" 
                  name="last_name" 
                  value={formData.last_name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email_id">Email:</label>
              <input 
                type="email" 
                id="email_id" 
                name="email_id" 
                value={formData.email_id} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone_number">Phone Number:</label>
              <input 
                type="tel" 
                id="phone_number" 
                name="phone_number" 
                value={formData.phone_number} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Message:</label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                required 
              ></textarea>
            </div>
            
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
      {isPopupOpen && <EnquirePopup onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default HeroBanner;
