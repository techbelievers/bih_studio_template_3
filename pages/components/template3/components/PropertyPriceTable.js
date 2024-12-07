import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../../../Config'; // Ensure the path to your config is correct
import styles from '../css/PropertyPriceTable.module.css'; // Import CSS Module

const PropertyPriceTable = () => {
    const [propertyPrices, setPropertyPrices] = useState([]);
    const [heading, setHeading] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPropertyPrices = async () => {
            try {
                const url = API.PROPERTY_PRICES();
                const response = await axios.get(url);
                const data = response.data;
                setPropertyPrices(data.property_prices);
                setHeading(data.page[0]?.heading || 'Property Prices'); // Fallback heading
            } catch (err) {
                setError('Failed to fetch property prices');
                console.error(err);
            }
        };

        fetchPropertyPrices();
    }, []);

    return (
        <div id="price" className={`${styles.template1} ${styles.priceSection}`}>
            {error && <p className={styles.errorMessage}>{error}</p>}

            <h2 className={styles.luxuryHeading}>{heading}</h2>

            {/* Scrollable Table */}
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
                                <td className={styles.noWrap}>{price.property_type}</td>
                                <td>{price.property_tower}</td>
                                <td>{parseFloat(price.property_carpet_sqm).toFixed(2)}</td>
                                <td>{price.property_carpet_sqft}</td>
                                <td>
                                    {price.property_price} {price.price_unit}* -{' '}
                                    <span className={styles.priceTag}>{price.price_tag}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PropertyPriceTable;
