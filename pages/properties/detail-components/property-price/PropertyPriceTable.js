import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../../Config";
import styles from "./PropertyPriceTable.module.css";

const PropertyPriceTable = ({slug}) => {
  const [propertyPrices, setPropertyPrices] = useState([]);
  const [heading, setHeading] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyPrices = async () => {
      try {
        const url = API.PROPERTY_PRICES_STUDIO(slug);
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

  return (
    <section id="price" className={styles.priceSection}>
      {/* <div className={styles.clipPathBackground}></div> */}
      {error && <p className={styles.errorMessage}>{error}</p>}

      <div className={styles.headingContainer}>
        <h2 className={styles.heading}>
          {heading}
        </h2>
      </div>

      <div className={styles.priceTableContainer}>
        <table className={styles.priceTable}>
          <thead>
            <tr>
              <th>Type</th>
              <th>Tower</th>
              <th>Carpet Area (SQ.M)</th>
              <th>Carpet Area (SQ.FT)</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {propertyPrices.map((price) => (
              <tr key={price.id}>
                <td className={styles.noWrap}>
                  <span className={styles.typeIcon}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/9428/9428563.png"
                      alt="Property Type"
                      className={styles.icon}
                    />
                  </span>
                  {price.property_type}
                </td>
                <td>{price.property_tower}</td>
                <td>{parseFloat(price.property_carpet_sqm).toFixed(2)}</td>
                <td>{price.property_carpet_sqft}</td>
                <td>
                  <span className={styles.price}>
                    {price.property_price} {price.price_unit}*
                  </span>{" "}
                  - <span className={styles.priceTag}>{price.price_tag}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.disclaimer}>
          *Prices are subject to change. Terms and conditions apply.
        </div>
      </div>
    </section>
  );
};

export default PropertyPriceTable;
