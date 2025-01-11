import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./MasterPlan.module.css";
import { API } from "../../../../../Config";

const RealEstateTabs = ({ slug }) => {
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
  }, [slug]);

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
    <section id="layouts" className={styles.container}>
      {/* Section Headers */}
      <motion.div 
        className={styles.sectionHeaders} 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
      </motion.div>

      {/* Section Content */}
      <motion.div 
        className={styles.gridContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {sections[activeSection].data.map((item) => (
          <motion.div
            key={item.id}
            className={styles.card}
            onClick={() => openModal(item.layout_image || item.photo)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
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
          </motion.div>
        ))}
      </motion.div>

      {/* Modal with Close Button */}
      <AnimatePresence>
        {modalImage && (
          <motion.div 
            className={styles.modal} 
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeButton} onClick={closeModal}>
                &times;
              </button>
              <img src={modalImage} alt="Full View" className={styles.modalImage} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RealEstateTabs;
