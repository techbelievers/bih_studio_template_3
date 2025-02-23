import React, { useState, useEffect } from "react";
import { API } from "../../../../Config";
import styles from "../css/Blogs.module.css";
import Link from "next/link";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [visibleBlogs, setVisibleBlogs] = useState(6); // Show 6 blogs initially

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
    setVisibleBlogs((prev) => prev + 3); // Load 3 more blogs on click
  };

  return (
    <section id="blogs" className={styles.blogsSection}>
      <div className={styles.header}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subheading}>{subheading}</p>
      </div>

      <div className={styles.blogsGrid}>
        {blogs.slice(0, visibleBlogs).map((blog) => (
          <div key={blog.post_slug} className={styles.blogCard}>
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
          </div>
        ))}
      </div>

      {visibleBlogs < blogs.length && (
        <div className={styles.loadMoreContainer}>
          <button className={styles.loadMoreButton} onClick={loadMoreBlogs}>
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default Blogs;
