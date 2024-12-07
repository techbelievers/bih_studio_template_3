import React, { useState, useEffect } from "react";
import { API } from "../../../../Config";
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
    <div className={styles.faqSection}>
      <div className={styles.faqHeader}>
        <h2 className={styles.luxuryHeading}>{heading}</h2>
        <p>{subheading}</p>
      </div>
      <div className={styles.faqGrid}>
        {faqData.length > 0 ? (
          faqData.map((faq) => (
            <div
              key={faq.id}
              className={`${styles.faqItem} ${
                activeFAQ === faq.id ? styles.active : ""
              }`}
            >
              <div
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(faq.id)}
              >
                {faq.faq_title}
                <span className={styles.icon}>
                  {activeFAQ === faq.id ? "-" : "+"}
                </span>
              </div>
              <div
                className={styles.faqAnswer}
                style={{
                  maxHeight: activeFAQ === faq.id ? "200px" : "0",
                  overflow: "hidden",
                }}
              >
                <p
                  dangerouslySetInnerHTML={{
                    __html: faq.faq_content,
                  }}
                ></p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading FAQs...</p>
        )}
      </div>
    </div>
  );
};

export default FAQ;
