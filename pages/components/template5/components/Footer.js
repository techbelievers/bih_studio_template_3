import React, { useEffect, useState } from "react";
import { API } from "../../../../Config";
import { QRCodeCanvas } from "qrcode.react"; // Import QR Code Component
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

  const reraUrl = "https://maharera.maharashtra.gov.in/"; // Replace with dynamic RERA URL if available

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Centered Row with QR Code and Contact */}
        <div className={styles.footerCenterRow}>
          {/* QR Code */}
          <div className={styles.qrCodeContainer}>
            <QRCodeCanvas
              value={reraUrl}
              size={120}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"H"}
              className={styles.qrCode}
            />
            {/* <p className={styles.qrCodeCaption}>Scan for RERA Details</p> */}
          </div>

          {/* Contact */}
          <div className={styles.footerContact}>
            <p className={styles.contactDetails}>
              Agent RERA: A52100019166 | Project RERA:{" "}
              {g_setting.footer_agent_rera} (
              <a className={styles.privacyPolicy} href={reraUrl} target="_blank" rel="noopener noreferrer">
              https://maharera.maharashtra.gov.in/
              </a>
              )
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.footerBottom}>
          {g_setting.footer_disclamer && (
            <p className={styles.footerDisclaimer}>
              {g_setting.footer_disclamer}
            </p>
          )}
        </div>
        <p className={styles.privacyPolicy}>
          Digital Media Planned By : My Digital Kart
        </p>
        <a href="/privacy-policy" className={styles.privacyPolicy}>
          Privacy Policy
        </a>
        <p className={styles.footerCopyright}>
          {g_setting.footer_copyright}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
