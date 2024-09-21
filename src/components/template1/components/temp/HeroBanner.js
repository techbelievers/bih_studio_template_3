import React, { useEffect, useState } from 'react';
import '../css/HeroBanner.css';

const HeroBanner = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://buyindiahomes.in/api/header?website=buyindiahomes.in')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setHeroData({
          backgroundImage: data.hero_banner_img,
          heading: data.property_name,
          description: data.hero_banner_subheading
        });
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

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
        <div className="contact-form-container">
          <form className="contact-form">
            <h2>Contact Us</h2>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
