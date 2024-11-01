import React, { useState, useEffect, useRef } from 'react';
import { API } from '../../../../Config'; // Adjust the path as needed
import styles from '../css/Blogs.module.css'; // Ensure the path is correct

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchBlogsData = async () => {
      try {
        const response = await fetch(API.BLOGS());
        const data = await response.json();
        setBlogs(data.blogs);
        setHeading(data.blog_page?.name || 'Blogs');
        setSubheading(data.blog_page?.detail || '');
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogsData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({
          left: sliderRef.current.offsetWidth,
          behavior: 'smooth'
        });
      }
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.blogsContainer}>
      <div className={styles.blogsHeading}>
        <h2>{heading}</h2>
        <h3>{subheading}</h3>
      </div>
      <div className={styles.blogsSlider} ref={sliderRef}>
        {blogs.map(blog => (
          <div key={blog.post_slug} className={styles.blogCard}>
            <img src={blog.post_photo} alt={blog.post_title} className={styles.blogImage} />
            <div className={styles.blogContent}>
              <h3>{blog.post_title}</h3>
              <p>{blog.post_content_short}</p>
              <a href={`/blogs/${blog.post_slug}`} className={styles.readMore}>Read More</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
