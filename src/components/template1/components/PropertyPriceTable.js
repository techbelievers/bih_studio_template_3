import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../../Config'; // Assuming your config.js file is in the correct directory
import '../css/PropertyPriceTable.css'; // Assuming you'll style this in a CSS file

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
        <div className="template1 price-section">
            {error && <p className="error-message">{error}</p>}
            <h2 className="price-heading">{heading}</h2>
    
            <table className="price-table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Tower</th>
                        <th>Carpet Area (SQ.M)</th>
                        <th>Carpet Area (SQ.FT)</th>
                        <th>Price</th>
                        <th>Price Tag</th>
                    </tr>
                </thead>
                <tbody>
                    {propertyPrices.map((price) => (
                        <tr key={price.id}>
                            <td>{price.property_type}</td>
                            <td>{price.property_tower}</td>
                            <td>{price.property_carpet_sqm}</td>
                            <td>{price.property_carpet_sqft}</td>
                            <td>
                                {price.property_price} {price.price_unit}
                            </td>
                            <td>{price.price_tag}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
           <br></br><br></br>
        </div>
    );
    
};

export default PropertyPriceTable;
