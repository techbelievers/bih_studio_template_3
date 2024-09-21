// src/components/Header.js
import React, { useState } from 'react';
import '../css/Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img 
          src="https://koltepatilcanvashinjewadi.com/wp-content/uploads/2024/07/PNG-LR-KPDL-PNG@4x.png" 
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
          <li><a href="#unitplan">UNIT PLAN</a></li>
          <li><a href="#location">LOCATION</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
