import React, { useState, useEffect } from "react";
import { API } from "../../../../config.js";
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

    const updateScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    updateScreenSize();
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

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? ads.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
  };

  return (
    <section className={styles.advertisementSection}>
      {/* Enhanced Header */}
      <div className={styles.sectionHeader}>
        <div className={styles.headerBadge}>
          <span className={styles.badgeIcon}>📢</span>
          <span>Special Offers</span>
        </div>
        <h2 className={styles.heading}>{heading || "Featured Advertisements"}</h2>
        <div className={styles.headerDivider}></div>
      </div>

      {/* Enhanced Slider Container */}
      <div className={styles.sliderWrapper}>
        <div className={styles.sliderContainer}>
          {/* Enhanced Navigation Buttons */}
          {shouldEnableSlider && ads.length > 1 && (
            <>
              <button 
                className={styles.arrow}
                onClick={handlePrev}
                aria-label="Previous advertisement"
              >
                <span className={styles.arrowIcon}>‹</span>
              </button>
              <button 
                className={styles.arrow}
                onClick={handleNext}
                aria-label="Next advertisement"
              >
                <span className={styles.arrowIcon}>›</span>
              </button>
            </>
          )}

          {/* Enhanced Slider */}
          <div className={styles.sliderInner}>
            <div
              className={styles.slider}
              style={{
                transform: shouldEnableSlider
                  ? `translateX(-${currentIndex * 100}%)`
                  : "translateX(0)",
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
                      <div className={styles.adImageWrapper}>
                        <img
                          src={ad.above_category_1}
                          alt={`Advertisement ${index + 1}`}
                          className={styles.adImage}
                        />
                        <div className={styles.adOverlay}>
                          <span className={styles.viewAd}>View Offer →</span>
                        </div>
                      </div>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Dots Navigation */}
        {shouldEnableSlider && ads.length > 1 && (
          <div className={styles.dots}>
            {ads.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  index === currentIndex ? styles.activeDot : ""
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        )}

        {/* Slide Counter */}
        {shouldEnableSlider && ads.length > 1 && (
          <div className={styles.slideCounter}>
            <span>{currentIndex + 1}</span>
            <span className={styles.counterDivider}>/</span>
            <span>{ads.length}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Advertisements;
