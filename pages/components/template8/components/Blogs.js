import React, { useState, useEffect } from "react";
import { API } from "../../../../Config";
import styles from "../css/Blogs.module.css";
import Link from "next/link";
import { motion } from "framer-motion";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [heading, setHeading] = useState("Latest Insights");
  const [subheading, setSubheading] = useState("Stay updated with our latest blog posts.");
  const [visibleBlogs, setVisibleBlogs] = useState(6);

  useEffect(() => {
    const fetchBlogsData = async () => {
      try {
        const response = await fetch(API.BLOGS());
        const data = await response.json();
        setBlogs(data.blogs || []);
        setHeading(data.blog_page?.name || "Latest Insights");
        setSubheading(data.blog_page?.detail || "Stay updated with our latest blog posts.");
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogsData();
  }, []);

  const truncateText = (text, limit = 120) => {
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  const loadMoreBlogs = () => {
    setVisibleBlogs((prev) => prev + 3);
  };

  return (
    <section id="blogs" className={styles.blogsSection}>
      {/* Real Estate Clip-Path Background */}
      <div className={styles.clipPathBackground}></div>

      <div className={styles.header}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subheading}>{subheading}</p>
      </div>

      <div className={styles.blogsGrid}>
        {blogs.slice(0, visibleBlogs).map((blog) => (
          <motion.div 
            key={blog.post_slug} 
            className={styles.blogCard}
            whileHover={{ scale: 1.02 }}
          >
            <div className={styles.imageWrapper}>
              <img src={blog.post_photo || "/placeholder.jpg"} alt={blog.post_title} className={styles.blogImage} />
            </div>
            <div className={styles.blogContent}>
              <h3 className={styles.blogTitle}>{blog.post_title}</h3>
              <p className={styles.blogDescription}>{truncateText(blog.post_content_short, 100)}</p>
              <p className={styles.postDate}>
                <span>{new Date(blog.created_at).toISOString().split("T")[0]}</span>
              </p>
              <Link href={`/blogs/${blog.post_slug}`} legacyBehavior>
                <a className={styles.readMore}>Read More →</a>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {visibleBlogs < blogs.length && (
        <div className={styles.loadMoreContainer}>
          <motion.button 
            className={styles.loadMoreButton} 
            onClick={loadMoreBlogs}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More
          </motion.button>
        </div>
      )}
    </section>
  );
};

export default Blogs;
