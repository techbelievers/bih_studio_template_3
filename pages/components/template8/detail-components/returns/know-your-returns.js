import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./KnowYourReturns.module.css";
import { API } from "../../../../../Config";

const KnowYourReturns = ({ slug }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Standard");

  useEffect(() => {
    const fetchReturnsData = async () => {
      try {
        const response = await fetch(API.KNOW_YOUR_RETURNS_STUDIO(slug));
        const jsonData = await response.json();
        if (!response.ok) throw new Error("Failed to fetch data");
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReturnsData();
  }, [slug]);

  if (loading) return <div className={styles.loader}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!data) return <div className={styles.empty}>No data available.</div>;

  const { page, returns } = data;
  const heading = page[0]?.heading || "Know Your Returns";
  const filteredReturns = returns.filter((item) => item.type === activeTab);

  return (
    <section className={styles.returnsSection}>
      <div className={styles.container}>
        {/* Header */}
        {/* <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.heading}>
            <span className={styles.highlight}>Know Your</span> RETURNS
          </h2>
          <p className={styles.subheading}>
            Maximize your investment with our detailed ROI analysis.
          </p>
        </motion.div> */}

        <motion.div 
  className={styles.sectionHeader}
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <h2 className={styles.heading}>
    <span className={styles.highlight}>Know Your</span> RETURNS
  </h2>
</motion.div>


        {/* Tabs */}
        <div className={styles.tabs}>
          {["Standard", "Premium"].map((tab) => (
            <motion.button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className={styles.tabContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {filteredReturns.length === 0 ? (
              <div className={styles.emptyState}>No data available for {activeTab} returns.</div>
            ) : (
              <div className={styles.tableWrapper}>
                <table className={styles.returnTable}>
                  <tbody>
                    <tr><th>Unit Price (₹)</th><td>{filteredReturns[0].unit_price}</td></tr>
                    <tr><th>Monthly Net Rent (₹)</th><td>{filteredReturns[0].monthly_net_emi}</td></tr>
                    <tr><th>Net Rent Annually (₹)</th><td>{filteredReturns[0].net_rent_annually}</td></tr>
                    <tr><th>ROI (on base price)</th><td className={styles.roi}>{filteredReturns[0].roi}%</td></tr>
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default KnowYourReturns;
