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

  const chartData = {
    labels: ["Principal", "Total Interest"],
    datasets: [{
      data: [principal || 0, totalInterest || 0],
      backgroundColor: ["#0F766E", "#D97706"],
      hoverBackgroundColor: ["#0D9488", "#B45309"],
      borderWidth: 0,
    }],
  };

  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <h2 className={styles.title}>EMI Calculator</h2>
        <p className={styles.desc}>Estimate your monthly home loan payment.</p>
        <div className={styles.form}>
          <div className={styles.row}>
            <label className={styles.label}>Loan amount (₹)</label>
            <input
              type="number"
              placeholder="e.g. 5000000"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className={styles.input}
              min="0"
            />
          </div>
          <div className={styles.row}>
            <label className={styles.label}>Interest rate (% per year)</label>
            <input
              type="number"
              placeholder="e.g. 8.5"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className={styles.input}
              min="0"
              max="30"
              step="0.1"
            />
          </div>
          <div className={styles.row}>
            <label className={styles.label}>Tenure (years)</label>
            <input
              type="number"
              placeholder="e.g. 20"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={styles.input}
              min="1"
              max="30"
            />
          </div>
          <button
            type="button"
            onClick={calculateEMI}
            disabled={!principal || !rate || !time}
            className={styles.btn}
          >
            Calculate
          </button>
        </div>

        {emi > 0 && (
          <div className={styles.result}>
            <h3 className={styles.resultTitle}>Breakdown</h3>
            <div className={styles.cards}>
              <div className={styles.card}>
                <span className={styles.cardLabel}>Monthly EMI</span>
                <span className={styles.cardVal}>₹{parseFloat(emi).toLocaleString("en-IN")}</span>
              </div>
              <div className={styles.card}>
                <span className={styles.cardLabel}>Total interest</span>
                <span className={styles.cardVal}>₹{parseFloat(totalInterest).toLocaleString("en-IN")}</span>
              </div>
              <div className={styles.card}>
                <span className={styles.cardLabel}>Total payment</span>
                <span className={styles.cardVal}>₹{parseFloat(totalPayment).toLocaleString("en-IN")}</span>
              </div>
            </div>
            <div className={styles.chartWrap}>
              <Doughnut
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: { position: "bottom" },
                    tooltip: {
                      callbacks: {
                        label: (ctx) =>
                          `${ctx.label}: ₹${(ctx.parsed || 0).toLocaleString("en-IN")}`,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EMICalculator;
