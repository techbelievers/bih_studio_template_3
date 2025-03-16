import React, { useMemo } from 'react';
import styles from './Loader.module.css'; // All loader styles in one CSS file

const Loader = () => {
  const loaderType = useMemo(() => Math.floor(Math.random() * 4) + 1, []); // Random 1 to 4

  return (
    <div className={styles.loader}>
      {loaderType === 1 && (
        <div className={styles.spinner1}>
          <div className={styles.house}></div>
        </div>
      )}
      {loaderType === 2 && (
        <div className={styles.spinner2}>
          <div className={styles.pulse}></div>
        </div>
      )}
      {loaderType === 3 && (
        <div className={styles.spinner3}>
          <div className={styles.bounce}></div>
        </div>
      )}
      {loaderType === 4 && (
        <div className={styles.spinner4}>
          <div className={styles.rotate}></div>
        </div>
      )}
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
};

export default Loader;
