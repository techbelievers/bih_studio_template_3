import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../css/UnitLayout.module.css";
import { API } from "../../../../config.js";

const UnitLayout = () => {
  const [data, setData] = useState([]);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState("");

  useEffect(() => {
    fetch(API.UNIT_LAYOUT())
      .then((res) => res.json())
      .then((d) => {
        setData(d.unit_layout || []);
        setHeading(d.page?.[0]?.heading || "Unit layouts");
        setLoading(false);
      })
      .catch(() => { setError("Failed to load"); setLoading(false); });
  }, []);

  if (loading) return <section className={styles.section}><p className={styles.loading}>Loading…</p></section>;
  if (error) return <section className={styles.section}><p className={styles.error}>{error}</p></section>;
  if (!data.length) return null;

  const settings = { dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1, autoplay: true, autoplaySpeed: 4000, arrows: true };

  return (
    <section id="layouts" className={styles.section}>
      <h2 className={styles.title}>{heading}</h2>
      <p className={styles.desc}>Explore layouts designed for your lifestyle.</p>
      <div className={styles.sliderWrap}>
        <Slider {...settings}>
          {data.map((unit) => (
            <div key={unit.id} className={styles.slide}>
              <div className={styles.card}>
                <div className={styles.imgWrap}>
                  <img src={unit.layout_image} alt={unit.layout_name} onClick={() => setModal(unit.layout_image)} />
                </div>
                <div className={styles.info}>
                  <h3 className={styles.name}>{unit.layout_name}</h3>
                  {unit.unit_layout_carpet_area && <p>Carpet: {unit.unit_layout_carpet_area}</p>}
                  {unit.unit_layout_price && <p>Price: ₹{unit.unit_layout_price}</p>}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {modal && (
        <div className={styles.overlay} onClick={() => setModal("")}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <img src={modal} alt="Layout" />
            <button type="button" className={styles.close} onClick={() => setModal("")} aria-label="Close">×</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default UnitLayout;
