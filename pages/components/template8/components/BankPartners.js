import React, { useEffect, useState, useRef } from "react";
import { API } from "../../../../Config";
import styles from "../css/BankPartner.module.css";

const BankPartner = () => {
  const [bankData, setBankData] = useState([]);
  const [heading, setHeading] = useState("");
  const [subheading, setSubHeading] = useState("");
  const [showScroll, setShowScroll] = useState(false);
  const scrollerRef = useRef(null);

  useEffect(() => {
    const fetchBankData = async () => {
      try {
        const response = await fetch(API.BANKS());
        const data = await response.json();
        setBankData(data.bank?.banks || []);
        setHeading(data.bank?.page?.heading || "Our Trusted Bank Partners");
        setSubHeading(data.bank?.page?.subheading || "Reliable Financial Support");
      } catch (error) {
        console.error("Error fetching bank partner data:", error);
      }
    };

    fetchBankData();
  }, []);

  useEffect(() => {
    if (scrollerRef.current) {
      setShowScroll(scrollerRef.current.scrollWidth > scrollerRef.current.clientWidth);
    }
  }, [bankData]);

  const scroll = (direction) => {
    if (scrollerRef.current) {
      const scrollAmount = scrollerRef.current.clientWidth / 2; // Adjust dynamically
      scrollerRef.current.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className={styles.bankPartnerSection}>
      <div className={styles.header}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subheading}>{subheading}</p>
      </div>
      <div className={styles.carouselContainer}>
        {showScroll && (
          <button className={styles.scrollButton} onClick={() => scroll(-1)} aria-label="Scroll left">
            &#10094;
          </button>
        )}
        <div className={styles.bankScroller} ref={scrollerRef}>
          {bankData.length > 0 ? (
            bankData.map((bank, index) => (
              <div key={`${bank.id}-${index}`} className={styles.bankCard}>
                <div className={styles.logoContainer}>
                  <img
                    src={bank.property_bank_photo || "/default-bank.png"}
                    alt={bank.bank_name}
                    className={styles.bankLogo}
                    loading="lazy"
                  />
                </div>
                <p className={styles.bankName}>{bank.bank_name}</p>
              </div>
            ))
          ) : (
            <p className={styles.noData}>No bank partners available</p>
          )}
        </div>
        {showScroll && (
          <button className={styles.scrollButton} onClick={() => scroll(1)} aria-label="Scroll right">
            &#10095;
          </button>
        )}
      </div>
    </section>
  );
};

export default BankPartner;
