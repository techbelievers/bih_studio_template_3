import React, { useState, useEffect } from "react";
import styles from "../css/MasterPlan.module.css";
import { API } from "../../../../Config";
import EnquirePopup from "./EnquirePopup";

const RealEstateTabs = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [masterPlans, setMasterPlans] = useState([]);
  const [unitLayouts, setUnitLayouts] = useState([]);
  const [floorPlans, setFloorPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const masterPlanResponse = await fetch(API.MASTER_LAYOUT());
        const masterPlanData = await masterPlanResponse.json();
        setMasterPlans(masterPlanData.master_layout);

        const unitLayoutResponse = await fetch(API.UNIT_LAYOUT());
        const unitLayoutData = await unitLayoutResponse.json();
        setUnitLayouts(unitLayoutData.unit_layout);

        const floorPlansResponse = await fetch(API.FLOOR_PLANS());
        const floorPlansData = await floorPlansResponse.json();
        setFloorPlans(floorPlansData.Floor_plans || []);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sections = [
    masterPlans.length > 0 && { id: 0, label: "Master Plans", data: masterPlans },
    unitLayouts.length > 0 && { id: 1, label: "Unit Layouts", data: unitLayouts },
    floorPlans.length > 0 && { id: 2, label: "Floor Plans", data: floorPlans },
  ].filter(Boolean);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  if (loading) return <div className={styles.loader}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div id="layouts" className={styles.container}>
      {/* Section Headers */}
      <div className={styles.sectionHeaders}>
        {sections.map((section, index) => (
          <button
            key={section.id}
            className={`${styles.sectionHeader} ${
              activeSection === index ? styles.active : ""
            }`}
            onClick={() => setActiveSection(index)}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Section Content */}
      <div className={styles.gridContainer}>
        {sections[activeSection].data.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <img
                src={item.layout_image || item.photo} // Real image
                alt={item.layout_name || "Plan"}
                className={styles.image}
              />
              <div className={styles.overlay}>
                <button className={styles.requestButton} onClick={openPopup}>
                  Request Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enquire Popup */}
      {isPopupOpen && <EnquirePopup onClose={closePopup} />}
    </div>
  );
};

export default RealEstateTabs;
