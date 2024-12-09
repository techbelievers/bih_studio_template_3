import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import styles from "../css/HeroBanner.module.css";
import { API } from "../../../../Config";
import EnquirePopup from "./EnquirePopup";

const HeroBannerWithIntegratedServices = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await axios.get(API.HEADER());
        const data = response.data;

        const isMobile = window.innerWidth < 768;
        const heroImages = data.hero_banner_img;
        const selectedMedia = isMobile
          ? heroImages.mobile[0]
          : heroImages.desktop[0];

        const isVideo = selectedMedia.endsWith(".mp4");

        setHeroData({
          isVideo,
          mediaUrl: selectedMedia,
          heading: data.property_name,
          description: data.hero_banner_subheading,
          location: data.location,
          sublocation: data.sublocation !== "Default Sublocation" ? data.sublocation : "",
          builderName: data.builder_name,
          builderLogo: data.logo,
          propertyType: data.property_type_price_range_text,
          propertyArea: data.property_area_min_max,
          lastUpdated: data.property_last_updated,
        });
      } catch (err) {
        setError("Failed to fetch header data");
      } finally {
        setLoading(false);
      }
    };

    fetchHeaderData();
  }, []);

  if (loading) {
    return <div className={styles.heroBanner}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={styles.heroBanner}>
        Error loading hero banner: {error}
      </div>
    );
  }

  return (
    <div
      className={styles.heroBanner}
      style={{
        backgroundImage: heroData.isVideo && isVideoLoading
          ? `url(${heroData.mediaUrl.replace(".mp4", ".jpg")})` // Fallback to an image during video loading
          : heroData.isVideo
          ? "none"
          : `url(${heroData.mediaUrl})`,
      }}
    >
      {/* Video or Image Background */}
      {heroData.isVideo && (
        <div className={styles.videoWrapper}>
          {isVideoLoading && (
            <div className={styles.videoLoader}>
              <p>Bringing Your Experience....</p>
            </div>
          )}
          <video
            className={styles.heroVideo}
            src={heroData.mediaUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => setIsVideoLoading(false)}
          ></video>
        </div>
      )}

      <div className={styles.overlay}></div>

      {/* Conditional Hero Content */}
      {!heroData.isVideo && (
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className={styles.heading}>{heroData.heading}</h1>
            <p className={styles.location}>
              {heroData.sublocation}, {heroData.location}
            </p>
            <button
              onClick={() => setIsPopupOpen(true)}
              className={styles.enquireButton}
            >
              Enquire Now
            </button>
          </motion.div>
        </div>
      )}

      {isPopupOpen && <EnquirePopup onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default HeroBannerWithIntegratedServices;
