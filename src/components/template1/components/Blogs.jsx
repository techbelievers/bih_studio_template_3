import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { API } from "../../../../config.js";
import styles from "../css/Blogs.module.css";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchBlogsData = async () => {
      try {
        const response = await fetch(API.BLOGS());
        const data = await response.json();
        setBlogs(data.blogs);
        setHeading(data.blog_page?.name || "Blogs - Studio Trends and Tips");
        setSubheading(data.blog_page?.detail || "");
        
        // Show the first 3 blogs initially
        setDisplayedBlogs(data.blogs.slice(0, 3));
        setHasMore(data.blogs.length > 3);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogsData();
  }, []);

  const loadMoreBlogs = () => {
    const nextBlogs = blogs.slice(displayedBlogs.length, displayedBlogs.length + 2);
    setDisplayedBlogs((prev) => [...prev, ...nextBlogs]);

    if (displayedBlogs.length + 2 >= blogs.length) {
      setHasMore(false);
    }
  };

  const truncateText = (text, limit = 100) => {
    if (text.length > limit) {
      return text.slice(0, limit) + "...";
    }
    return text;
  };

  return (
    <section id="blogs" className={styles.blogsContainer}>
      {/* Enhanced Header */}
      <div className={styles.blogsHeader}>
        <div className={styles.headerBadge}>
          <span className={styles.badgeIcon}>📰</span>
          <span>Latest Insights</span>
        </div>
        <h2 className={styles.blogsHeading}>
          <span className={styles.headingMain}>{heading}</span>
        </h2>
        {subheading && (
          <p className={styles.blogsSubheading}>{subheading}</p>
        )}
        <div className={styles.headerDivider}></div>
      </div>

      {/* Enhanced Blog Grid with Hover Effects */}
      <div className={styles.blogsGrid}>
        {displayedBlogs.map((blog, index) => (
          <article 
            key={blog.post_slug} 
            className={styles.blogCard}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Link to={`/blogs/${blog.post_slug}`} className={styles.blogLink}>
              <div className={styles.imageWrapper}>
                <img
                  src={blog.post_photo}
                  alt={blog.post_title}
                  className={styles.blogImage}
                />
                <div className={styles.imageOverlay}>
                  <div className={styles.readMoreBadge}>
                    <span>Read Article</span>
                    <span className={styles.arrowIcon}>→</span>
                  </div>
                </div>
                <div className={styles.dateBadge}>
                  {/* <span className={styles.dateIcon}>📅</span> */}
                  <span>{new Date(blog.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.blogTitle}>{blog.post_title}</h3>
                <p className={styles.blogDescription}>
                  {truncateText(blog.post_content_short, 120)}
                </p>
                <div className={styles.blogFooter}>
                  <div className={styles.blogMeta}>
                    <span className={styles.metaIcon}>⏱️</span>
                    <span className={styles.readTime}>5 min read</span>
                  </div>
                  <div className={styles.readMoreLink}>
                    <span>Read More</span>
                    <span className={styles.linkArrow}>→</span>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Enhanced Load More Button */}
      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <button
            className={styles.loadMoreButton}
            onClick={loadMoreBlogs}
          >
            <span>Load More Articles</span>
            <span className={styles.loadMoreIcon}>↓</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default Blogs;
