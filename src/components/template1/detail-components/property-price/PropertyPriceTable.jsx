import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../../../config.js";
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
      {error && <p className={styles.errorMessage}>{error}</p>}

      {/* Unique Header Design */}
      <div className={styles.headerContainer}>
        <div className={styles.headerBadge}>
          <span>💰</span>
          <span>Pricing</span>
        </div>
        <h2 className={styles.heading}>
          <span className={styles.headingAccent}>{heading}</span>
        </h2>
        <div className={styles.headerDivider}></div>
      </div>

      {/* Card-Based Price Display */}
      {propertyPrices.length > 0 ? (
        <>
          <div className={styles.priceCardsGrid}>
            {propertyPrices.map((price) => (
              <div key={price.id} className={styles.priceCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.typeBadge}>
                    <span className={styles.typeIcon}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/9428/9428563.png"
                        alt="Property Type"
                        className={styles.icon}
                      />
                    </span>
                    <span className={styles.typeText}>{price.property_type}</span>
                  </div>
                  {price.price_tag && (
                    <div className={styles.priceTag}>
                      {price.price_tag}
                    </div>
                  )}
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.priceHighlight}>
                    <span className={styles.priceSymbol}>₹</span>
                    <span className={styles.priceAmount}>{price.property_price}</span>
                    <span className={styles.priceUnit}>{price.price_unit}*</span>
                  </div>

                  <div className={styles.detailsGrid}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Tower</span>
                      <span className={styles.detailValue}>{price.property_tower}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Area (Sq.M)</span>
                      <span className={styles.detailValue}>
                        {parseFloat(price.property_carpet_sqm).toFixed(2)}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Area (Sq.Ft)</span>
                      <span className={styles.detailValue}>{price.property_carpet_sqft}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <button className={styles.enquireButton}>Enquire Now</button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.disclaimer}>
            <span className={styles.disclaimerIcon}>⚠️</span>
            <span>*Prices are subject to change. Terms and conditions apply.</span>
          </div>
        </>
      ) : (
        !error && (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>🏠</span>
            <p>No pricing information available at the moment.</p>
          </div>
        )
      )}
    </section>
  );
};

export default PropertyPriceTable;
