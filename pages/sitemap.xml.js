// pages/sitemap.xml.js
import { API , DEFAULT_DOMAIN } from '../Config'; // Adjust the path as needed

const Sitemap = () => {
  return null; // This component doesn't render anything
};

export const getServerSideProps = async ({ req ,res }) => {
  // Fetch data for the sitemap
  

  const rawWebsiteDomain = req.headers['x-forwarded-host'] || (DEFAULT_DOMAIN);
  const websiteDomain = rawWebsiteDomain.startsWith('www.')
  ? rawWebsiteDomain.replace('www.', '')
  : rawWebsiteDomain;
  // const finalDomain = 'smp-amberwoodrahatani.com';
  const finalDomain = websiteDomain === 'localhost:3000' ? DEFAULT_DOMAIN : websiteDomain;

  const response = await fetch(API.GET_BLOG(finalDomain)); 
  const p_response = await fetch(API.GET_PROPERTIES_SITEMAP(finalDomain));


  // Check if response is successful
  if (!response.ok) {
    throw new Error('Failed to fetch blog data');
  }

  const data = await response.json();
  const p_data = await p_response.json();
  console.log('Response data:', data); // Log the response data

  // Ensure data has a 'blogs' array
  if (!data.blogs || !Array.isArray(data.blogs)) {
    throw new Error('Expected blogs data to be an array');
  }

  // Generate the sitemap XML
  const sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://${websiteDomain}/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${data.blogs
        .map((blog) => {
          // You can adjust this part based on the actual structure of the blog object
          if (!blog.post_slug) {
            console.error('Missing post_slug in blog:', blog);
            return ''; // Skip blogs without a post_slug
          }

          return `
            <url>
              <loc>https://${websiteDomain}/blogs/${blog.post_slug}</loc>
              <changefreq>weekly</changefreq>
              <priority>0.8</priority>
            </url>
          `;
        })
        .join('')}

      ${p_data.property_details
        .map((property_details) => {
          // You can adjust this part based on the actual structure of the blog object
          if (!property_details.property_slug || 
            property_details.property_slug.includes('.com')) {
            console.error('Missing post_slug in blog:', property_details);
            return ''; // Skip properties without a property-slug
          }

          return `
            <url>
              <loc>https://${websiteDomain}/properties/${property_details.property_slug}</loc>
              <changefreq>weekly</changefreq>
              <priority>0.8</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  // Set response headers and return the XML
  res.setHeader('Content-Type', 'application/xml');
  res.statusCode = 200; // Set HTTP status code
  res.write(sitemap);
  res.end();

  // Return empty props since the response is already sent
  return { props: {} };
};

export default Sitemap;
