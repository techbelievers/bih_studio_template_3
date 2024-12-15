import React from 'react';
import { API, DEFAULT_DOMAIN } from '../../Config'; // Adjust the path as needed
import styles from './BlogDetail.module.css'; // Ensure the path is correct
import Link from 'next/link';

const BlogDetail = ({ blog, error }) => {
  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.blogDetailContainer}>
      {/* Header Section */}
      <div className={styles.blogHeader}>
        <h1 className={styles.blogTitle}>{blog.post_title}</h1>
        <p className={styles.postDate}>
          Posted On: {new Date(blog.created_at).toISOString().split('T')[0]}
        </p>
      </div>

      {/* Featured Image Section */}
      <div className={styles.imageWrapper}>
        <img src={blog.post_photo} alt={blog.post_title} className={styles.blogImage} />
      </div>

      {/* Content Section */}
      <div className={styles.blogContent}>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: blog.post_content }}
        />
      </div>

      {/* Back Link */}
      <Link href="/" legacyBehavior>
        <a className={styles.backLink}>← Back to Blogs</a>
      </Link>
    </div>
  );
};

// This function runs on the server side
export async function getServerSideProps(context) {
  const { post_slug } = context.params;
  try {
    const { req } = context;
    const websiteDomain = req.headers['x-forwarded-host'] || DEFAULT_DOMAIN;

    const finalDomain = websiteDomain === 'localhost:3000' ? DEFAULT_DOMAIN : websiteDomain;
    console.log('BLOGS_DETAIL_domain : ', finalDomain);

    const response = await fetch(`${API.BLOGS_DETAIL(post_slug, finalDomain)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog details');
    }
    const data = await response.json();

    const blog = data.blogs.find((blog) => blog.post_slug === post_slug);

    if (!blog) {
      return {
        notFound: true,
      };
    }

    return {
      props: { blog },
    };
  } catch (error) {
    return {
      props: { error: error.message },
    };
  }
}

export default BlogDetail;
