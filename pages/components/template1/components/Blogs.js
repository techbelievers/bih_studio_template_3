import React, { useState, useEffect, useRef } from 'react';
import { API } from '../../../../Config'; // Adjust the path as needed
import '../css/Blogs.module.css'; // Ensure the path is correct

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
        setHeading(data.blog_page?.name || 'Blogs');
        setSubheading(data.blog_page?.detail || '');
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogsData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({
          left: sliderRef.current.offsetWidth,
          behavior: 'smooth'
        });
      }
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="blogs-container">
      <div className="blogs-heading">
        <h2>{heading}</h2>
        <h4>{subheading}</h4>
      </div>
      <div className="blogs-slider" ref={sliderRef}>
        {blogs.map(blog => (
          <div key={blog.id} className="blog-card">
            <img src={blog.post_photo} alt={blog.post_title} className="blog-image" />
            <div className="blog-content">
              <h3>{blog.post_title}</h3>
              <p>{blog.post_content_short}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
