import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../css/HeroBanner.module.css'; // Updated CSS
import EnquirePopup from './EnquirePopup';
import { API } from '../../../../Config'; // Adjust the path as needed

const HeroBanner = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [error, setError] = useState(null);

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
        const isMobile = window.innerWidth < 768; 
        const heroImages = data.hero_banner_img;

        const selectedImage = isMobile ? heroImages.mobile[0] : heroImages.desktop[0];

        setHeroData({
          backgroundImage: selectedImage,
          heading: data.property_name,
          description: data.hero_banner_subheading,
          location: data.location,
          sublocation: data.sublocation,
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

  const closeThankYou = () => {
    setSubmitSuccess(false);
  };

  if (loading) {
    return <div className={styles.heroBanner}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.heroBanner}>Error loading hero banner: {error.message}</div>;
  }

  const sublocationDisplay = heroData && heroData.sublocation !== 'Default Sublocation'
    ? heroData.sublocation
    : '';

  return (
    <>
      {submitSuccess && (
        <div className={styles.thankYouPopup}>
          <div className={styles.thankYouContent}>
            <h2>Thank You!</h2>
            <p>Your message has been sent successfully. We will get back to you shortly.</p>
            <button onClick={closeThankYou}>Close</button>
          </div>
        </div>
      )}
      {!submitSuccess && (
        <div 
          className={styles.heroBanner} 
          style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
        >
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1>{heroData.heading}</h1>
              <h3>{sublocationDisplay}</h3>
              <h3>{heroData.location}</h3>
              <div onClick={() => setIsPopupOpen(true)}>
                <a href="#contact-form" className={styles.enquireNow}>Enquire Now</a>
              </div>
            </div>
           
          </div>
          {isPopupOpen && <EnquirePopup onClose={() => setIsPopupOpen(false)} />}
        </div>
      )}
    </>
  );
};

export default HeroBanner;
