import React from 'react';
import '../css/Services.css'; // Make sure to create a CSS file to style your component

const Services = () => {
  return (
    <div className="services-container">
      <div className="card business-strategy">
        <div className="icon">🌸</div> {/* Replace with your actual icon */}
        <h3>Business Strategy</h3>
        <p>
          You are always welcome to visit our little den. Professional in their craft! 
          All products were super amazing with strong attention to details, comps, and overall vibe.
        </p>
      </div>

      <div className="card local-marketing">
        <div className="icon">🗺️</div> {/* Replace with your actual icon */}
        <h3>Local Marketing</h3>
        <p>
          You are always welcome to visit our little den. Professional in their craft! 
          All products were super amazing with strong attention to details, comps, and overall vibe.
        </p>
      </div>

      <div className="card social-media">
        <div className="icon">🏢</div> {/* Replace with your actual icon */}
        <h3>Social Media</h3>
        <p>
          You are always welcome to visit our little den. Professional in their craft! 
          All products were super amazing with strong attention to details, comps, and overall vibe.
        </p>
      </div>
    </div>
  );
};

export default Services;
