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
    return <div className={styles.loading}>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  // Empty state
  if (reraData.length === 0) {
    return <div className={styles.empty}>No Maharera information available.</div>;
  }

  return (
    <div className={styles.maharera_info_container}>
      <h2>Maharera Information</h2>

      <div className={styles.rera_info_grid}>
        {reraData.map((reraItem, index) => (
          <div key={index} className={styles.rera_info_item}>
            <div className={styles.qr_code}>
              {reraItem.rera_url ? (
                <QRCodeCanvas value={reraItem.rera_url} size={120} />
              ) : (
                <p>No QR URL available</p>
              )}
            </div>
            <div className={styles.rera_details}>
              <div><strong>Rera ID:</strong> {reraItem.rera_id}</div>
              <div><strong>Phase Name:</strong> {reraItem.phase_name}</div>
              <div><strong>Completion Date:</strong> {reraItem.completion_date}</div>
              <div><strong>Total Area:</strong> {reraItem.total_area} sqft</div>
              <div><strong>Total Acre:</strong> {reraItem.total_acre}</div>
              <div><strong>Total Towers:</strong> {reraItem.total_tower}</div>
              <div><strong>Total Units:</strong> {reraItem.total_units}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MahareraInformation;
