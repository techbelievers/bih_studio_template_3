// src/components/HeroBanner.js
import React, { useEffect, useState } from 'react';
import '../css/HeroBanner.css';
import { API } from '../../../Config';

const HeroBanner = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch(API.HEADER())
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
      <h1>{heroData.heading}</h1>
      <p>{heroData.description}</p>
    </div>
  );
};

export default HeroBanner;
