import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import styles from "./Maharera.module.css";
import { API } from "../../../../../config.js";

const MahareraInformation = ({ propertyDetails, slug }) => {
  const [reraData, setReraData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReraData = async () => {
      try {
        const response = await fetch(API.MAHARERA_STUDIO(slug));
        const data = await response.json();
        if (!response.ok) throw new Error("Failed to fetch data");
        setReraData(data.rera || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReraData();
  }, [slug]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (reraData.length === 0)
    return <div className={styles.empty}>No Maharera information available.</div>;

  const formatCompletionDate = (dateString) =>
    dateString
      ? new Date(dateString).toLocaleString("default", { month: "long", year: "numeric" })
      : "N/A";

  return (
    <section className={styles.mahareraSection}>
      <div className={styles.clipBackground}></div>
      <div className={styles.contentWrapper}>
        <div className={styles.sectionHeader}>
          <div className={styles.headerBadge}>
            <span>🏛️</span>
            <span>Compliance</span>
          </div>
          <h2 className={styles.heading}>
            <span className={styles.headingMain}>
              Maharera <span className={styles.highlight}>Details</span>
            </span>
          </h2>
          <p className={styles.subheading}>
            Ensuring transparency and trust in real estate projects. Explore the latest updates and compliance details for our properties.
          </p>
          <div className={styles.headerDivider}></div>
        </div>

        <div
          className={`${styles.cardsContainer} ${
            reraData.length === 1 ? styles.singleCardContainer : ""
          }`}
        >
          {reraData.map((rera, index) => (
            <motion.div
              key={index}
              className={styles.card}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.cardHeader}>
                <h3 className={styles.phaseName}>{rera.phase_name}</h3>
              </div>
              <div className={styles.cardBody}>
                <ul className={styles.detailsList}>
                  <li>
                    <strong>ID:</strong> {rera.rera_id}
                  </li>
                  <li>
                    <strong>Completion:</strong> {formatCompletionDate(rera.completion_date)}
                  </li>
                  <li>
                    <strong>Area:</strong> {rera.total_area} Sq.M
                  </li>
                  <li>
                    <strong>Acre:</strong> {rera.total_acre}
                  </li>
                  <li>
                    <strong>Towers:</strong> {rera.total_tower}
                  </li>
                  <li>
                    <strong>Units:</strong> {rera.total_units}
                  </li>
                </ul>
              </div>
              <div className={styles.cardFooter}>
                {rera.rera_url ? (
                  <QRCodeCanvas
                    value={rera.rera_url}
                    size={70}
                    className={styles.qrCode}
                  />
                ) : (
                  <p className={styles.noQr}>No QR Code</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MahareraInformation;


