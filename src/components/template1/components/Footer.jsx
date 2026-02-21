import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API } from "../../../../config.js";
import styles from "../css/Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faPinterest,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const location = useLocation();
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check if we're on the home page
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch(API.FOOTER());
        const data = await response.json();
        setFooterData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchFooterData();
  }, []);

  if (loading) {
    return (
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading footer...</p>
          </div>
        </div>
      </footer>
    );
  }
  
  if (error) {
    return (
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.errorState}>
            <p>Unable to load footer information</p>
          </div>
        </div>
      </footer>
    );
  }

  const { social_icons, g_setting } = footerData;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Top Section - Enhanced Layout */}
        <div className={styles.footerTop}>
          {/* Logo Section with Description */}
          <div className={styles.logoSection}>
            <img
              src={g_setting.builder_logo || "/default-logo.png"}
              alt="Company Logo"
              className={styles.footerLogo}
            />
            <p className={styles.logoDescription}>
              Your trusted partner in finding the perfect studio. We make real estate dreams come true.
            </p>
            <div className={styles.trustBadge}>
              <span className={styles.badgeIcon}>✓</span>
              <span>MAHARERA Certified</span>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className={styles.quickLinksSection}>
            <h3 className={styles.sectionTitle}>Quick Links</h3>
            <ul className={styles.quickLinks}>
              <li><a href="#properties">Properties</a></li>
              <li><a href="#blogs">Blogs</a></li>
              <li><a href="#faq">FAQ</a></li>
              {isHomePage && <li><a href="#contact">Contact Us</a></li>}
            </ul>
          </div>

          {/* Follow Us - Enhanced */}
          <div className={styles.socialSection}>
            <h3 className={styles.sectionTitle}>Follow Us</h3>
            <p className={styles.socialDescription}>
              Stay connected with us on social media
            </p>
            <div className={styles.socialLinks}>
              {social_icons.map((icon) => (
                <a
                  key={icon.id}
                  href={icon.social_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  aria-label={`Follow us on ${icon.social_icon}`}
                >
                  <FontAwesomeIcon
                    icon={
                      icon.social_icon === "fab fa-facebook-f"
                        ? faFacebookF
                        : icon.social_icon === "fab fa-twitter"
                        ? faTwitter
                        : icon.social_icon === "fab fa-linkedin-in"
                        ? faLinkedinIn
                        : icon.social_icon === "fab fa-instagram"
                        ? faInstagram
                        : icon.social_icon === "fab fa-youtube"
                        ? faYoutube
                        : icon.social_icon === "fab fa-pinterest-p"
                        ? faPinterest
                        : faLinkedinIn
                    }
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Section - Enhanced */}
          <div className={styles.contactSection}>
            <h3 className={styles.sectionTitle}>Get In Touch</h3>
            <div className={styles.contactMethods}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <div className={styles.contactInfo}>
                  <span className={styles.contactLabel}>Phone</span>
                  <a href={`tel:${g_setting.footer_phone || "+919876543210"}`} className={styles.contactValue}>
                    {g_setting.footer_phone || "+91-98765-43210"}
                  </a>
                </div>
              </div>
              {/* <div className={styles.contactItem}>
                <span className={styles.contactIcon}>✉️</span>
                <div className={styles.contactInfo}>
                  <span className={styles.contactLabel}>Email</span>
                  <a href="mailto:info@buyindiahomes.in" className={styles.contactValue}>
                    info@buyindiahomes.in
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Bottom Section - Enhanced */}
        <div className={styles.footerBottom}>
          <div className={styles.footerBottomContent}>
            {g_setting.footer_agent_rera && (
              <div className={styles.reraBadge}>
                <span className={styles.reraIcon}>🏛️</span>
                <div className={styles.reraInfo}>
                  <span className={styles.reraLabel}>Agent MahaRERA</span>
                  <span className={styles.reraNumber}>{g_setting.footer_agent_rera}</span>
                </div>
              </div>
            )}
            
            {g_setting.footer_disclamer && (
              <div className={styles.disclaimerWrapper}>
                <div className={styles.disclaimerHeader}>
                  <span className={styles.disclaimerIcon}>ℹ️</span>
                  <strong className={styles.disclaimerTitle}>Disclaimer</strong>
                </div>
                <p className={styles.footerDisclaimer}>
                  <span className={styles.footerDisclaimer_desc}>
                    This website serves as an informational portal managed by a Maharera-authorized real estate agent and is not an official site of the builder. The content provided here does not constitute an offer for any service. Property prices and availability are subject to change without prior notice, and all images are for representational purposes only. This content is intended for informational purposes only. For the most up-to-date information, accurate pricing, and property availability, please contact us directly using the details on our website. Unauthorized use of the content is strictly prohibited. All rights reserved.
                  </span>
                </p>
              </div>
            )}
            
            <div className={styles.copyrightWrapper}>
              <p className={`${styles.footerCopyright} whitespace-pre-line`}>
                {g_setting.footer_copyright || "© 2024 Real Estate Company. All rights reserved."}
              </p>
              <p className={styles.footerCredit}>
                Designed with <span className={styles.heart}>♥</span> for Properties seekers
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
