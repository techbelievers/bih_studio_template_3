import React, { useState, useEffect, useRef } from "react";
import { API } from "../../../../Config"; // Adjust the path as needed
import styles from "../css/Blogs.module.css"; // Ensure the path is correct
import Link from "next/link";

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
        setHeading(data.blog_page?.name || "Blogs");
        setSubheading(data.blog_page?.detail || "");
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogsData();
  }, []);

  const truncateText = (text, limit = 100) => {
    if (text.length > limit) {
      return text.slice(0, limit) + "...";
    }
    return text;
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div id="blogs" className={styles.blogsContainer}>
      <div className={styles.blogsHeading}>
        <h2>{heading}</h2>
        <h3>{subheading}</h3>
      </div>
      <div className={styles.sliderControls}>
        <button className={styles.scrollButton} onClick={scrollLeft}>
          &#10094;
        </button>
        <div className={styles.blogsSlider} ref={sliderRef}>
          {blogs.map((blog) => (
            <div key={blog.post_slug} className={styles.blogCard}>
              <img
                src={blog.post_photo}
                alt={blog.post_title}
                className={styles.blogImage}
              />
              <div className={styles.blogContent}>
                <h3>{blog.post_title}</h3>
                <p>{truncateText(blog.post_content_short, 150)}</p>
                <Link href={`/blogs/${blog.post_slug}`} legacyBehavior>
  <a className={styles.readMore}>Read More</a>
</Link>
              </div>
            </div>
          ))}
        </div>
        <button className={styles.scrollButton} onClick={scrollRight}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Blogs;
