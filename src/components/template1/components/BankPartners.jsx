import React, { useEffect, useState, useRef } from "react";
import { API } from "../../../../config.js";
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

  useEffect(() => {
    const scroll = () => {
      if (scrollerRef.current) {
        scrollerRef.current.scrollBy({
          left: 1,
          behavior: "smooth",
        });
      }
    };

    const interval = setInterval(scroll, 30); // Adjust speed of scrolling
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [bankData]);

  return (
    <section className={styles.bankPartnerSection}>
      <div className={styles.contentWrapper}>
        {/* Enhanced Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerBadge}>
            <span className={styles.badgeIcon}>🏦</span>
            <span>Trusted Partners</span>
          </div>
          <h2 className={styles.heading}>
            <span className={styles.headingMain}>{heading}</span>
          </h2>
          {subheading && (
            <p className={styles.subheading}>{subheading}</p>
          )}
          <div className={styles.headerDivider}></div>
        </div>

        {/* Enhanced Scrolling Container */}
        <div className={styles.scrollerWrapper}>
          <div className={styles.scrollerMask}></div>
          <div className={styles.scrollerContainer} ref={scrollerRef}>
            <div className={styles.bankScroller}>
              {/* Render banks twice for seamless loop */}
              {bankData.concat(bankData).map((bank, index) => (
                <div 
                  key={`${bank.id}-${index}`} 
                  className={styles.bankCard}
                >
                  <div className={styles.cardInner}>
                    <div className={styles.logoContainer}>
                      <img
                        src={bank.property_bank_photo || "/default-bank.png"}
                        alt={bank.bank_name}
                        className={styles.bankLogo}
                      />
                      <div className={styles.logoOverlay}>
                        <span className={styles.checkIcon}>✓</span>
                      </div>
                    </div>
                    <div className={styles.cardFooter}>
                      <p className={styles.bankName}>{bank.bank_name}</p>
                      <div className={styles.trustBadge}>
                        <span>Verified</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.cardShine}></div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.scrollerMaskRight}></div>
        </div>

        {/* Trust Message */}
        <div className={styles.trustMessage}>
          <span className={styles.trustIcon}>🔒</span>
          <span>All our banking partners are verified and RERA approved</span>
        </div>
      </div>
    </section>
  );
};

export default BankPartner;
