import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API } from "../../../../Config";
import styles from "../css/Advertisements.module.css";

const Advertisements = () => {
  const [ads, setAds] = useState([]);
  const [heading, setHeading] = useState("Featured Advertisements");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await fetch(API.STUDIO_ADVERTISEMENT());
        const data = await response.json();
        setAds(data.advertisements || []);
        if (data.page?.length) {
          setHeading(data.page[0]?.heading);
        }
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      }
    };

    fetchAdvertisements();

    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (ads.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + (isDesktop ? 2 : 1)) % ads.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [ads, isDesktop]);

  if (ads.length === 0) return null;

  const displayedAds = isDesktop
    ? [ads[currentIndex], ads[(currentIndex + 1) % ads.length]]
    : [ads[currentIndex]];

  return (
    <section className={styles.advertisementSection}>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.sliderContainer}>
        {ads.length > 1 && (
          <motion.button
            className={styles.arrow}
            onClick={() =>
              setCurrentIndex((prev) => (prev === 0 ? ads.length - 1 : prev - (isDesktop ? 2 : 1)))
            }
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            &#9664;
          </motion.button>
        )}

        <div className={styles.slider}>
          <AnimatePresence mode="wait">
            {displayedAds.map(
              (ad, index) =>
                ad && (
                  <motion.div
                    key={index}
                    className={styles.slide}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.6 }}
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
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>

        {ads.length > 1 && (
          <motion.button
            className={styles.arrow}
            onClick={() => setCurrentIndex((prev) => (prev + (isDesktop ? 2 : 1)) % ads.length)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            &#9654;
          </motion.button>
        )}
      </div>

      {ads.length > 1 && (
        <div className={styles.dots}>
          {Array.from({ length: Math.ceil(ads.length / (isDesktop ? 2 : 1)) }).map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${index === Math.floor(currentIndex / (isDesktop ? 2 : 1)) ? styles.activeDot : ""}`}
              onClick={() => setCurrentIndex(index * (isDesktop ? 2 : 1))}
            ></span>
          ))}
        </div>
      )}
    </section>
  );
};

export default Advertisements;
