import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react'; // Import QRCodeCanvas component
import '../css/Maharera.css'; // Import your CSS file

const MahareraInformation = () => {
  const [reraData, setReraData] = useState([]);

  // Fetching data from the Maharera Information API
  useEffect(() => {
    axios
      .get('http://buyindiahomes.in/api/rera?website=buyindiahomes.in')
      .then((response) => {
        setReraData(response.data.rera); // Assuming "rera" is an array
      })
      .catch((error) => {
        console.error("There was an error fetching the Maharera Information!", error);
      });
  }, []);

  // Check if data is still being loaded
  if (reraData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="maharera-info-container">
      <h2>Maharera Information</h2>

      {reraData.map((reraItem, index) => (
        <div key={index} className="rera-info">
          {/* <h3>Phase: {reraItem.phase_name}</h3> */}
          <div className="rera-info-grid">
            <div className="rera-info-item">
              {/* <strong>QR:</strong> */}
              {reraItem.rera_url ? (
                <QRCodeCanvas value={reraItem.rera_url} size={100} />
              ) : (
                <p>No QR URL available</p>
              )}
            </div>
            <div className="rera-info-item"><strong>Rera:</strong> {reraItem.rera_id}</div>
            <div className="rera-info-item"><strong>Phase Name:</strong> {reraItem.phase_name}</div>
            <div className="rera-info-item"><strong>Completion Date:</strong> {reraItem.completion_date}</div>
            <div className="rera-info-item"><strong>Total Area:</strong> {reraItem.total_area} sqft</div>
            <div className="rera-info-item"><strong>Total Acre:</strong> {reraItem.total_acre}</div>
            <div className="rera-info-item"><strong>Total Towers:</strong> {reraItem.total_tower}</div>
            <div className="rera-info-item"><strong>Total Units:</strong> {reraItem.total_units}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MahareraInformation;
