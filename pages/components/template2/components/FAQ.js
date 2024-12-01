import React, { useState, useEffect } from 'react';
import { API } from '../../../../Config'; // Ensure the correct path
import styles from '../css/FAQ.module.css'; // Ensure the path is correct

const FAQ = () => {
  const [faqData, setFaqData] = useState([]);
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");

  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        const response = await fetch(API.FAQ());
        const data = await response.json();
        setFaqData(data.faqs);
        setHeading(data.page[0]?.heading || 'FAQ');
        setSubheading(data.page[0]?.subheading || '');
      } catch (error) {
        console.error('Error fetching FAQ data:', error);
      }
    };

    fetchFAQData();
  }, []);

  return (
    <div className={styles.faqSection}>
      <div className={styles.faqHeader}>
        <h2 className={styles.luxuryHeading} >{heading}</h2>
        <p>{subheading}</p>
      </div>
      <div className={styles.faqList}>
        {faqData.length > 0 ? (
          faqData.map((faq) => (
            <div key={faq.id} className={styles.faqItem}>
              <div className={styles.faqQuestion}>
                {faq.faq_title}
              </div>
              <div className={styles.faqAnswer}>
                <p dangerouslySetInnerHTML={{ __html: faq.faq_content }}></p>
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
