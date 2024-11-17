import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../../../Config'; // Adjust the path as needed
import styles from '../css/Header.module.css'; // Ensure correct path for CSS module

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
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img 
          src={headerData.logo || 'default-logo-url'} 
          alt="Logo" 
          className={styles.logo}
        />
      </div>

      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={`${styles.line} ${menuOpen ? styles.open : ''}`}></div>
        <div className={`${styles.line} ${menuOpen ? styles.open : ''}`}></div>
        <div className={`${styles.line} ${menuOpen ? styles.open : ''}`}></div>
      </div>

      <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
        <ul className={styles.navLinks}>
          <li><a href="#about">ABOUT</a></li>
          <li><a href="#price">PRICE</a></li>
          <li><a href="#gallery">GALLERY</a></li>
          <li><a href="#amenities">AMENITIES</a></li>
          <li><a href="#layouts">LAYOUTS</a></li>
          <li><a href="#location">LOCATION</a></li>
          <li><a href="#blogs">BLOGS</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
