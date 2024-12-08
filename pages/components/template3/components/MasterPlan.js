import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../css/MasterPlan.module.css";
import { API } from "../../../../Config";

const RealEstateTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [masterPlans, setMasterPlans] = useState([]);
  const [unitLayouts, setUnitLayouts] = useState([]);
  const [floorPlans, setFloorPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Master Plans
        const masterPlanResponse = await fetch(API.MASTER_LAYOUT());
        const masterPlanData = await masterPlanResponse.json();
        setMasterPlans(masterPlanData.master_layout);

        // Fetch Unit Layouts
        const unitLayoutResponse = await fetch(API.UNIT_LAYOUT());
        const unitLayoutData = await unitLayoutResponse.json();
        setUnitLayouts(unitLayoutData.unit_layout);

        // Fetch Floor Plans
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

  const openModal = (image) => setModalImage(image);
  const closeModal = () => setModalImage("");

  const sliderSettings = {
    dots: true, // Add dots for user indication
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768, // Breakpoint for mobile devices
        settings: {
          slidesToShow: 1, // Show 1 slide on devices with width <= 768px
          infinite: unitLayouts.length > 1, // Only enable infinite if more than 1 slide
        },
      },
    ],
  };

  const tabs = [
    masterPlans.length > 0 && {
      id: 0,
      label: "Master Plans",
      content: (
        <div className={styles.grid}>
          {masterPlans.map((plan) => (
            <div
              key={plan.id}
              className={styles.masterPlanCard}
              onClick={() => openModal(plan.layout_image)}
            >
              <img
                src={plan.layout_image}
                alt={plan.layout_name}
                className={styles.masterPlanImage}
              />
              <div className={styles.overlay}>
                <span className={styles.overlayText}>View Plan</span>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    unitLayouts.length > 0 && {
      id: 1,
      label: "Unit Layouts",
      content: (
        <Slider
          {...{
            ...sliderSettings,
            slidesToShow: Math.min(unitLayouts.length, 3), // Show only available slides
            infinite: unitLayouts.length > 1, // Disable infinite scrolling if there's only 1 slide
          }}
          className={styles.slider}
        >
          {unitLayouts.map((unit) => (
            <div key={unit.id} className={styles.unitSlide}>
              <div className={styles.unitLayoutContainer}>
                <img
                  src={unit.layout_image}
                  alt={`Layout for ${unit.layout_name}`}
                  className={styles.unitImage}
                  onClick={() => openModal(unit.layout_image)}
                />
                <div className={styles.unitDetails}>
                  <h3 className={styles.unitTitle}>{unit.layout_name}</h3>
                  <p className={styles.detail}>
                    <strong>Carpet Area:</strong> {unit.unit_layout_carpet_area}
                  </p>
                  <p className={styles.detail}>
                    <strong>Price:</strong> ₹{unit.unit_layout_price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ),
    },    
    floorPlans.length > 0 && {
      id: 2,
      label: "Floor Plans",
      content: (
        <div className={styles.grid}>
          {floorPlans.map((plan) => (
            <div
              key={plan.id}
              className={styles.floorPlanCard}
              onClick={() => openModal(plan.layout_image)}
            >
              <div className={styles.imageContainer}>
                <img
                  src={plan.layout_image}
                  alt={plan.layout_name}
                  className={styles.image}
                />
              </div>
              <h3 className={styles.planName}>{plan.layout_name}</h3>
            </div>
          ))}
        </div>
      ),
    },
  ].filter(Boolean);

  if (loading) return <div className={styles.loader}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div id="layouts" className={styles.tabContainer}>
      {/* Tab Headers */}
      <div className={styles.tabHeader}>
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            className={`${styles.tabItem} ${
              activeTab === index ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </div>
        ))}
        <div
          className={styles.activeIndicator}
          style={{
            transform: `translateX(${activeTab * 100}%)`,
          }}
        />
      </div>

      {/* Tab Content */}
      <div className={styles.tabContentWrapper}>
        {tabs.map(
          (tab, index) =>
            activeTab === index && (
              <div key={tab.id} className={styles.tabContentAnimated}>
                {tab.content}
              </div>
            )
        )}
      </div>

      {/* Modal */}
      {modalImage && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent}>
            <img
              src={modalImage}
              alt="Detailed View"
              className={styles.modalImage}
            />
            <button className={styles.closeButton} onClick={closeModal}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default RealEstateTabs;
