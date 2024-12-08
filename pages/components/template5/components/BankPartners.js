import React, { useEffect, useState } from "react";
import { API } from "../../../../Config";
import styles from "../css/BankPartner.module.css";

const BankPartner = () => {
  const [bankData, setBankData] = useState([]);
  const [heading, setHeading] = useState("");
  const [subheading, setSubHeading] = useState("");

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

  return (
    <section className={styles.bankPartnerSection}>
      <div className={styles.clipBackground}></div>
      <div className={styles.contentWrapper}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subheading}>{subheading}</p>

        <div className={styles.gridWrapper}>
          {bankData.map((bank, index) => (
            <div
              key={bank.id}
              className={styles.bankCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.logoContainer}>
                <img
                  src={bank.property_bank_photo}
                  alt={bank.bank_name}
                  className={styles.bankLogo}
                />
              </div>
              <h3 className={styles.bankName}>{bank.bank_name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BankPartner;
