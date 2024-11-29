import React, { useEffect, useState } from "react";
import styles from "../css/UnitLayout.module.css"; // Scoped CSS
import { API } from "../../../../Config";

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
      const response = await fetch(API.UNIT_LAYOUT());
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


  if (unitLayoutData.length === 0) {
    return null; // Render a message if data is empty
 }


  return (
    <div id="layouts" className={styles.unitLayout}>
      <h2 className={styles.unitLayoutHeading}>{heading}</h2>
      <div className={styles.unitButtons}>
        {unitLayoutData.map((unit) => (
          <button
            key={unit.id}
            className={`${styles.unitButton} ${selectedUnit === unit.layout_name ? styles.active : ""}`}
            onClick={() => handleUnitClick(unit.layout_name)}
          >
            {unit.layout_name}
          </button>
        ))}
      </div>
      {selectedUnitData && (
        <div className={styles.unitContent}>
          <img
            src={selectedUnitData.layout_image}
            alt={`Layout for ${selectedUnitData.layout_name}`}
            className={styles.unitImage}
          />
          <div className={styles.unitDetails}>
            <h3>{selectedUnitData.unit_layout_heading}</h3>
            <p>Carpet Area: {selectedUnitData.unit_layout_carpet_area}</p>
            {/* <p>Price: ₹{Number(selectedUnitData.unit_layout_price).toLocaleString()}</p> */}
            <p>Price: ₹ {selectedUnitData.unit_layout_price }</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitLayout;
