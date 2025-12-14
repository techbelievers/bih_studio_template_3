import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styles from "./ThankYou.module.css";

const ThankYou = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <>
      <Helmet>
        <title>Thank You - Studio Apartments</title>
        <meta name="description" content="Thank you for contacting us" />
      </Helmet>

      <div className={styles.thankYouPage}>
        <div className={styles.clipPath}></div>

        <div className={styles.content}>
          <h1 className={styles.heading}>Thank You!</h1>
          <p className={styles.subheading}>
            We have received your message. Our team will contact you shortly!
          </p>

          <button onClick={handleGoBack} className={styles.goBackButton}>
            Go Back to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default ThankYou;

