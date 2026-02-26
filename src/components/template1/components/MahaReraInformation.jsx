import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import styles from "../css/Maharera.module.css";
import { API } from "../../../../config.js";

const MahareraInformation = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API.MAHARERA())
      .then((r) => { if (!r.ok) throw new Error("Failed to fetch"); return r.json(); })
      .then((data) => { setList(data.rera || []); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  const formatDate = (d) => (d ? new Date(d).toLocaleString("default", { month: "long", year: "numeric" }) : "N/A");

  if (loading) return <section className={styles.section}><p className={styles.loading}>Loading…</p></section>;
  if (error) return <section className={styles.section}><p className={styles.error}>{error}</p></section>;
  if (!list.length) return <section className={styles.section}><p className={styles.empty}>No Maharera information available.</p></section>;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Maharera <span className={styles.titleAccent}>Information</span></h2>
      <p className={styles.sub}>Transparency you can trust. Project compliance and legal details.</p>
      <div className={styles.grid}>
        {list.map((rera, i) => (
          <article key={i} className={styles.card}>
            <div className={styles.qrWrap}>
              {rera.rera_url ? (
                <QRCodeCanvas value={rera.rera_url} size={100} className={styles.qr} />
              ) : (
                <span className={styles.noQr}>No QR</span>
              )}
            </div>
            <h3 className={styles.phase}>{rera.phase_name}</h3>
            <ul className={styles.list}>
              <li><strong>Maharera ID:</strong> {rera.rera_id}</li>
              <li><strong>Completion:</strong> {formatDate(rera.completion_date)}</li>
              <li><strong>Total Area:</strong> {rera.total_area} Sq.M</li>
              <li><strong>Total Acre:</strong> {rera.total_acre}</li>
              <li><strong>Towers:</strong> {rera.total_tower}</li>
              <li><strong>Units:</strong> {rera.total_units}</li>
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MahareraInformation;
