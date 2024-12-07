import React, { useState, useEffect, useRef } from 'react';
import { API } from '../../../../Config'; // Ensure the path is correct
import styles from '../css/Video.module.css'; // CSS Module

const Video = () => {
  const [videoData, setVideoData] = useState([]);
  const [heading, setHeading] = useState('');
  const [subheading, setSubHeading] = useState('');
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(API.VIDEO());
        const data = await response.json();
        setVideoData(data.property_videos);
        setHeading(data.page?.heading || 'Video');
        setSubHeading(data.page?.subheading || '');
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideoData();
  }, []);

  // Intersection Observer to autoplay video when in view
  useEffect(() => {
    const refs = videoRefs.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoElement = entry.target.querySelector('iframe');
          if (entry.isIntersecting) {
            const src = videoElement.src;
            if (!src.includes('autoplay=1')) {
              videoElement.src = `${src}?autoplay=1&mute=1`;
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    refs.forEach((videoRef) => {
      if (videoRef) observer.observe(videoRef);
    });

    return () => {
      refs.forEach((videoRef) => {
        if (videoRef) observer.unobserve(videoRef);
      });
    };
  }, [videoData]);

  return (
    <div className={styles.videoContainer}>
      <h2 className={styles.luxuryHeading}>{heading}</h2>
      <h4 className={styles.subheading}>{subheading}</h4>
      <div className={styles.videoWrapper}>
        {videoData.length > 0 ? (
          videoData.map((video, index) => (
            <div
              key={video.id}
              className={styles.videoItem}
              ref={(el) => (videoRefs.current[index] = el)}
            >
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${video.youtube_video_id}`}
                title="Property Video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          ))
        ) : (
          <p className={styles.loadingText}>Loading videos...</p>
        )}
      </div>
    </div>
  );
};

export default Video;
