import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { API } from "../../../../Config";
import styles from "../css/Header.module.css";

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
        console.error("Error fetching header data:", error);
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
    return (
      <div className={styles.error}>
        Error loading header data: {error.message}
      </div>
    );
  }

  return (
    <header className={styles.header}>
      {/* Logo Section */}
      <div className={styles.logoContainer}>
        <Link href="/">
          <img
            src={headerData.logo || "/default-logo.png"} // Fallback to a default logo
            alt="Real Estate Logo"
            className={styles.logo}
          />
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className={`${styles.navMenu} ${menuOpen ? styles.active : ""}`}>
        <ul>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#price">Price</a>
          </li>
          <li>
            <a href="#gallery">Gallery</a>
          </li>
          <li>
            <a href="#amenities">Amenities</a>
          </li>
          <li>
            <a href="#layouts">Layouts</a>
          </li>
          <li>
            <a href="#location">Location</a>
          </li>
          <li>
            <a href="#blogs">Blogs</a>
          </li>
        </ul>
        {/* CTA for Mobile */}
        <div className={styles.cta}>
          <a
            href={`tel:${headerData.contact || "+1234567890"}`}
            className={styles.callButton}
          >
            Call Us
          </a>
          <Link href="#enquire" className={styles.enquireButton}>
            Enquire Now
          </Link>
        </div>
      </nav>

      {/* Mobile Hamburger Menu */}
      <div className={styles.hamburger} onClick={toggleMenu}>
        {menuOpen ? <FaTimes className={styles.icon} /> : <FaBars className={styles.icon} />}
      </div>

      {/* Background Clip-Path */}
      <div className={styles.clipPath}></div>
    </header>
  );
};

export default Header;
