import React, { useState, useEffect } from "react";
import { API } from "../../../../config.js";
import styles from "../css/FAQ.module.css";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    fetch(API.FAQ())
      .then((res) => res.json())
      .then((data) => {
        setFaqs(data.faqs || []);
        setHeading(data.page?.[0]?.heading || "FAQ");
        setSubheading(data.page?.[0]?.subheading || "");
      })
      .catch(console.error);
  }, []);

  if (!faqs.length) return null;

  return (
    <section id="faq" className={styles.section}>
      <h2 className={styles.title}>{heading}</h2>
      {subheading && <p className={styles.sub}>{subheading}</p>}
      <div className={styles.list}>
        {faqs.map((faq) => (
          <div key={faq.id} className={styles.item}>
            <button
              type="button"
              className={styles.q}
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              aria-expanded={openId === faq.id}
            >
              <span>{faq.faq_title}</span>
              <span className={styles.icon}>{openId === faq.id ? "−" : "+"}</span>
            </button>
            {openId === faq.id && (
              <div className={styles.a} dangerouslySetInnerHTML={{ __html: faq.faq_content }} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
