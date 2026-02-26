import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../../config.js";
import styles from "../css/Blogs.module.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [shown, setShown] = useState(3);
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");

  useEffect(() => {
    fetch(API.BLOGS())
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs || []);
        setHeading(data.blog_page?.name || "Blogs");
        setSubheading(data.blog_page?.detail || "");
      })
      .catch(console.error);
  }, []);

  if (!blogs.length) return null;

  const list = blogs.slice(0, shown);
  const hasMore = shown < blogs.length;

  return (
    <section id="blogs" className={styles.section}>
      <h2 className={styles.title}>{heading}</h2>
      {subheading && <p className={styles.sub}>{subheading}</p>}
      <div className={styles.grid}>
        {list.map((blog) => (
          <article key={blog.post_slug} className={styles.card}>
            <Link to={`/blogs/${blog.post_slug}`} className={styles.link}>
              <div className={styles.imgWrap}>
                <img src={blog.post_photo} alt={blog.post_title} className={styles.img} />
              </div>
              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{blog.post_title}</h3>
                <p className={styles.excerpt}>
                  {(blog.post_content_short || "").slice(0, 100)}…
                </p>
                <span className={styles.more}>Read more →</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
      {hasMore && (
        <div className={styles.moreWrap}>
          <button type="button" className={styles.moreBtn} onClick={() => setShown((s) => s + 3)}>
            Load more
          </button>
        </div>
      )}
    </section>
  );
};

export default Blogs;
