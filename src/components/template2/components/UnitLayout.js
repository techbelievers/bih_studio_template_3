import React, { useEffect, useState } from "react";
import "../css/UnitLayout.css"; // Scoped CSS

const UnitLayout = () => {
  const [unitLayoutData, setUnitLayoutData] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("2BHK");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [heading, setHeading] = useState('');

  useEffect(() => {
    fetchUnitLayoutData();
  }, []);

  const fetchUnitLayoutData = async () => {
    try {
      const response = await fetch(
        "http://buyindiahomes.in/api/unit-layout?website=buyindiahomes.in"
      );
      const data = await response.json();
      setUnitLayoutData(data.unit_layout);
      setLoading(false);
      setHeading(data.page[0].heading);
    } catch (err) {
      console.error("Error fetching unit layout data:", err);
      setError("Failed to load unit layout data");
      setLoading(false);
    }
  };

  const handleUnitClick = (unitName) => {
    setSelectedUnit(unitName);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const selectedUnitData = unitLayoutData.find(
    (unit) => unit.layout_name === selectedUnit
  );

  return (
    <div className="template2-unit-layout">
      <h2 className="template2-unit-layout-heading">{heading}</h2>
      <div className="template2-unit-buttons">
        {unitLayoutData.map((unit) => (
          <button
            key={unit.id}
            className={`template2-unit-button ${selectedUnit === unit.layout_name ? "active" : ""}`}
            onClick={() => handleUnitClick(unit.layout_name)}
          >
            {unit.layout_name}
          </button>
        ))}
      </div>
      {selectedUnitData && (
        <div className="template2-unit-content">
          <div className="template2-unit-image-container">
            <img
              src={selectedUnitData.layout_image}
              alt={`Layout for ${selectedUnitData.layout_name}`}
              className="template2-unit-image"
            />
          </div>
          <div className="template2-unit-details">
            <h3>{selectedUnitData.unit_layout_heading}</h3>
            <p>Carpet Area: {selectedUnitData.unit_layout_carpet_area}</p>
            <p>Price: ₹{Number(selectedUnitData.unit_layout_price).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitLayout;
