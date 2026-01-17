import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { API } from "../../../../config.js";
import styles from "../css/Header.module.css";
import EnquirePopup from "./EnquirePopup.jsx";

const Header = ({headerData: initialHeaderData , slug}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerData, setHeaderData] = useState(initialHeaderData || {}); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    // Defer API calls for better LCP
    const fetchHeaderData = async () => {
      if (window.requestIdleCallback) {
        requestIdleCallback(() => {
          axios.get(API.HEADER())
            .then(response => {
              setHeaderData(response.data);
              setLoading(false);
            })
            .catch(error => {
              console.error("Error fetching header data:", error);
              setError(error);
              setLoading(false);
            });
        }, { timeout: 2000 });
      } else {
        setTimeout(() => {
          axios.get(API.HEADER())
            .then(response => {
              setHeaderData(response.data);
              setLoading(false);
            })
            .catch(error => {
              console.error("Error fetching header data:", error);
              setError(error);
              setLoading(false);
            });
        }, 100);
      }
    };

    if (!initialHeaderData) {
      fetchHeaderData();
    } else {
      setLoading(false);
    }
  }, [initialHeaderData]);

  if (error) {
    return (
      <div className={styles.error}>
        Error loading header data: {error.message}
      </div>
    );
  }

  // Check if the current page is a properties page
  const isPropertiesPage = location.pathname.includes("/studios");
  const isHomePage = location.pathname === "/";

  return (
    <header className={`${styles.header} ${menuOpen ? styles.menuOpen : ""}`}>
      {/* Modern Split Layout */}
      <div className={styles.headerWrapper}>
        {/* Left Side - Logo with Tagline */}
        <div className={styles.logoSection}>
          <Link to="/" className={styles.logoLink}>
            <div className={styles.logoContainer}>
              <img
                src={headerData?.logo || headerData?.data?.logo || "/default-logo.png"}
                alt="Real Estate Logo"
                className={styles.logo}
              />
              <div className={styles.logoBadge}>
                <span className={styles.badgeText}>Premium</span>
              </div>
            </div>
            <div className={styles.tagline}>
              <span>Your Dream Home Awaits</span>
            </div>
          </Link>
        </div>

        {/* Center - Navigation */}
        <nav className={`${styles.navMenu} ${menuOpen ? styles.active : ""}`}>
          <div className={styles.navInner}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <a href="/" className={styles.navLink}>
                  <span className={styles.linkIcon}>🏠</span>
                  <span>Home</span>
                </a>
              </li>
              {isPropertiesPage && (
                <>
                  <li className={styles.navItem}>
                    <a href="#about" className={styles.navLink}>
                      <span className={styles.linkIcon}>📋</span>
                      <span>About</span>
                    </a>
                  </li>
                  <li className={styles.navItem}>
                    <a href="#price" className={styles.navLink}>
                      <span className={styles.linkIcon}>💰</span>
                      <span>Price</span>
                    </a>
                  </li>
                  <li className={styles.navItem}>
                    <a href="#amenities" className={styles.navLink}>
                      <span className={styles.linkIcon}>✨</span>
                      <span>Amenities</span>
                    </a>
                  </li>
                  <li className={styles.navItem}>
                    <a href="#layouts" className={styles.navLink}>
                      <span className={styles.linkIcon}>📐</span>
                      <span>Layouts</span>
                    </a>
                  </li>
                  <li className={styles.navItem}>
                    <a href="#gallery" className={styles.navLink}>
                      <span className={styles.linkIcon}>📷</span>
                      <span>Gallery</span>
                    </a>
                  </li>
                  <li className={styles.navItem}>
                    <a href="#location" className={styles.navLink}>
                      <span className={styles.linkIcon}>📍</span>
                      <span>Location</span>
                    </a>
                  </li>
                </>
              )}
              {isHomePage && !isPropertiesPage && (
                <>
                  <li className={styles.navItem}>
                    <a href="#properties" className={styles.navLink}>
                      <span className={styles.linkIcon}>🏢</span>
                      <span>Properties</span>
                    </a>
                  </li>
                  <li className={styles.navItem}>
                    <a href="#blogs" className={styles.navLink}>
                      <span className={styles.linkIcon}>📰</span>
                      <span>Blogs</span>
                    </a>
                  </li>
                  <li className={styles.navItem}>
                    <a href="#faq" className={styles.navLink}>
                      <span className={styles.linkIcon}>❓</span>
                      <span>FAQ</span>
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>

        {/* Right Side - CTA Buttons in Unique Layout */}
        <div className={styles.ctaSection}>
          <a
            href={`tel:${headerData?.contact || headerData?.data?.contact || "+918181817136"}`}
            className={styles.phoneCta}
          >
            <span className={styles.phoneIcon}>📞</span>
            <div className={styles.phoneText}>
              <span className={styles.phoneLabel}>Call Now</span>
              <span className={styles.phoneNumber}>
                {headerData?.contact || headerData?.data?.contact || "+91-81818-17136"}
              </span>
            </div>
          </a>
          <button
            onClick={() => setIsPopupOpen(true)}
            className={styles.enquireCta}
          >
            <span>Enquire</span>
            <span className={styles.arrowIcon}>→</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className={styles.hamburger} onClick={toggleMenu}>
          <div className={styles.hamburgerInner}>
            <span className={menuOpen ? styles.open : ""}></span>
            <span className={menuOpen ? styles.open : ""}></span>
            <span className={menuOpen ? styles.open : ""}></span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            <ul className={styles.mobileNavList}>
              <li><a href="/" onClick={toggleMenu}>Home</a></li>
              {isHomePage && !isPropertiesPage && (
                <>
                  <li><a href="#properties" onClick={toggleMenu}>Properties</a></li>
                  <li><a href="#blogs" onClick={toggleMenu}>Blogs</a></li>
                  <li><a href="#faq" onClick={toggleMenu}>FAQ</a></li>
                </>
              )}
            </ul>
            <div className={styles.mobileCta}>
              <a
                href={`tel:${headerData?.contact || headerData?.data?.contact || "+918181817136"}`}
                className={styles.mobileCallButton}
                onClick={toggleMenu}
              >
                📞 Call Us
              </a>
              <button
                onClick={() => {
                  setIsPopupOpen(true);
                  toggleMenu();
                }}
                className={styles.mobileEnquireButton}
              >
                ✉️ Enquire Now
              </button>
            </div>
          </nav>
        </div>
      )}

      {isPopupOpen && <EnquirePopup onClose={() => setIsPopupOpen(false)} slug={slug} />}
    </header>
  );
};

// export const getServerSideProps = async () => {
//   let headerData = {};
//   try {
//     const response = await axios.get(API.HEADER());
//     headerData = response.data;
//   } catch (error) {
//     console.error("Error fetching header data:", error);
//   }
//   return { props: { getServerSideProps } };
// };


export default Header;
