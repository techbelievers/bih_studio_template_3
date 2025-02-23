import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import axios from "axios";
import styles from "./Maharera.module.css";
import { API } from "../../../../../Config";

const MahareraSection = ({ slug }) => {
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

  if (loading) return <p className={styles.loading}>Fetching Maharera Details...</p>;
  if (error || !reraData.length) return <p className={styles.error}>No Maharera details available.</p>;

  return (
    <section className={styles.mahareraContainer}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className={styles.heading}>
          Maha<span className={styles.highlight}>RERA</span> Details
        </h2>
        <p className={styles.link}>
          MahaRERA:{" "}
          <a href="https://maharera.mahaonline.gov.in" target="_blank" rel="noopener noreferrer">
            Visit Official Website
          </a>
        </p>
      </motion.div>

      <div className={styles.tableWrapper}>
        <motion.table 
          className={styles.reraTable}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <thead>
            <tr>
              <th>Project</th>
              <th>RERA No</th>
              <th>Completion</th>
              <th>Area</th>
              <th>Acre</th>
              <th>Towers</th>
              <th>Units</th>
              <th>QR Code</th>
            </tr>
          </thead>
          <tbody>
            {reraData.map((rera, index) => (
              <motion.tr 
                key={index}
                className={styles.row}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <td>{rera.phase_name || "N/A"}</td>
                <td>{rera.rera_id || "N/A"}</td>
                <td>{rera.completion_date || "N/A"}</td>
                <td>{rera.total_area || "N/A"} m²</td>
                <td>{rera.total_acre || "N/A"}</td>
                <td>{rera.total_tower || "N/A"}</td>
                <td>{rera.total_units || "N/A"}</td>
                <td className={styles.qrCodeCell}>
                  {rera.rera_url && <QRCodeCanvas value={rera.rera_url} size={60} />}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </section>
  );
};

export default MahareraSection;
