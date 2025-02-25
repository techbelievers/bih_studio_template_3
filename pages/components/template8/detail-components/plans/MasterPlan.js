import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API } from "../../../../../Config";
import styles from "./MasterPlan.module.css";

const RealEstateLayouts = ({ slug }) => {
  const [layouts, setLayouts] = useState([]);
  const [filteredLayouts, setFilteredLayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [modalImage, setModalImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [masterPlanRes, unitLayoutRes, floorPlanRes] = await Promise.all([
          fetch(API.MASTER_LAYOUT_STUDIO(slug)).then(res => res.json()),
          fetch(API.UNIT_LAYOUT_STUDIO(slug)).then(res => res.json()),
          fetch(API.FLOOR_PLANS_STUDIO(slug)).then(res => res.json()),
        ]);

        const allLayouts = [
          ...masterPlanRes.master_layout.map(item => ({ ...item, category: "Master Plan" })),
          ...unitLayoutRes.unit_layout.map(item => ({ ...item, category: "Unit Layout" })),
          ...floorPlanRes.Floor_plans.map(item => ({ ...item, category: "Floor Plan" })),
        ];

        // Extract categories that have data
        const availableCategories = [
          ...(masterPlanRes.master_layout.length ? ["Master Plan"] : []),
          ...(unitLayoutRes.unit_layout.length ? ["Unit Layout"] : []),
          ...(floorPlanRes.Floor_plans.length ? ["Floor Plan"] : []),
        ];

        setLayouts(allLayouts);
        setFilteredLayouts(allLayouts);
        setCategories(availableCategories);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data.");
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const filterLayouts = (category) => {
    if (category === "all") {
      setFilteredLayouts(layouts);
    } else {
      setFilteredLayouts(layouts.filter(item => item.category === category));
    }
    setSelectedCategory(category);
  };

  const openModal = (image) => setModalImage(image);
  const closeModal = () => setModalImage("");

  if (loading) return <div className={styles.loader}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <section id="layouts" className={styles.layoutsSection}>
      <h2 className={styles.sectionTitle}>Explore Real Estate Masterpieces</h2>

      {/* Category Filter (Only Shows Available Categories) */}
      {categories.length > 0 && (
        <motion.div className={styles.filterContainer}>
          {["all", ...categories].map((category) => (
            <button
              key={category}
              className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ""}`}
              onClick={() => filterLayouts(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>
      )}

      {/* Masonry Grid with 3D Flip Cards */}
      <motion.div className={styles.masonryGrid}>
        {filteredLayouts.map((item) => (
          <motion.div
            key={item.id}
            className={styles.flipCard}
            whileHover={{ scale: 1.05 }}
            onClick={() => openModal(item.layout_image || item.photo)}
          >
            <div className={styles.flipCardInner}>
              {/* Front Side with Image */}
              <div className={styles.flipCardFront}>
                <img
                  src={item.layout_image || item.photo}
                  alt={item.layout_name || "Layout"}
                  className={styles.image}
                />
              </div>

              {/* Back Side with Details */}
              <div className={styles.flipCardBack}>
                <h3>{item.layout_name}</h3>
                <p>Category: {item.category}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal for Full-Screen Preview */}
      <AnimatePresence>
        {modalImage && (
          <motion.div className={styles.modal} onClick={closeModal} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className={styles.modalContent} onClick={(e) => e.stopPropagation()} initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
              <button className={styles.closeButton} onClick={closeModal}>✖</button>
              <img src={modalImage} alt="Preview" className={styles.modalImage} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RealEstateLayouts;
