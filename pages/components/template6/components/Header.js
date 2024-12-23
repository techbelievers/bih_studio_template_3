import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter
import axios from "axios";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { API } from "../../../../Config";
import styles from "../css/Header.module.css";
import EnquirePopup from "./EnquirePopup";

const Header = ({headerData: initialHeaderData}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerData, setHeaderData] = useState(initialHeaderData || {}); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter(); // Initialize useRouter

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

  // if (loading) {
  //   return <div className={styles.loading}>Loading...</div>;
  // }

  if (error) {
    return (
      <div className={styles.error}>
        Error loading header data: {error.message}
      </div>
    );
  }

  // Check if the current page is a properties page
  const isPropertiesPage = router.pathname.includes("/properties");
  // const isHomePage = router.pathname === "/" 
  const isHomePage = true;

  return (
    <header className={`${styles.header} ${menuOpen ? styles.menuOpen : ""}`}>
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
            <a href="/">Home</a>
          </li>
          {isPropertiesPage && (
            <>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#price">Price</a>
              </li>
              <li>
                <a href="#amenities">Amenities</a>
              </li>
              <li>
                <a href="#layouts">Layouts</a>
              </li>
              <li>
            <a href="#gallery">Gallery</a>
          </li>
          <li>
            <a href="#location">Location</a>
          </li>
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

        {/* CTA for Mobile */}
        <div className={styles.cta}>
          <a
            href={`tel:${headerData.contact || "+918181817136"}`}
            className={styles.callButton}
          >
            Call Us
          </a>
          <button
            onClick={() => setIsPopupOpen(true)}
            className={styles.enquireButton}
          >
            Enquire Now
          </button>
        </div>
        {isPopupOpen && <EnquirePopup onClose={() => setIsPopupOpen(false)} />}
      </nav>

      {/* Mobile Hamburger Menu */}
      <div className={styles.hamburger} onClick={toggleMenu}>
        {menuOpen ? <FaTimes className={styles.icon} /> : <FaBars className={styles.icon} />}
      </div>

      {/* Background Animation */}
      <div className={styles.background}></div>
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
