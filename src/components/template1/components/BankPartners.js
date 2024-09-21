import React, { useState, useEffect, useRef } from 'react';
import { API } from '../../../Config'; // Use your config.js structure
import '../css/BankPartner.css'; // Ensure the path is correct

const BankPartner = () => {
  const [bankData, setBankData] = useState([]);
  const [heading, setHeading] = useState("");
  const [subheading, setSubHeading] = useState("");
  const sliderRef = useRef(null);

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({
          left: sliderRef.current.clientWidth * 0.9, // Slide by 90% of the container width
          behavior: 'smooth',
        });
      }
    }, 5000); // Adjust the interval for automatic sliding

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bank-partner-container">
      <h2>{heading}</h2>
      <h4>{subheading}</h4>
      <div className="bank-partner-slider" ref={sliderRef}>
        {bankData.length > 0 ? (
          bankData.map(bank => (
            <div key={bank.id} className="bank-partner-item">
              <img src={bank.property_bank_photo} alt={bank.bank_name} />
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
