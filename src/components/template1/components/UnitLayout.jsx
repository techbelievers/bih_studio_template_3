import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../css/UnitLayout.module.css";
import { API } from "../../../../config.js";

const UnitLayout = () => {
  const [unitLayoutData, setUnitLayoutData] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  useEffect(() => {
    fetchUnitLayoutData();
  }, []);

  const fetchUnitLayoutData = async () => {
    try {
      const response = await fetch(API.UNIT_LAYOUT());
      const data = await response.json();
      setUnitLayoutData(data.unit_layout);
      setHeading(data.page[0].heading);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching unit layout data:", err);
      setError("Failed to load unit layout data");
      setLoading(false);
    }
  };

  const openModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

  if (loading) return <div className={styles.loader}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div id="layouts" className={styles.unitLayout}>
      <div className={styles.header}>
        <h2 className={styles.luxuryHeading}>{heading}</h2>
        <p className={styles.description}>
          Explore our beautiful unit layouts crafted for every lifestyle.
        </p>
      </div>
      <Slider {...settings} className={styles.sliderContainer}>
        {unitLayoutData.map((unit) => (
          <div key={unit.id} className={styles.slide}>
            <div className={styles.unitDetailsContainer}>
              <div className={styles.detailsRight}>
                <img
                  src={unit.layout_image}
                  alt={`Layout for ${unit.layout_name}`}
                  className={styles.unitImage}
                  onClick={() => openModal(unit.layout_image)}
                />
              </div>
              <div className={styles.detailsLeft}>
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

      {/* Modal for Image */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent}>
            <img src={modalImage} alt="Modal" className={styles.modalImage} />
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitLayout;
