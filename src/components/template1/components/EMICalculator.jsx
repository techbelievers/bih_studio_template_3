import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "../css/EMICalculator.module.css";

Chart.register(ArcElement, Tooltip, Legend);

const EMICalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

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
    <section className={styles.emiCalculatorSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>EMI Calculator</h2>
        <p className={styles.description}>
          Plan your home loan with ease and explore monthly payment details.
        </p>
        <div className={styles.formWrapper}>
          <div className={styles.inputGroup}>
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
          </div>
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

export default EMICalculator;
