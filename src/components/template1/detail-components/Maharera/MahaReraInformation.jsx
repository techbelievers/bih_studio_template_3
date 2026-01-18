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
            <span className={styles.badgeIcon}>🏛️</span>
            <span>Compliance</span>
          </div>
          <h2 className={styles.heading}>
            <span className={styles.headingMain}>
              Maharera <span className={styles.highlight}>Details</span>
            </span>
          </h2>
          <p className={styles.subheading}>
            Ensuring transparency and trust in real estate projects
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
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.cardTopBorder}></div>
              <div className={styles.cardHeader}>
                <h3 className={styles.phaseName}>{rera.phase_name}</h3>
              </div>
              <div className={styles.cardBody}>
                <ul className={styles.detailsList}>
                  <li className={styles.detailItem}>
                    <div className={styles.detailContent}>
                      <span className={styles.detailLabel}>Maharera ID</span>
                      <span className={styles.detailValue}>{rera.rera_id}</span>
                    </div>
                  </li>
                  <li className={styles.detailItem}>
                    <div className={styles.detailContent}>
                      <span className={styles.detailLabel}>Completion</span>
                      <span className={styles.detailValue}>{formatCompletionDate(rera.completion_date)}</span>
                    </div>
                  </li>
                  <li className={styles.detailItem}>
                    <div className={styles.detailContent}>
                      <span className={styles.detailLabel}>Area</span>
                      <span className={styles.detailValue}>{rera.total_area} Sq.M</span>
                    </div>
                  </li>
                  <li className={styles.detailItem}>
                    <div className={styles.detailContent}>
                      <span className={styles.detailLabel}>Acre</span>
                      <span className={styles.detailValue}>{rera.total_acre}</span>
                    </div>
                  </li>
                  <li className={styles.detailItem}>
                    <div className={styles.detailContent}>
                      <span className={styles.detailLabel}>Towers</span>
                      <span className={styles.detailValue}>{rera.total_tower}</span>
                    </div>
                  </li>
                  <li className={styles.detailItem}>
                    <div className={styles.detailContent}>
                      <span className={styles.detailLabel}>Units</span>
                      <span className={styles.detailValue}>{rera.total_units}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className={styles.cardFooter}>
                {rera.rera_url ? (
                  <div className={styles.qrContainer}>
                    <div className={styles.qrLabel}>
                      <span>Scan to Verify</span>
                    </div>
                    <QRCodeCanvas
                      value={rera.rera_url}
                      size={60}
                      className={styles.qrCode}
                    />
                  </div>
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


