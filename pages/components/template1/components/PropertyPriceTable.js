import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../../../Config'; // Assuming your config.js file is in the correct directory
import styles from '../css/PropertyPriceTable.module.css'; // Assuming you'll style this in a CSS file

const PropertyPriceTable = () => {
    const [propertyPrices, setPropertyPrices] = useState([]);
    const [heading, setHeading] = useState("");
    const [error, setError] = useState(null); // For error handling

    useEffect(() => {
        const fetchPropertyPrices = async () => {
            try {
                const url = API.PROPERTY_PRICES();
                console.log("Fetching property prices from:", url);
                const response = await axios.get(url);
                const data = response.data;
                setPropertyPrices(data.property_prices);
                setHeading(data.page[0].heading);
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
            <h2 className={styles.priceHeading}>{heading}</h2>
    
            <table className={styles.priceTable}>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Tower</th>
                        <th>Carpet Area (SQ.M)</th>
                        <th>Carpet Area (SQ.FT)</th>
                        <th>Price</th>
                        {/* <th>Price Tag</th> */}
                    </tr>
                </thead>
                <tbody>
                    {propertyPrices.map((price) => (
                        <tr key={price.id}>
                            <td className={styles.noWrap}>{price.property_type}</td>
                            <td>{price.property_tower}</td>
                            {/* <td>{price.property_carpet_sqm}</td> */}
                            <td>{parseFloat(price.property_carpet_sqm).toFixed(2)}</td>
                            <td>{price.property_carpet_sqft}</td>
                            <td>
                                {price.property_price} {price.price_unit} - {price.price_tag}
                            </td>
                            {/* <td>{price.price_tag}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <br /><br />
        </div>
    );
};

export default PropertyPriceTable;
