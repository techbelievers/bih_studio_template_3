import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Link from "next/link";
import { FaBars, FaTimes, FaPhoneAlt } from "react-icons/fa";
import { API } from "../../../../Config";
import EnquirePopup from "./EnquirePopup";
import styles from "../css/Header.module.css";

const Header = ({ headerData: initialHeaderData }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerData, setHeaderData] = useState(initialHeaderData || {});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await axios.get(API.HEADER());
        setHeaderData(response.data);
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    };

    fetchHeaderData();
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isPropertiesPage = router.pathname.includes("/studios");
  const isHomePage = true;

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <Link href="/">
          <img
            src={headerData.logo || "/default-logo.png"}
            alt="Real Estate Logo"
            className={styles.logo}
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className={`${styles.navMenu} ${menuOpen ? styles.active : ""}`}>
        <ul>
          <li><Link href="/">Home</Link></li>
          {isPropertiesPage && (
            <>
              <li><Link href="#about">About</Link></li>
              <li><Link href="#price">Price</Link></li>
              <li><Link href="#amenities">Amenities</Link></li>
              <li><Link href="#layouts">Layouts</Link></li>
              <li><Link href="#gallery">Gallery</Link></li>
              <li><Link href="#location">Location</Link></li>
            </>
          )}
          {isHomePage && !isPropertiesPage && (
            <>
              <li><Link href="#properties">Properties</Link></li>
              <li><Link href="#blogs">Blogs</Link></li>
              <li><Link href="#faq">FAQ</Link></li>
            </>
          )}
        </ul>

        {/* CTA Buttons */}
        <div className={styles.cta}>
          <a href={`tel:${headerData.contact || "+918181817136"}`} className={styles.callButton}>
            <FaPhoneAlt className={styles.phoneIcon} /> Call Us
          </a>
          <motion.button
            onClick={() => setIsPopupOpen(true)}
            className={styles.enquireButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enquire Now
          </motion.button>
        </div>
      </nav>

      {/* Hamburger Menu Button (Mobile) */}
      <div className={styles.hamburger} onClick={toggleMenu}>
        {menuOpen ? <FaTimes className={styles.icon} /> : <FaBars className={styles.icon} />}
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            <button className={styles.closeButton} onClick={closeMenu}>
              <FaTimes className={styles.closeIcon} />
            </button>
            <ul>
              <li><Link href="/" onClick={closeMenu}>Home</Link></li>
              {isPropertiesPage && (
                <>
                  <li><Link href="#about" onClick={closeMenu}>About</Link></li>
                  <li><Link href="#price" onClick={closeMenu}>Price</Link></li>
                  <li><Link href="#amenities" onClick={closeMenu}>Amenities</Link></li>
                  <li><Link href="#layouts" onClick={closeMenu}>Layouts</Link></li>
                  <li><Link href="#gallery" onClick={closeMenu}>Gallery</Link></li>
                  <li><Link href="#location" onClick={closeMenu}>Location</Link></li>
                </>
              )}
              {isHomePage && !isPropertiesPage && (
                <>
                  <li><Link href="#properties" onClick={closeMenu}>Properties</Link></li>
                  <li><Link href="#blogs" onClick={closeMenu}>Blogs</Link></li>
                  <li><Link href="#faq" onClick={closeMenu}>FAQ</Link></li>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enquiry Popup */}
      {isPopupOpen && <EnquirePopup onClose={() => setIsPopupOpen(false)} />}
    </header>
  );
};

export default Header;
