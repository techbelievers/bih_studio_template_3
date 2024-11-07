import React from 'react';
import { API, DEFAULT_DOMAIN } from '../../Config'; // Adjust the path as needed
import styles from './BlogDetail.module.css'; // Ensure the path is correct

const BlogDetail = ({ blog, error }) => {
  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
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

// This function runs on the server side
export async function getServerSideProps(context) {
  const { post_slug } = context.params;
  try {
    // console.log('BLOGS_DETAIL_domain : ', context);
    const { req } = context;
    const websiteDomain = req.headers['x-forwarded-host'] || DEFAULT_DOMAIN;
  
    // const finalDomain = '10.211.55.3';
    const finalDomain = websiteDomain === 'localhost:3000' ? DEFAULT_DOMAIN : websiteDomain;
    console.log('BLOGS_DETAIL_domain : ', finalDomain);
    const response = await fetch(`${API.BLOGS_DETAIL(post_slug,finalDomain)}`); // Adjust your API endpoint here
    if (!response.ok) {
      throw new Error('Failed to fetch blog details');
    }
    const data = await response.json();

    // Assuming the API returns a single blog post object
    const blog = data.blogs.find(blog => blog.post_slug === post_slug);

    if (!blog) {
      return {
        notFound: true, // If blog post not found, return a 404 page
      };
    }

    return {
      props: { blog }, // Pass the blog data as props
    };
  } catch (error) {
    return {
      props: { error: error.message }, // Pass error message if fetching fails
    };
  }
}

export default BlogDetail;
