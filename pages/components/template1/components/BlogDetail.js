import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Adjust this import based on your routing solution
import { API } from '../../../../Config'; // Adjust the path as needed
import styles from '../css/BlogDetail.module.css'; // Ensure the path is correct

const BlogDetail = () => {
  const { post_slug } = useParams(); // Get the post_slug from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await fetch(`${API.BLOGS_DETAIL(post_slug)}`); // Adjust your API call
        if (!response.ok) {
          throw new Error('Failed to fetch blog details');
        }
        const data = await response.json();
        setBlog(data.blog);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [post_slug]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!blog) {
    return <div className={styles.error}>Blog not found</div>;
  }

  return (
    <div className={styles.blogDetailContainer}>
      <h1 className={styles.blogTitle}>{blog.post_title}</h1>
      <img src={blog.post_photo} alt={blog.post_title} className={styles.blogImage} />
      <div className={styles.blogContent}>
        <p>{blog.post_content}</p>
      </div>
      <a href="/blogs" className={styles.backLink}>Back to Blogs</a>
    </div>
  );
};

export default BlogDetail;
