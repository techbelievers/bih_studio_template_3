import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // QR Code Component
import { motion } from "framer-motion"; // For Animations
import styles from "../css/Maharera.module.css"; // CSS Module
import { API } from "../../../../config.js"; // API Configuration

const MahareraInformation = () => {
  const [reraData, setReraData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReraData = async () => {
      try {
        const response = await fetch(API.MAHARERA());
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
  }, []);

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
      <div className={styles.sectionHeader}>
        <h2 className={styles.heading}>
          <span>Maharera</span> Information
        </h2>
        <p className={styles.subheading}>
          Transparency you can trust. Explore project compliance and legal details.
        </p>
      </div>

      <motion.div
        className={styles.grid}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {reraData.map((rera, index) => (
          <motion.div
            key={index}
            className={styles.card}
            whileHover={{ scale: 1.05, translateY: -10 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.cardHeader}>
              {rera.rera_url ? (
                <QRCodeCanvas
                  value={rera.rera_url}
                  size={120}
                  className={styles.qrCode}
                />
              ) : (
                <div className={styles.noQr}>No QR Available</div>
              )}
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.phaseName}>{rera.phase_name}</h3>
              <ul className={styles.detailsList}>
                <li>
                  <strong>Maharera ID:</strong> {rera.rera_id}
                </li>
                <li>
                  <strong>Completion Date:</strong> {formatCompletionDate(rera.completion_date)}
                </li>
                <li>
                  <strong>Total Area:</strong> {rera.total_area} Sq.M
                </li>
                <li>
                  <strong>Total Acre:</strong> {rera.total_acre}
                </li>
                <li>
                  <strong>Total Towers:</strong> {rera.total_tower}
                </li>
                <li>
                  <strong>Total Units:</strong> {rera.total_units}
                </li>
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default MahareraInformation;
