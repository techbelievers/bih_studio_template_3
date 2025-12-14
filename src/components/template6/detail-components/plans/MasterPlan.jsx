import React, { useState, useEffect } from "react";
import styles from "./MasterPlan.module.css";
import { API } from "../../../../../config.js";

const RealEstateTabs = ({slug}) => {
  const [activeSection, setActiveSection] = useState(0);
  const [masterPlans, setMasterPlans] = useState([]);
  const [unitLayouts, setUnitLayouts] = useState([]);
  const [floorPlans, setFloorPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const masterPlanResponse = await fetch(API.MASTER_LAYOUT_STUDIO(slug));
        const masterPlanData = await masterPlanResponse.json();
        setMasterPlans(masterPlanData.master_layout);

        const unitLayoutResponse = await fetch(API.UNIT_LAYOUT_STUDIO(slug));
        const unitLayoutData = await unitLayoutResponse.json();
        setUnitLayouts(unitLayoutData.unit_layout);

        const floorPlansResponse = await fetch(API.FLOOR_PLANS_STUDIO(slug));
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

  const openModal = (image) => setModalImage(image);
  const closeModal = () => setModalImage("");

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
          <div
            key={item.id}
            className={styles.card}
            onClick={() => openModal(item.layout_image || item.photo)}
          >
            <div className={styles.imageContainer}>
              <img
                src={item.layout_image || item.photo}
                alt={item.layout_name || "Plan"}
                className={styles.image}
              />
              <div className={styles.overlay}>
                <span className={styles.text}>
                  {item.layout_name || "View Details"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalImage && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent}>
            <img src={modalImage} alt="Full View" className={styles.modalImage} />
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealEstateTabs;
