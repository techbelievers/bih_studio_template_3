import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../../Config'; // Adjust the path as needed
import '../css/EnquirePopup.css';

const EnquirePopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email_id: '',
    phone_number: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [headerData, setHeaderData] = useState({});

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await fetch(API.HEADER());
        const data = await response.json();
        setHeaderData(data);
      } catch (error) {
        console.error('Error fetching header data:', error);
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

  return (
    <div className="enquire-popup">
      <div className="enquire-popup-content">
        <button className="enquire-popup-close" onClick={onClose}>X</button>
        <img src={headerData.logo} alt="Builder Logo" className="enquire-popup-logo" />
        <h2>Enquire Now</h2>
        {submitSuccess && <p className="enquire-popup-success">Your message has been sent successfully!</p>}
        {submitError && <p className="enquire-popup-error">{submitError}</p>}
        <form onSubmit={handleSubmit}>
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
            type="email"
            name="email_id"
            placeholder="Email*"
            value={formData.email_id}
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
          <textarea
            name="message"
            placeholder="Your Message*"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquirePopup;
