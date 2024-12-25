import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // QR Code Component
import styles from '../css/Maharera.module.css'; // CSS Module
import { API } from '../../../../Config'; // API Configuration

const MahareraInformation = () => {
  const [reraData, setReraData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReraData = async () => {
      try {
        const url = API.MAHARERA();
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setReraData(data.rera || []); // Assuming "rera" is an array
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReraData();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (reraData.length === 0) {
    return null;
  }

  const formatCompletionDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' }); // "Month Year"
  };

  return (
    <div className={styles.maharera_info_container}>
      <h2 className={styles.luxuryHeading}>Maharera Information</h2>
      <div className={styles.maharera_grid}>
        {reraData.map((reraItem, index) => (
          <div key={index} className={styles.rera_info_card}>
            <div className={styles.rera_info_left}>
              {reraItem.rera_url ? (
                <QRCodeCanvas value={reraItem.rera_url} size={120} className={styles.qrCode} />
              ) : (
                <div className={styles.no_qr}>No QR Code Available</div>
              )}
            </div>
            <div className={styles.rera_info_right}>
              <div className={styles.rera_info_item}>
                <strong>Maharera ID:</strong> {reraItem.rera_id}
              </div>
              <div className={styles.rera_info_item}>
                <strong>Phase Name:</strong> {reraItem.phase_name}
              </div>
              <div className={styles.rera_info_item}>
                <strong>Completion Date:</strong>{' '}
                {formatCompletionDate(reraItem.completion_date)}
              </div>
              <div className={styles.rera_info_item}>
                <strong>Total Area:</strong> {reraItem.total_area} Sq.M
              </div>
              <div className={styles.rera_info_item}>
                <strong>Total Acre:</strong> {reraItem.total_acre}
              </div>
              <div className={styles.rera_info_item}>
                <strong>Total Towers:</strong> {reraItem.total_tower}
              </div>
              <div className={styles.rera_info_item}>
                <strong>Total Units:</strong> {reraItem.total_units}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MahareraInformation;
