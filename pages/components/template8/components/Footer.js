import React, { useEffect, useState } from "react";
import { API } from "../../../../Config";
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

const socialIconsMap = {
  "fab fa-facebook-f": faFacebookF,
  "fab fa-twitter": faTwitter,
  "fab fa-linkedin-in": faLinkedinIn,
  "fab fa-instagram": faInstagram,
  "fab fa-youtube": faYoutube,
  "fab fa-pinterest-p": faPinterest,
};

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch(API.FOOTER());
        const data = await response.json();
        setFooterData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFooterData();
  }, []);

  if (loading) return <div className={styles.footer}>Loading...</div>;
  if (error)
    return (
      <div className={styles.footer}>Error loading footer: {error.message}</div>
    );

  const { social_icons, g_setting } = footerData;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo & Contact */}
        <div className={styles.footerTop}>
          <div className={styles.logoContainer}>
            <img
              src={g_setting.builder_logo || "/default-logo.png"}
              alt="Company Logo"
              className={styles.footerLogo}
            />
          </div>

          <div className={styles.contactInfo}>
            <h3>Contact Us</h3>
            <p>{g_setting.footer_phone || "+91-9876543210"}</p>
          </div>

          <div className={styles.socialLinks}>
            <h3>Follow Us</h3>
            <div className={styles.icons}>
              {social_icons.map((icon) => (
                <a
                  key={icon.id}
                  href={icon.social_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={socialIconsMap[icon.social_icon] || faLinkedinIn}
                    className={styles.icon}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className={styles.footerBottom}>
          {g_setting.footer_disclamer && (
            <p className={styles.footerDisclaimer}>
              {g_setting.footer_disclamer}
            </p>
          )}
          {g_setting.footer_agent_rera && (
            <p className={styles.footerAgentRera}>
              Agent MahaRERA: {g_setting.footer_agent_rera}
            </p>
          )}
          <p className={styles.footerCopyright}>
            {g_setting.footer_copyright || "© 2024 Real Estate Company"}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
