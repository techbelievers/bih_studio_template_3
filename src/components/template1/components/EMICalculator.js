import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'; // Import elements

import '../css/EMICalculator.css';

Chart.register(ArcElement, Tooltip, Legend); // Register elements

const EMICalculator = () => {
  const [principal, setPrincipal] = useState();
  const [rate, setRate] = useState();
  const [time, setTime] = useState();
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const calculateEMI = () => {
    const monthlyRate = rate / 100 / 12;
    const months = time * 12;
    const emiValue = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                     (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayable = emiValue * months;
    const totalInt = totalPayable - principal;

    setEmi(emiValue.toFixed(2));
    setTotalInterest(totalInt.toFixed(2));
    setTotalPayment(totalPayable.toFixed(2));
  };

  const data = {
    labels: ['Principal', 'Total Interest'],
    datasets: [{
      data: [principal, totalInterest],
      backgroundColor: ['#4CAF50', '#FFC107'],
      hoverBackgroundColor: ['#45a049', '#ffca28']
    }]
  };

  return (
    <div className="emi-calculator">
      <h2 className="emi-title">EMI Calculator</h2>
      <div className="emi-form">
        <input
          type="number"
          placeholder="Principal Amount"
          value={principal}
          onChange={(e) => setPrincipal(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Annual Interest Rate (%)"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Time (Years)"
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
        />
        <button onClick={calculateEMI}>Calculate EMI</button>
      </div>
      {emi > 0 && (
        <div className="emi-result">
          <h3>Loan EMI: ₹{emi}</h3>
          <h3>Total Interest Payable: ₹{totalInterest}</h3>
          <h3>Total Payments (Principal + Interest): ₹{totalPayment}</h3>
          <Doughnut data={data} />
        </div>
      )}
    </div>
  );
};

export default EMICalculator;
