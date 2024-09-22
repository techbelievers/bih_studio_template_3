import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../../Config'; // Use your config.js structure
import '../css/Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerData, setHeaderData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await axios.get(API.HEADER());
        console.log(API.HEADER()); // Logging the API URL
        setHeaderData(response.data);
      } catch (error) {
        console.error('Error fetching header data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeaderData();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading header data: {error.message}</div>;
  }

  return (
    <header className="header">
      <div className="logo-container">
        <img 
          src={headerData.logo || 'default-logo-url'} // Use logo from API or a default URL
          alt="Logo" 
          className="logo"
        />
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        <span className={menuOpen ? 'line open' : 'line'}></span>
        <span className={menuOpen ? 'line open' : 'line'}></span>
        <span className={menuOpen ? 'line open' : 'line'}></span>
      </div>

      {/* Navigation Menu */}
      <nav className={menuOpen ? 'nav open' : 'nav'}>
        <ul className="nav-links">
          <li><a href="#about">ABOUT</a></li>
          <li><a href="#price">PRICE</a></li>
          <li><a href="#gallery">GALLERY</a></li>
          <li><a href="#amenities">AMENITIES</a></li>
          <li><a href="#layouts">LAYOUTS</a></li>
          <li><a href="#location">LOCATION</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
