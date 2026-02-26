import React, { useState, useEffect } from "react";
import styles from "../css/MasterPlan.module.css";
import { API } from "../../../../config.js";

const RealEstateTabs = () => {
  const [tab, setTab] = useState(0);
  const [master, setMaster] = useState([]);
  const [unit, setUnit] = useState([]);
  const [floor, setFloor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState("");

  useEffect(() => {
    Promise.all([
      fetch(API.MASTER_LAYOUT()).then((r) => r.json()),
      fetch(API.UNIT_LAYOUT()).then((r) => r.json()),
      fetch(API.FLOOR_PLANS()).then((r) => r.json()),
    ])
      .then(([a, b, c]) => {
        setMaster(a.master_layout || []);
        setUnit(b.unit_layout || []);
        setFloor(c.Floor_plans || []);
        setLoading(false);
      })
      .catch(() => { setError("Failed to load"); setLoading(false); });
  }, []);

  const tabs = [
    master.length && { label: "Master plans", data: master, imgKey: "photo" },
    unit.length && { label: "Unit layouts", data: unit, imgKey: "layout_image" },
    floor.length && { label: "Floor plans", data: floor, imgKey: "layout_image" },
  ].filter(Boolean);

  if (loading) return <section className={styles.section}><p className={styles.loading}>Loading…</p></section>;
  if (error) return <section className={styles.section}><p className={styles.error}>{error}</p></section>;
  if (!tabs.length) return null;

  const list = tabs[tab].data;
  const imgKey = tabs[tab].imgKey;
  const getImg = (item) => item[imgKey] || item.layout_image || item.photo;
  const getName = (item) => item.phase_name || item.layout_name || "Plan";

  return (
    <section id="layouts" className={styles.section}>
      <div className={styles.tabs}>
        {tabs.map((t, i) => (
          <button key={i} type="button" className={tab === i ? styles.tabActive : styles.tab} onClick={() => setTab(i)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className={styles.grid}>
        {list.map((item) => (
          <button key={item.id} type="button" className={styles.card} onClick={() => setModal(getImg(item))}>
            <div className={styles.imgWrap}>
              <img src={getImg(item)} alt={getName(item)} />
            </div>
            <span className={styles.name}>{getName(item)}</span>
          </button>
        ))}
      </div>
      {modal && (
        <div className={styles.overlay} onClick={() => setModal("")}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <img src={modal} alt="View" />
            <button type="button" className={styles.close} onClick={() => setModal("")} aria-label="Close">×</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default RealEstateTabs;
