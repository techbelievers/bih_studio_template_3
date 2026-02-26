import React, { useState, useEffect } from "react";
import { API } from "../../../../config.js";
import styles from "../css/Advertisements.module.css";

const Advertisements = () => {
  const [ads, setAds] = useState([]);
  const [heading, setHeading] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    fetch(API.STUDIO_ADVERTISEMENT())
      .then((res) => res.json())
      .then((data) => {
        setAds(data.advertisements || []);
        setHeading(data.page?.[0]?.heading || "Featured");
      })
      .catch(console.error);

    const update = () => setIsDesktop(window.innerWidth >= 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const useSlider = ads.length > 3 || !isDesktop;
    if (!useSlider || ads.length <= 1) return;
    const t = setInterval(() => setCurrentIndex((i) => (i + 1) % ads.length), 4000);
    return () => clearInterval(t);
  }, [ads.length, isDesktop]);

  if (!ads?.length) return null;

  const useSlider = ads.length > 3 || !isDesktop;
  const go = (dir) => setCurrentIndex((i) => (i + dir + ads.length) % ads.length);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{heading}</h2>
      <div className={styles.sliderWrap}>
        {useSlider && ads.length > 1 && (
          <>
            <button type="button" className={styles.prev} onClick={() => go(-1)} aria-label="Previous">‹</button>
            <button type="button" className={styles.next} onClick={() => go(1)} aria-label="Next">›</button>
          </>
        )}
        <div className={styles.track} style={{ transform: useSlider ? `translateX(-${currentIndex * 100}%)` : "none" }}>
          {ads.map((ad, i) => (
            <div key={i} className={styles.slide}>
              {ad.above_category_1 && (
                <a href={ad.above_category_1_url || "#"} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  <img src={ad.above_category_1} alt="" className={styles.img} />
                  <span className={styles.label}>View offer</span>
                </a>
              )}
            </div>
          ))}
        </div>
        {useSlider && ads.length > 1 && (
          <div className={styles.dots}>
            {ads.map((_, i) => (
              <button key={i} type="button" className={i === currentIndex ? styles.dotActive : styles.dot} onClick={() => setCurrentIndex(i)} aria-label={`Slide ${i + 1}`} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Advertisements;
