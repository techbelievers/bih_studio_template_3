import React, { useEffect, useState } from "react";
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
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className={styles.footer}>Loading...</div>;
  if (error)
    return (
      <div className={styles.footer}>Error loading footer: {error.message}</div>
    );

  const { social_icons, g_setting } = footerData;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Top Section */}
        <div className={styles.footerTop}>
          {/* Logo */}
          <div className={styles.logoSection}>
            <img
              src={g_setting.builder_logo || "/default-logo.png"}
              alt="Company Logo"
              className={styles.footerLogo}
            />
          </div>

          {/* Follow Us */}
          <div className={styles.socialSection}>
            <h2 className={styles.footerTitle}>Follow Us</h2>
            <div className={styles.socialLinks}>
              {social_icons.map((icon) => (
                <a
                  key={icon.id}
                  href={icon.social_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
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

          {/* Contact Section */}
          <div className={styles.contactSection}>
            <h2 className={styles.footerTitle}>Contact Us</h2>
            <p className={styles.contactDetails}>
              {g_setting.footer_phone || "+91-9876543210"}
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.footerBottom}>
          {g_setting.footer_disclamer && (
          
            <p className={styles.footerDisclaimer}>
          <span>Disclaimer:</span><span className={styles.footerDisclaimer_desc}> This website serves as an informational portal managed by a Maharera-authorized real estate agent and is not an official site of the builder. The content provided here does not constitute an offer for any service. Property prices and availability are subject to change without prior notice, and all images are for representational purposes only. This content is intended for informational purposes only. For the most up-to-date information, accurate pricing, and property availability, please contact us directly using the details on our website. Unauthorized use of the content is strictly prohibited. All rights reserved.
          </span> </p>
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
