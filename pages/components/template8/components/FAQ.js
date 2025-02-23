import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API } from "../../../../Config";
import styles from "../css/FAQ.module.css";

const FAQ = () => {
  const [faqData, setFaqData] = useState([]);
  const [heading, setHeading] = useState("Frequently Asked Questions");
  const [subheading, setSubheading] = useState("Find answers to the most common questions.");
  const [activeFAQ, setActiveFAQ] = useState(null);

  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        const response = await fetch(API.FAQ());
        const data = await response.json();
        setFaqData(data.faqs || []);
        if (data.page?.length > 0) {
          setHeading(data.page[0].heading || "FAQ");
          setSubheading(data.page[0].subheading || "");
        }
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    };

    fetchFAQData();
  }, []);

  const toggleFAQ = (id) => {
    setActiveFAQ((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className={styles.faqSection}>
      {/* Real Estate Themed Background */}
      <div className={styles.clipPathBackground}></div>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.subheading}>{subheading}</p>
        </div>

        {/* FAQ List */}
        <div className={styles.faqList}>
          {faqData.length > 0 ? (
            faqData.map((faq) => (
              <motion.div 
                key={faq.id} 
                className={styles.faqItem}
                whileHover={{ scale: 1.02 }}
              >
                <button
                  className={styles.question}
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={activeFAQ === faq.id}
                >
                  {faq.faq_title}
                  <span className={`${styles.icon} ${activeFAQ === faq.id ? styles.active : ""}`}>
                    {activeFAQ === faq.id ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence>
                  {activeFAQ === faq.id && (
                    <motion.div
                      className={styles.answer}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p dangerouslySetInnerHTML={{ __html: faq.faq_content }}></p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <p className={styles.loading}>Loading FAQs...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
