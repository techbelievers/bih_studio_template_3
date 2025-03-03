import React, { useState, useEffect } from "react";
import { API } from "../../../../Config"; // Adjust the path as needed
import styles from "../css/Blogs.module.css"; // Ensure the path is correct
import Link from "next/link";

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
      <div className={styles.blogsHeader}>
        <h2 className={styles.blogsHeading}>{heading}</h2>
        <p className={styles.blogsSubheading}>{subheading}</p>
      </div>

      <div className={styles.blogsGrid}>
        {displayedBlogs.map((blog) => (
          <div key={blog.post_slug} className={styles.blogCard}>
            <div className={styles.cardContent}>
              <div className={styles.imageWrapper}>
                <img
                  src={blog.post_photo}
                  alt={blog.post_title}
                  className={styles.blogImage}
                />
              </div>
              <div className={styles.textOverlay}>
                <h3 className={styles.blogTitle}>{blog.post_title}</h3>
                <p className={styles.blogDescription}>
                  {truncateText(blog.post_content_short, 100)}
                </p>
                <p className={styles.postDate}>
                  Posted On:{" "}
                  <span>{new Date(blog.created_at).toISOString().split("T")[0]}</span>
                </p>
                <Link href={`/blogs/${blog.post_slug}`} legacyBehavior>
                  <a className={styles.readMore}>Read More</a>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <button
            className={styles.loadMoreButton}
            onClick={loadMoreBlogs}
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default Blogs;
