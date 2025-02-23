import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { API } from "../../../../Config";
import styles from "../css/BankPartner.module.css";

Chart.register(ArcElement, Tooltip, Legend);

const BankEMI = () => {
  // State for bank partners
  const [bankData, setBankData] = useState([]);
  const [heading, setHeading] = useState("");
  const [subheading, setSubHeading] = useState("");

  // State for EMI Calculator
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

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

  const calculateEMI = () => {
    if (principal && rate && time) {
      const monthlyRate = rate / 100 / 12;
      const months = time * 12;
      const emiValue =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
      const totalPayable = emiValue * months;
      const totalInt = totalPayable - principal;

      setEmi(emiValue.toFixed(2));
      setTotalInterest(totalInt.toFixed(2));
      setTotalPayment(totalPayable.toFixed(2));
    }
  };

  const data = {
    labels: ["Principal", "Total Interest"],
    datasets: [
      {
        data: [principal, totalInterest],
        backgroundColor: ["#e63946", "#f9a826"],
        hoverBackgroundColor: ["#c72736", "#f58f20"],
      },
    ],
  };

  return (
    <section className={styles.bankEMISection}>
      {/* Bank Partners Section */}
      <div className={styles.bankContainer}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subheading}>{subheading}</p>
        <div className={styles.bankGrid}>
          {bankData.length > 0 ? (
            bankData.map((bank, index) => (
              <div key={`${bank.id}-${index}`} className={styles.bankCard}>
                <img
                  src={bank.property_bank_photo || "/default-bank.png"}
                  alt={bank.bank_name}
                  className={styles.bankLogo}
                  loading="lazy"
                />
                <p className={styles.bankName}>{bank.bank_name}</p>
              </div>
            ))
          ) : (
            <p className={styles.noData}>No bank partners available</p>
          )}
        </div>
      </div>

      {/* EMI Calculator Section */}
      <div className={styles.emiCalculator}>
        <h2 className={styles.heading}>EMI Calculator</h2>
        <p className={styles.subheading}>Plan your home loan with ease.</p>
        <div className={styles.formWrapper}>
          <input
            type="number"
            placeholder="Principal Amount (₹)"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Annual Interest Rate (%)"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Loan Tenure (Years)"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={styles.input}
          />
          <button onClick={calculateEMI} className={styles.calculateButton}>
            Calculate EMI
          </button>
        </div>

        {emi > 0 && (
          <div className={styles.resultsWrapper}>
            <div className={styles.resultCard}>
              <h3>Monthly EMI</h3>
              <p>₹{emi}</p>
            </div>
            <div className={styles.resultCard}>
              <h3>Total Interest</h3>
              <p>₹{totalInterest}</p>
            </div>
            <div className={styles.resultCard}>
              <h3>Total Payment</h3>
              <p>₹{totalPayment}</p>
            </div>
            <div className={styles.chartContainer}>
              <Doughnut data={data} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BankEMI;
