import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // Import QRCodeCanvas component
import styles from '../css/Maharera.module.css'; // Import your CSS file
import { API } from '../../../../Config'; // Adjust the path as needed

const MahareraInformation = () => {
  const [reraData, setReraData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching data from the Maharera Information API
  useEffect(() => {
    const fetchReraData = async () => {
      try {
        const url = API.MAHARERA(); // Use the API method from config.js
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

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Empty state
  if (reraData.length === 0) {
    return <div>No Maharera information available.</div>;
  }

  const formatCompletionDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' }); // Format: "Month Year"
  };

  return (
    <div className={styles.maharera_info_container}>
      <h2>Maharera Information</h2>

      {reraData.map((reraItem, index) => (
        <div key={index} className={styles.rera_info}>
          <div className={styles.rera_info_grid}>
            <div className={styles.rera_info_item}>
              {reraItem.rera_url ? (
                <QRCodeCanvas value={reraItem.rera_url} size={100} />
              ) : (
                <p>No QR URL available</p>
              )}
            </div>
            <div className={styles.rera_info_item}><strong>Maharera:</strong> <p>{reraItem.rera_id}</p></div>
            <div className={styles.rera_info_item}><strong>Phase Name:</strong> {reraItem.phase_name}</div>
            <div className={styles.rera_info_item}><strong>Completion Date:</strong> {formatCompletionDate(reraItem.completion_date)}</div>
            <div className={styles.rera_info_item}><strong>Total Area:</strong> {reraItem.total_area} sq.m</div>
            <div className={styles.rera_info_item}><strong>Total Acre:</strong> {reraItem.total_acre}</div>
            <div className={styles.rera_info_item}><strong>Total Towers:</strong> {reraItem.total_tower}</div>
            <div className={styles.rera_info_item}><strong>Total Units:</strong> {reraItem.total_units}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MahareraInformation;
