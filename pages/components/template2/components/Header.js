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
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error loading header data: {error.message}</div>;
  }

  return (
    <header className={`${styles.header} ${menuOpen ? styles.open : ''}`}>
      <div className={styles.logoContainer}>
        <img 
          src={headerData.logo || 'default-logo-url'} 
          alt="Logo" 
          className={styles.logo}
        />
      </div>

      <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
        <ul className={styles.navLinks}>
          <li><a href="#about">About</a></li>
          <li><a href="#price">Price</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#amenities">Amenities</a></li>
          <li><a href="#layouts">Layouts</a></li>
          <li><a href="#location">Location</a></li>
          <li><a href="#blogs">Blogs</a></li>
        </ul>
      </nav>



      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={`${styles.line} ${menuOpen ? styles.open : ''}`}></div>
        <div className={`${styles.line} ${menuOpen ? styles.open : ''}`}></div>
        <div className={`${styles.line} ${menuOpen ? styles.open : ''}`}></div>
      </div>
    </header>
  );
};

export default Header;
