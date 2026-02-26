import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaPhone } from "react-icons/fa";
import { API } from "../../../../config.js";
import styles from "../css/Header.module.css";
import EnquirePopup from "./EnquirePopup.jsx";

const Header = ({ headerData: initialHeaderData, slug }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerData, setHeaderData] = useState(initialHeaderData || {});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const fetchHeaderData = async () => {
      if (window.requestIdleCallback) {
        requestIdleCallback(() => {
          axios.get(API.HEADER())
            .then((response) => {
              setHeaderData(response.data);
              setLoading(false);
            })
            .catch((err) => {
              console.error("Error fetching header data:", err);
              setError(err);
              setLoading(false);
            });
        }, { timeout: 2000 });
      } else {
        setTimeout(() => {
          axios.get(API.HEADER())
            .then((response) => {
              setHeaderData(response.data);
              setLoading(false);
            })
            .catch((err) => {
              console.error("Error fetching header data:", err);
              setError(err);
              setLoading(false);
            });
        }, 100);
      }
    };
    if (!initialHeaderData) fetchHeaderData();
    else setLoading(false);
  }, [initialHeaderData]);

  if (error) {
    return (
      <div className={styles.error}>
        Error loading header: {error?.message ?? String(error)}
      </div>
    );
  }

  const isPropertiesPage = location.pathname.includes("/studios");
  const isHomePage = location.pathname === "/";
  const contact = headerData?.contact || headerData?.data?.contact || "+91-81818-17136";
  const logo = headerData?.logo || headerData?.data?.logo || "/default-logo.png";

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link to="/" className={styles.logoWrap}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </Link>

        <nav className={styles.nav}>
          <a href="/" className={styles.navLink}>Home</a>
          {isPropertiesPage && (
            <>
              <a href="#about" className={styles.navLink}>About</a>
              <a href="#price" className={styles.navLink}>Price</a>
              <a href="#amenities" className={styles.navLink}>Amenities</a>
              <a href="#layouts" className={styles.navLink}>Layouts</a>
              <a href="#gallery" className={styles.navLink}>Gallery</a>
              <a href="#location" className={styles.navLink}>Location</a>
            </>
          )}
          {isHomePage && !isPropertiesPage && (
            <>
              <a href="#properties" className={styles.navLink}>Properties</a>
              <a href="#blogs" className={styles.navLink}>Blogs</a>
              <a href="#faq" className={styles.navLink}>FAQ</a>
            </>
          )}
        </nav>

        <div className={styles.actions}>
          <a href={`tel:${contact.replace(/\s/g, "")}`} className={styles.phoneLink}>
            <FaPhone className={styles.phoneIcon} />
            <span>{contact}</span>
          </a>
          <button type="button" onClick={() => setIsPopupOpen(true)} className={styles.enquireBtn}>
            Enquire
          </button>
        </div>

        <button type="button" className={styles.menuBtn} onClick={toggleMenu} aria-label="Menu">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <div className={styles.drawer}>
          <nav className={styles.drawerNav}>
            <a href="/" onClick={toggleMenu} className={styles.drawerLink}>Home</a>
            {isPropertiesPage && (
              <>
                <a href="#about" onClick={toggleMenu} className={styles.drawerLink}>About</a>
                <a href="#price" onClick={toggleMenu} className={styles.drawerLink}>Price</a>
                <a href="#amenities" onClick={toggleMenu} className={styles.drawerLink}>Amenities</a>
                <a href="#layouts" onClick={toggleMenu} className={styles.drawerLink}>Layouts</a>
                <a href="#gallery" onClick={toggleMenu} className={styles.drawerLink}>Gallery</a>
                <a href="#location" onClick={toggleMenu} className={styles.drawerLink}>Location</a>
              </>
            )}
            {isHomePage && !isPropertiesPage && (
              <>
                <a href="#properties" onClick={toggleMenu} className={styles.drawerLink}>Properties</a>
                <a href="#blogs" onClick={toggleMenu} className={styles.drawerLink}>Blogs</a>
                <a href="#faq" onClick={toggleMenu} className={styles.drawerLink}>FAQ</a>
              </>
            )}
          </nav>
          <div className={styles.drawerActions}>
            <a href={`tel:${contact.replace(/\s/g, "")}`} onClick={toggleMenu} className={styles.drawerPhone}>
              <FaPhone /> Call
            </a>
            <button type="button" onClick={() => { setIsPopupOpen(true); toggleMenu(); }} className={styles.drawerEnquire}>
              Enquire
            </button>
          </div>
        </div>
      )}

      {isPopupOpen && <EnquirePopup onClose={() => setIsPopupOpen(false)} slug={slug} />}
    </header>
  );
};

export default Header;
