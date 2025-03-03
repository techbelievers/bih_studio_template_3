import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../../../Config";
import { motion } from "framer-motion";
import styles from "./PropertyPriceTable.module.css";

const PropertyPriceTable = ({ slug }) => {
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
  }, [slug]);

  return (
    <section id="price" className={styles.priceSection}>
      {/* Background Clip-path Design */}
      <div className={styles.clipPath}></div>

      {error && <p className={styles.errorMessage}>{error}</p>}

      {/* <motion.div 
        className={styles.headingContainer} 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className={styles.heading}>{heading}</h2>
      </motion.div> */}

      <motion.div 
  className={styles.headingContainer} 
  initial={{ opacity: 0, y: -20 }} 
  animate={{ opacity: 1, y: 0 }}
>
  <h2 className={styles.propertyPricesHeading}>Property Prices</h2>
</motion.div>


      <div className={styles.priceCardContainer}>
        {propertyPrices.map((price) => (
          <motion.div 
            key={price.id} 
            className={styles.priceCard} 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.cardHeader}>
              <h3>{price.property_type}</h3>
              <span className={styles.towerTag}>{price.property_tower}</span>
            </div>
            <div className={styles.cardBody}>
            <p><strong>Carpet Area:</strong> {price.property_carpet_sqft} sq.ft ({price.property_carpet_sqm.toFixed(2)} sq.m)</p>

              <p><strong>Price:</strong> <span className={styles.price}>{price.property_price} {price.price_unit}*</span></p>
              <span className={styles.priceTag}>{price.price_tag}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className={styles.disclaimer} 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
      >
        *Prices are subject to change. Terms and conditions apply.
      </motion.div>
    </section>
  );
};

export default PropertyPriceTable;
