import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { API } from "../../../../Config";
import styles from "../css/Header.module.css";
import EnquirePopup from "./EnquirePopup";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerData, setHeaderData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
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
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <Link href="/">
            <img
              src={headerData.logo || "/default-logo.png"}
              alt="Logo"
              className={styles.logo}
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav
          className={`${styles.navMenu} ${menuOpen ? styles.active : ""}`}
        >
          <ul className={styles.navLinks}>
            {["About", "Price", "Gallery", "Amenities", "Layouts", "Location", "Blogs"].map(
              (item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={closeMenu} /* Close menu on click */
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>

          <div className={styles.cta}>
            <a
              href={`tel:${headerData.contact || "+1234567890"}`}
              className={styles.callButton}
            >
              Call Us
            </a>
            <button
              className={styles.enquireButton}
              onClick={() => {
                closeMenu();
                setIsPopupOpen(true);
              }}
            >
              Enquire Now
            </button>
          </div>
        </nav>

        {/* Hamburger Menu */}
        <div className={styles.hamburger} onClick={toggleMenu}>
          {menuOpen ? <FaTimes className={styles.icon} /> : <FaBars className={styles.icon} />}
        </div>
      </div>

      {isPopupOpen && <EnquirePopup onClose={() => setIsPopupOpen(false)} />}
    </header>
  );
};

export default Header;
