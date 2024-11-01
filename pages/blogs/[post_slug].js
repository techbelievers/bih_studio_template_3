import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Use Next.js router
import { API } from '../../Config'; // Adjust the path as needed
import styles from './BlogDetail.module.css'; // Ensure the path is correct

const BlogDetail = () => {
  const router = useRouter(); // Use Next.js router
  const { post_slug } = router.query; // Get the post_slug from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!post_slug) return; // Wait for post_slug to be available

    const fetchBlogDetail = async () => {
      try {
        const response = await fetch(`${API.BLOGS_DETAIL(post_slug)}`); // Adjust your API call
        if (!response.ok) {
          throw new Error('Failed to fetch blog details');
        }
        const data = await response.json();
        // Assuming the blog data is in data.blogs and you need to find the specific blog by slug
        const foundBlog = data.blogs.find(blog => blog.post_slug === post_slug);
        if (!foundBlog) {
          throw new Error('Blog not found');
        }
        setBlog(foundBlog);
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

  return (
    <div className={styles.blogDetailContainer}>
      <h1 className={styles.blogTitle}>{blog.post_title}</h1>
      <img src={blog.post_photo} alt={blog.post_title} className={styles.blogImage} />
      <div className={styles.blogContent}>
        <div dangerouslySetInnerHTML={{ __html: blog.post_content }} />
      </div>
      <a href="/AppTemplate/" className={styles.backLink}>Back to Blogs</a>
    </div>
  );
};

export default BlogDetail;
