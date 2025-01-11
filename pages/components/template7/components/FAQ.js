import React, { useState, useEffect } from "react";
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
              <div key={faq.id} className={styles.faqItem}>
                <div className={styles.question} onClick={() => toggleFAQ(faq.id)}>
                  {faq.faq_title}
                  <span className={`${styles.icon} ${activeFAQ === faq.id ? styles.active : ""}`}>
                    {activeFAQ === faq.id ? "−" : "+"}
                  </span>
                </div>
                <div
                  className={styles.answer}
                  style={{ 
                    maxHeight: activeFAQ === faq.id ? "500px" : "0",
                    opacity: activeFAQ === faq.id ? 1 : 0,
                    padding: activeFAQ === faq.id ? "10px 15px" : "0 15px",
                  }}
                >
                  <p dangerouslySetInnerHTML={{ __html: faq.faq_content }}></p>
                </div>
              </div>
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
