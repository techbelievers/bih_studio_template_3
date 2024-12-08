import React, { useEffect, useState } from "react";
import { API } from "../../../../Config";
import styles from "../css/Footer.module.css";

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

  const { g_setting } = footerData;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Centered Row with Logo and Contact */}
        <div className={styles.footerCenterRow}>
          {/* Logo */}
          <div className={styles.footerLogo}>
            <img
              src={`${g_setting.logo}`}
              alt="Company Logo"
              className={styles.footerLogoImage}
            />
          </div>

          {/* Contact */}
          <div className={styles.footerContact}>
            <p className={styles.contactDetails}>{g_setting.footer_phone}</p>
            {/* <p className={styles.contactEmail}>{g_setting.footer_email}</p> */}
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.footerBottom}>
          {g_setting.footer_disclamer && (
            <p className={styles.footerDisclaimer}>
              {g_setting.footer_disclamer}
            </p>
          )}
          {g_setting.footer_agent_rera && (
            <p className={styles.footerAgentRera}>
              Agent MahaRera: {g_setting.footer_agent_rera}
            </p>
          )}
          <p className={styles.footerCopyright}>
            {g_setting.footer_copyright}
          </p>
          <a href="/privacy-policy" className={styles.privacyPolicy}>
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
