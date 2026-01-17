import React, { useState, useEffect } from "react";
import { API } from "../../../../config.js";
import styles from "../css/FAQ.module.css";

const FAQ = () => {
  const [faqData, setFaqData] = useState([]);
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [activeFAQ, setActiveFAQ] = useState(null);

  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        const response = await fetch(API.FAQ());
        const data = await response.json();
        setFaqData(data.faqs);
        setHeading(data.page[0]?.heading || "FAQ");
        setSubheading(data.page[0]?.subheading || "");
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
      <div className={styles.container}>
        {/* Enhanced Header */}
        <div className={styles.header}>
          <div className={styles.headerBadge}>
            <span className={styles.badgeIcon}>❓</span>
            <span>Frequently Asked</span>
          </div>
          <h2 className={styles.heading}>
            <span className={styles.headingMain}>{heading || "Questions"}</span>
          </h2>
          {subheading && (
            <p className={styles.subheading}>{subheading}</p>
          )}
          <div className={styles.headerDivider}></div>
        </div>

        {/* Enhanced FAQ Grid */}
        <div className={styles.faqGrid}>
          {faqData.length > 0 ? (
            faqData.map((faq, index) => (
              <div
                key={faq.id}
                className={`${styles.card} ${
                  activeFAQ === faq.id ? styles.active : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={styles.question}
                  onClick={() => toggleFAQ(faq.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      toggleFAQ(faq.id);
                    }
                  }}
                >
                  <div className={styles.questionContent}>
                    <span className={styles.questionIcon}>💡</span>
                    <span className={styles.questionText}>{faq.faq_title}</span>
                  </div>
                  <span className={styles.icon}>
                    {activeFAQ === faq.id ? "−" : "+"}
                  </span>
                </div>
                <div
                  className={styles.answer}
                  style={{
                    maxHeight: activeFAQ === faq.id ? "500px" : "0",
                    opacity: activeFAQ === faq.id ? 1 : 0,
                    padding: activeFAQ === faq.id ? "20px 24px" : "0 24px",
                  }}
                >
                  <div
                    className={styles.answerContent}
                    dangerouslySetInnerHTML={{
                      __html: faq.faq_content,
                    }}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.loadingState}>
              <div className={styles.loadingSpinner}></div>
              <p className={styles.loading}>Loading FAQs...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
