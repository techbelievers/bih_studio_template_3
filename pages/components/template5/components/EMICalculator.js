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
  };

  const data = {
    labels: ["Principal", "Total Interest"],
    datasets: [
      {
        data: [principal, totalInterest],
        backgroundColor: ["#4CAF50", "#FFC107"],
        hoverBackgroundColor: ["#45a049", "#ffca28"],
      },
    ],
  };

  return (
    <section className={styles.emiCalculatorSection}>
      <div className={styles.clipPath}></div>
      <div className={styles.container}>
        <h2 className={styles.title}>EMI Calculator</h2>
        <p className={styles.description}>
          Calculate your monthly loan payments effortlessly with our EMI
          calculator.
        </p>
        <div className={styles.form}>
          <input
            type="number"
            placeholder="Principal Amount"
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
            placeholder="Time (Years)"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={styles.input}
          />
          <button onClick={calculateEMI} className={styles.button}>
            Calculate EMI
          </button>
        </div>
        {emi > 0 && (
          <div className={styles.result}>
            <div className={styles.resultCard}>
              <h3>Loan EMI</h3>
              <p>₹{emi}</p>
            </div>
            <div className={styles.resultCard}>
              <h3>Total Interest</h3>
              <p>₹{totalInterest}</p>
            </div>
            <div className={styles.resultCard}>
              <h3>Total Payments</h3>
              <p>₹{totalPayment}</p>
            </div>
            <div className={styles.chartWrapper}>
              <Doughnut data={data} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EMICalculator;
