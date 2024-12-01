import React, { useState, useEffect } from 'react';
import { API } from '../../../../Config';
import styles from '../css/BankPartner.module.css';

const BankPartner = () => {
  const [bankData, setBankData] = useState([]);
  const [heading, setHeading] = useState("");
  const [subheading, setSubHeading] = useState("");

  useEffect(() => {
    const fetchBankData = async () => {
      try {
        const response = await fetch(API.BANKS());
        const data = await response.json();
        setBankData(data.bank.banks);
        setHeading(data.bank.page?.heading || 'OUR BANK PARTNERS');
        setSubHeading(data.bank.page?.subheading || '');
      } catch (error) {
        console.error('Error fetching bank partner data:', error);
      }
    };

    fetchBankData();
  }, []);

  return (
    <div className={styles.bankPartnerContainer}>
      <h2>{heading}</h2>
      <h3>{subheading}</h3>
      <div className={styles.bankPartnerGrid}>
        {bankData.length > 0 ? (
          bankData.map(bank => (
            <div key={bank.id} className={styles.bankPartnerItem}>
              <img src={bank.property_bank_photo} alt={bank.bank_name} className={styles.bankLogo} />
              <p>{bank.bank_name}</p>
            </div>
          ))
        ) : (
          <p>Loading bank partners...</p>
        )}
      </div>
    </div>
  );
};

export default BankPartner;
