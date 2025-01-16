import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { API } from "../../../../Config";
import styles from "../css/Header.module.css";
import EnquirePopup from "./EnquirePopup";

const Header = ({ headerData: initialHeaderData }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerData, setHeaderData] = useState(initialHeaderData || {});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();

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

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const isPropertiesPage = router.pathname.includes("/studios");
  const isHomePage = router.pathname === "/";

  return (
    <header className={styles.header}>
      {/* Logo Section */}
      <div className={styles.logoContainer}>
        <Link href="/">
          <img
            src={headerData.logo || "/default-logo.png"}
            alt="Real Estate Logo"
            className={styles.logo}
          />
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className={`${styles.navMenu} ${menuOpen ? styles.active : ""}`}>
        <ul>
          <li><a href="/">Home</a></li>
          {isPropertiesPage && (
            <>
              <li><a href="#about">About</a></li>
              <li><a href="#price">Price</a></li>
              <li><a href="#amenities">Amenities</a></li>
              <li><a href="#layouts">Layouts</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#location">Location</a></li>
            </>
          )}
          {isHomePage && !isPropertiesPage && (
            <>
              <li><a href="#properties">Properties</a></li>
              <li><a href="#blogs">Blogs</a></li>
              <li><a href="#faq">FAQ</a></li>
            </>
          )}
        </ul>

        {/* CTA Buttons */}
        <div className={styles.cta}>
          <a href={`tel:${headerData.contact || "+918181817136"}`} className={styles.callButton}>
            Call Us
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
        {isPopupOpen && <EnquirePopup onClose={() => setIsPopupOpen(false)} />}
      </nav>

      {/* Mobile Hamburger Menu */}
      <div className={styles.hamburger} onClick={toggleMenu}>
        {menuOpen ? <FaTimes className={styles.icon} /> : <FaBars className={styles.icon} />}
      </div>

      {/* Mobile Menu Animation */}
    {/* Mobile Menu Animation */}
    <AnimatePresence>
  {menuOpen && (
    <motion.div
      className={styles.mobileMenu}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3 }}
    >
      {/* Close Button */}
      <button className={styles.closeButton} onClick={toggleMenu}>
        <FaTimes className={styles.closeIcon} />
      </button>
      <ul>
        <li><a href="/">Home</a></li>
        {isPropertiesPage && (
          <>
            <li><a href="#about">Properties</a></li>
            <li><a href="#price">Price</a></li>
            <li><a href="#amenities">Amenities</a></li>
            <li><a href="#layouts">Layouts</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#location">Location</a></li>
          </>
        )}
       {isHomePage && !isPropertiesPage &&(
          <>
           <li>
            <a href="#properties">Properties</a>
          </li>
          <li>
            <a href="#blogs">Blogs</a>
          </li>
          <li>
           <a href="#faq">FAQ</a>
         </li>
          </>
         )}
      </ul>
    </motion.div>
  )}
</AnimatePresence>


    </header>
  );
};

export default Header;
