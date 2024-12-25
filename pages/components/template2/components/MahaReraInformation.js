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

  const formatCompletionDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' }); // Format: "Month Year"
  };
  if (reraData.length === 0) {
    return null; // Render a message if data is empty
 }
  return (
    <div className={styles.maharera_info_container}>
      <h2 className={styles.luxuryHeading}>Maharera Information</h2>
      <div className={styles.maharera_grid}>
        {reraData.map((reraItem, index) => (
          <div key={index} className={styles.rera_info_section}>
            <div className={styles.rera_info_left}>
              {reraItem.rera_url ? (
                <QRCodeCanvas value={reraItem.rera_url} size={100} />
              ) : (
                <div className={styles.no_qr}>No QR URL available</div>
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
            <hr className={styles.divider} />
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default MahareraInformation;
