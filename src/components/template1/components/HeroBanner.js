import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/HeroBanner.css';
import { API } from '../../../Config'; // Adjust the path as needed

const HeroBanner = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
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
    const fetchHeaderData = async () => {
      try {
        const response = await fetch(API.HEADER());
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setHeroData({
          backgroundImage: data.hero_banner_img,
          heading: data.property_name,
          description: data.hero_banner_subheading,
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
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
    setSubmitSuccess(false);
    setSubmitError(null);

    try {
      // Post form data to API
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
    return <div className="hero-banner">Loading...</div>;
  }

  if (error) {
    return <div className="hero-banner">Error loading hero banner: {error.message}</div>;
  }

  return (
    <div 
      className="hero-banner" 
      style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
    >
      <div className="hero-content">
        <div className="hero-text">
          <h1>{heroData.heading}</h1>
          <p>{heroData.description}</p>
          <a href="#contact-form" className="enquire-now">Enquire Now</a>
        </div>
        <div className="contact-form-container" id="contact-form">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Contact Us</h2>
            {submitSuccess && <p className="form-success-message">Your message has been sent successfully!</p>}
            {submitError && <p className="form-error-message">{submitError}</p>}
            
            {/* First Name and Last Name in one row */}
            <div className="form-row">
              <div className="form-group">
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
              <div className="form-group">
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

            {/* Email */}
            <div className="form-group">
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

            {/* Phone Number */}
            <div className="form-group">
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

            {/* Message */}
            <div className="form-group">
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
    </div>
  );
};

export default HeroBanner;
