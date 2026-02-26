import React, { useState, useEffect } from "react";
import { API } from "../../../../config.js";
import styles from "../css/FloorPlans.module.css";

const FloorPlans = () => {
  const [plans, setPlans] = useState([]);
  const [heading, setHeading] = useState("");
  const [modal, setModal] = useState(null);

  useEffect(() => {
    fetch(API.FLOOR_PLANS())
      .then((res) => res.json())
      .then((data) => {
        setPlans(data.Floor_plans || []);
        setHeading(data.page?.[0]?.heading || "Floor plans");
      })
      .catch(console.error);
  }, []);

  if (!plans.length) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{heading}</h2>
      <p className={styles.sub}>Thoughtfully designed layouts.</p>
      <div className={styles.grid}>
        {plans.map((plan) => (
          <button key={plan.id} type="button" className={styles.card} onClick={() => setModal(plan.layout_image)}>
            <div className={styles.imgWrap}>
              <img src={plan.layout_image} alt={plan.layout_name} className={styles.img} />
            </div>
            <h3 className={styles.name}>{plan.layout_name}</h3>
          </button>
        ))}
      </div>
      {modal && (
        <div className={styles.overlay} onClick={() => setModal(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <img src={modal} alt="Floor plan" />
            <button type="button" className={styles.close} onClick={() => setModal(null)} aria-label="Close">×</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FloorPlans;
