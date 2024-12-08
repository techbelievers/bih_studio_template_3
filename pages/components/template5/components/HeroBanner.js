import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../css/HeroBanner.module.css";
import { API } from "../../../../Config";
import EnquirePopup from "./EnquirePopup";

const HeroBannerWithVideo = () => {
  const [videoData, setVideoData] = useState(null);
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(API.VIDEO());
        const data = await response.json();

        setVideoData(data.property_videos);
        setHeading(data.page?.heading || "Discover Luxury Living");
        setSubheading(data.page?.subheading || "Experience the elegance of modern homes.");
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchVideoData();
  }, []);

  if (!videoData) {
    return <div className={styles.heroBanner}>Loading...</div>;
  }

  return (
    <div className={styles.heroBanner}>
      {/* Video Background */}
      <div className={styles.videoWrapper}>
        <video
          className={styles.heroVideo}
          src="https://todthetowerofdreams.com/images/TOD.mp4"
          autoPlay
          muted
          loop
          playsInline
        ></video>
      </div>

      <div className={styles.overlay}></div>

      {/* Hero Content */}
      {/* <div className={styles.heroContent}>
        <motion.h1
          className={styles.heading}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {heading}
        </motion.h1>
        <motion.p
          className={styles.subheading}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {subheading}
        </motion.p>
        <motion.button
          className={styles.enquireButton}
          onClick={() => setIsPopupOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Enquire Now
        </motion.button>
      </div> */}

      {/* Enquire Popup */}
      {isPopupOpen && <EnquirePopup onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default HeroBannerWithVideo;
