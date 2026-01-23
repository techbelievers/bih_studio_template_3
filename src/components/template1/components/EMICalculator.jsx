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
        backgroundColor: ["#4A90E2", "#D4AF37"],
        hoverBackgroundColor: ["#2E7CD6", "#C19D2F"],
        borderWidth: 0,
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
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel}>
                <span className={styles.labelIcon}>💰</span>
                Principal Amount
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.currencySymbol}>₹</span>
                <input
                  type="number"
                  placeholder="Enter loan amount"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  className={styles.input}
                  min="0"
                />
              </div>
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel}>
                <span className={styles.labelIcon}>📊</span>
                Interest Rate (Annual)
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type="number"
                  placeholder="Enter interest rate"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className={styles.input}
                  min="0"
                  max="30"
                  step="0.1"
                />
                <span className={styles.percentSymbol}>%</span>
              </div>
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel}>
                <span className={styles.labelIcon}>⏱️</span>
                Loan Tenure
              </label>
              <div className={styles.inputWrapper}>
                <input
                  type="number"
                  placeholder="Enter years"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={styles.input}
                  min="1"
                  max="30"
                />
                <span className={styles.yearSymbol}>Years</span>
              </div>
            </div>
          </div>
          <button 
            onClick={calculateEMI} 
            className={styles.calculateButton}
            disabled={!principal || !rate || !time}
          >
            <span className={styles.buttonIcon}>🧮</span>
            <span>Calculate EMI</span>
            <span className={styles.buttonArrow}>→</span>
          </button>
        </div>

        {emi > 0 && (
          <div className={styles.resultsWrapper}>
            <div className={styles.resultsHeader}>
              <h3 className={styles.resultsTitle}>Your Loan Breakdown</h3>
            </div>
            <div className={styles.resultsGrid}>
              <div className={styles.resultCard}>
                {/* <div className={styles.resultIcon}>📅</div> */}
                <div className={styles.resultContent}>
                  <h4 className={styles.resultLabel}>Monthly EMI</h4>
                  <p className={styles.resultValue}>₹{parseFloat(emi).toLocaleString('en-IN')}</p>
                  <span className={styles.resultSubtext}>Per month</span>
                </div>
              </div>
              <div className={styles.resultCard}>
                <div className={styles.resultIcon}>💵</div>
                <div className={styles.resultContent}>
                  <h4 className={styles.resultLabel}>Total Interest</h4>
                  <p className={styles.resultValue}>₹{parseFloat(totalInterest).toLocaleString('en-IN')}</p>
                  <span className={styles.resultSubtext}>Over {time} years</span>
                </div>
              </div>
              <div className={styles.resultCard}>
                <div className={styles.resultIcon}>💳</div>
                <div className={styles.resultContent}>
                  <h4 className={styles.resultLabel}>Total Payment</h4>
                  <p className={styles.resultValue}>₹{parseFloat(totalPayment).toLocaleString('en-IN')}</p>
                  <span className={styles.resultSubtext}>Principal + Interest</span>
                </div>
              </div>
            </div>
            <div className={styles.chartContainer}>
              <div className={styles.chartHeader}>
                <h4 className={styles.chartTitle}>Payment Breakdown</h4>
                <p className={styles.chartSubtitle}>Visual representation of your loan</p>
              </div>
              <div className={styles.chartWrapper}>
                <Doughnut 
                  data={data}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          padding: 20,
                          font: {
                            family: "'Inter', sans-serif",
                            size: 14,
                            weight: 600
                          }
                        }
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            let label = context.label || '';
                            if (label) {
                              label += ': ₹';
                            }
                            if (context.parsed !== null) {
                              label += context.parsed.toLocaleString('en-IN');
                            }
                            return label;
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EMICalculator;
