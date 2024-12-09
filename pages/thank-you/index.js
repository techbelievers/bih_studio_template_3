import React from "react";
import { useRouter } from "next/router";
import styles from "./ThankYou.module.css";

const ThankYou = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/"); // Redirect to the homepage or a specific page
  };

  return (
    <div className={styles.thankYouPage}>
      {/* Clip-Path Background */}
      <div className={styles.clipPath}></div>

      {/* Thank You Content */}
      <div className={styles.content}>
        <h1 className={styles.heading}>Thank You!</h1>
        <p className={styles.subheading}>
          We have received your message. Our team will contact you shortly!
        </p>

        {/* Button to Go Back */}
        <button onClick={handleGoBack} className={styles.goBackButton}>
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
