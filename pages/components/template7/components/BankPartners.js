import React, { useEffect, useState, useRef } from "react";
import { API } from "../../../../Config";
import styles from "../css/BankPartner.module.css";

const BankPartner = () => {
  const [bankData, setBankData] = useState([]);
  const [heading, setHeading] = useState("");
  const [subheading, setSubHeading] = useState("");
  const scrollerRef = useRef(null);

  useEffect(() => {
    const fetchBankData = async () => {
      try {
        const response = await fetch(API.BANKS());
        const data = await response.json();
        setBankData(data.bank.banks || []);
        setHeading(data.bank.page?.heading || "Our Trusted Bank Partners");
        setSubHeading(data.bank.page?.subheading || "Reliable Financial Support");
      } catch (error) {
        console.error("Error fetching bank partner data:", error);
      }
    };

    fetchBankData();
  }, []);

  const scrollLeft = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className={styles.bankPartnerSection}>
      <div className={styles.header}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subheading}>{subheading}</p>
      </div>
      <div className={styles.carouselContainer}>
        <button className={styles.scrollButton} onClick={scrollLeft}>
          &#10094;
        </button>
        <div className={styles.bankScroller} ref={scrollerRef}>
          {bankData.map((bank, index) => (
            <div key={`${bank.id}-${index}`} className={styles.bankCard}>
              <div className={styles.logoContainer}>
                <img
                  src={bank.property_bank_photo || "/default-bank.png"}
                  alt={bank.bank_name}
                  className={styles.bankLogo}
                />
              </div>
              <p className={styles.bankName}>{bank.bank_name}</p>
            </div>
          ))}
        </div>
        <button className={styles.scrollButton} onClick={scrollRight}>
          &#10095;
        </button>
      </div>
    </section>
  );
};

export default BankPartner;
