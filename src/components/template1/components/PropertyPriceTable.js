import React, { useEffect, useState } from 'react';
import '../css/PropertyPriceTable.css'; // Assuming you'll style this in a CSS file

const PropertyPriceTable = () => {
    const [propertyPrices, setPropertyPrices] = useState([]);
    const [heading, setHeading] = useState("");

    useEffect(() => {
        // Fetching the data from the API
        fetch("http://buyindiahomes.in/api/property-prices?website=buyindiahomes.in")
            .then((response) => response.json())
            .then((data) => {
                setPropertyPrices(data.property_prices);
                setHeading(data.page[0].heading); 
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="price-section">
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
        </div>
    );
};

export default PropertyPriceTable;
