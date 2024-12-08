import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../../Config";
import EnquirePopup from "./EnquirePopup"; // Import the EnquirePopup component
import styles from "../css/PropertyPriceTable.module.css";

const PropertyPriceTable = () => {
  const [propertyPrices, setPropertyPrices] = useState([]);
  const [heading, setHeading] = useState("");
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup state management

  useEffect(() => {
    const fetchPropertyPrices = async () => {
      try {
        const url = API.PROPERTY_PRICES();
        const response = await axios.get(url);
        const data = response.data;
        setPropertyPrices(data.property_prices);
        setHeading(data.page[0]?.heading || "Property Prices");
      } catch (err) {
        setError("Failed to fetch property prices");
        console.error(err);
      }
    };

    fetchPropertyPrices();
  }, []);

  const handleRequestDetails = () => {
    setIsPopupOpen(true); // Open the popup
  };

  return (
    <section id="price" className={styles.priceSection}>
      <div className={styles.clipPathBackground}></div>
      {error && <p className={styles.errorMessage}>{error}</p>}

      <div className={styles.headingContainer}>
        <h2 className={styles.luxuryHeading}>{heading}</h2>
      </div>

      <div className={styles.priceTableContainer}>
        <table className={styles.priceTable}>
          <thead>
            <tr>
              <th>Type</th>
              <th>Tower</th>
              <th>Carpet Area (SQ.M)</th>
              <th>Carpet Area (SQ.FT)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {propertyPrices.map((price) => (
              <tr key={price.id}>
                <td className={styles.noWrap}>{price.property_type}</td>
                <td>{price.property_tower}</td>
                <td>{parseFloat(price.property_carpet_sqm).toFixed(2)}</td>
                <td>{price.property_carpet_sqft}</td>
                <td>
                  <button
                    onClick={handleRequestDetails}
                    className={styles.requestButton}
                  >
                    Request Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Enquire Popup */}
      {isPopupOpen && (
        <EnquirePopup onClose={() => setIsPopupOpen(false)} />
      )}
    </section>
  );
};

export default PropertyPriceTable;
