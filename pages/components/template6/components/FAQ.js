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
    <section id="faq" className={styles.faqSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.subheading}>{subheading}</p>
        </div>

        {/* FAQ Grid */}
        <div className={styles.faqGrid}>
          {faqData.length > 0 ? (
            faqData.map((faq) => (
              <div
                key={faq.id}
                className={`${styles.card} ${
                  activeFAQ === faq.id ? styles.active : ""
                }`}
              >
                <div
                  className={styles.question}
                  onClick={() => toggleFAQ(faq.id)}
                >
                  {faq.faq_title}
                  <span className={styles.icon}>
                    {activeFAQ === faq.id ? "-" : "+"}
                  </span>
                </div>
                <div
                  className={styles.answer}
                  style={{
                    maxHeight: activeFAQ === faq.id ? "150px" : "0",
                    opacity: activeFAQ === faq.id ? 1 : 0,
                    transition: "all 0.3s ease-in-out",
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
            <p className={styles.loading}>Loading FAQs...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
