import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import styles from './ThankYouPage.module.css'; // CSS Module for styling

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.thankYouContainer}>
      <div className={styles.card}>
        <h1 className={styles.title}>Thank You!</h1>
        <p className={styles.message}>
          We have received your request. Our team will contact you shortly.
        </p>
        <button 
          className={styles.goBackButton}
          onClick={() => navigate('/')} // Redirects to the home page
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
