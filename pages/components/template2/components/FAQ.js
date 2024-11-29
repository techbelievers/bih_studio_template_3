import React, { useState, useEffect } from 'react';
import { API } from '../../../../Config'; // Ensure the correct path
import styles from '../css/FAQ.module.css'; // Ensure the path is correct

const FAQ = () => {
  const [faqData, setFaqData] = useState([]);
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [activeIndex, setActiveIndex] = useState(null); // Track active FAQ

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

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index); // Toggle open and close
  };

  return (
    <div className={styles.faqContainer}>
      <h2>{heading}</h2>
      <h4>{subheading}</h4>
      <div className={styles.faqList}>
        {faqData.length > 0 ? (
          faqData.map((faq, index) => (
            <div key={faq.id} className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}>
              <button className={styles.faqQuestion} onClick={() => toggleFAQ(index)}>
                {faq.faq_title}
                <span className={`${styles.faqIcon} ${activeIndex === index ? styles.rotate : ''}`}>▼</span>
              </button>
              <div className={styles.faqAnswer} style={{ maxHeight: activeIndex === index ? '300px' : '0' }}>
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
