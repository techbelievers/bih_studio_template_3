import React, { useState, useEffect } from "react";
import { API } from "../../../../Config";
import styles from "../css/Advertisements.module.css";

const Advertisements = () => {
  const [ads, setAds] = useState([]);
  const [heading, setHeading] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await fetch(API.STUDIO_ADVERTISEMENT());
        const data = await response.json();
        const advertisements = data.advertisements || [];
        setAds(advertisements);
        setHeading(data.page[0]?.heading || "Featured Advertisements");
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      }
    };

    fetchAdvertisements();

    // Add resize event listener to check for screen size
    const updateScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768); // Consider desktop for screens >= 768px
    };
    updateScreenSize(); // Check on initial load
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  useEffect(() => {
    const shouldEnableSlider = ads.length > 3 || !isDesktop;
    if (shouldEnableSlider) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [ads, isDesktop]);

  if (!ads || ads.length === 0) return null;

  const shouldEnableSlider = ads.length > 3 || !isDesktop;

  return (
    <section className={styles.advertisementSection}>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.sliderContainer}>
        <div
          className={styles.slider}
          style={{
            transform: shouldEnableSlider
              ? `translateX(-${currentIndex * 100}%)`
              : "translateX(0)", // Disable sliding if slider is not enabled
          }}
        >
          {ads.map((ad, index) => (
            <div
              className={`${styles.slide} ${
                shouldEnableSlider ? styles.animatedSlide : ""
              }`}
              key={index}
            >
              {ad.above_category_1 && (
                <a
                  href={ad.above_category_1_url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.adLink}
                >
                  <img
                    src={ad.above_category_1}
                    alt={`Advertisement ${index + 1}`}
                    className={styles.adImage}
                  />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
      {shouldEnableSlider && (
        <div className={styles.dots}>
          {ads.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${
                index === currentIndex ? styles.activeDot : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      )}
    </section>
  );
};

export default Advertisements;
