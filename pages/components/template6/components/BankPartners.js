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
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subheading}>{subheading}</p>
        <div className={styles.scrollerWrapper} ref={scrollerRef}>
          <div className={styles.bankScroller}>
            {bankData.concat(bankData).map((bank, index) => (
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
        </div>
      </div>
    </section>
  );
};

export default BankPartner;
