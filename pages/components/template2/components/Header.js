import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../../../Config';
import styles from '../css/Header.module.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerData, setHeaderData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
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

      <button 
        className={styles.hamburger} 
        onClick={toggleMenu} 
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        <span className={`${styles.line} ${menuOpen ? styles.open : ''}`}></span>
        <span className={`${styles.line} ${menuOpen ? styles.open : ''}`}></span>
        <span className={`${styles.line} ${menuOpen ? styles.open : ''}`}></span>
      </button>

      <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
        <ul className={styles.navLinks}>
          {['About', 'Price', 'Gallery', 'Amenities', 'Layouts', 'Location', 'Blogs'].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
