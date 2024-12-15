import React from 'react';
import styles from './Loader.module.css'; // Ensure you create the CSS file

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}>
        <div className={styles.house}></div>
      </div>
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
};

export default Loader;
