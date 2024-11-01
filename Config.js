// const BASE_URL = 'http://127.0.0.1:8000/api';
const BASE_URL = 'https://www.buyindiahomes.in/api';
// const WEBSITE_DOMAIN = "10.211.55.3";
const WEBSITE_DOMAIN = typeof window !== 'undefined' ? window.location.hostname : 'builderkonnect.com';
// console.log('Website Domain:', WEBSITE_DOMAIN);
// const getApiUrl = (endpoint) => `${BASE_URL}/${endpoint}?website=${WEBSITE_DOMAIN}`;
const getApiUrl = (endpoint) => {
  const WEBSITE_DOMAIN = typeof window !== 'undefined' ? window.location.hostname : 'builderkonnect.com';
  // const WEBSITE_DOMAIN = "10.211.55.3";
  // Log the endpoint and the website domain
  console.log('API Endpoint:', endpoint);
  console.log('Website Domain:', WEBSITE_DOMAIN);
  console.log(`${BASE_URL}/${endpoint}?website=${WEBSITE_DOMAIN}`);
  return `${BASE_URL}/${endpoint}?website=${WEBSITE_DOMAIN}`;
};

const getApiUrlmetadata = (endpoint,domain) => {
  const WEBSITE_DOMAIN = typeof window !== 'undefined' ? window.location.hostname : 'builderkonnect.com';
  // const WEBSITE_DOMAIN = "10.211.55.3";
  // Log the endpoint and the website domain
  console.log('API Endpoint:', endpoint);
  console.log('Website Domain:', WEBSITE_DOMAIN);
  console.log('Logs: - ',`${BASE_URL}/${endpoint}?website=${WEBSITE_DOMAIN}`);
  return `${BASE_URL}/${endpoint}?website=${domain}`;
};

const getblogspost = (endpoint,post_slug) => {
  const WEBSITE_DOMAIN = typeof window !== 'undefined' ? window.location.hostname : 'builderkonnect.com';
  // const WEBSITE_DOMAIN = "10.211.55.3";
  // Log the endpoint and the website domain
  console.log('API Endpoint:', endpoint);
  console.log('Website Domain:', WEBSITE_DOMAIN);
  console.log('Logs: - ',`${BASE_URL}/${endpoint}/${post_slug}?website=${WEBSITE_DOMAIN}`);
  return `${BASE_URL}/${endpoint}/${post_slug}?website=${WEBSITE_DOMAIN}`;
};

// console.log('Website Domain:', `${BASE_URL}/header?website=${WEBSITE_DOMAIN}`);

const API = {
  METAHEADER: (domain) => getApiUrlmetadata('header',domain),
  HEADER: () => getApiUrl('header'),
  MAHARERA: () => getApiUrl('rera'),
  PROPERTY_PRICES: () => getApiUrl('property-prices'),
  GALLERY: () => getApiUrl('gallary'),
  VIDEO: () => getApiUrl('video'),
  AMENITIES: () => getApiUrl('amenities'),
  BANKS: () => getApiUrl('banks'),
  PROPERTY_DETAILS: () => getApiUrl('propert-details'),
  UNIT_LAYOUT: () => getApiUrl('unit-layout'),
  FLOOR_PLANS: () => getApiUrl('floor-layout'),
  MASTER_LAYOUT: () => getApiUrl('master-layout'),
  LOCATION_MAP: () => getApiUrl('location-map'),
  LOCATION_ADVANTAGES: () => getApiUrl('location-advantages'),
  FAQ: () => getApiUrl('faq'),
  BLOGS: () => getApiUrl('blogs'),
  BLOGS_DETAIL: (post_slug) => getblogspost('blogs',post_slug),
  

  TESTIMONIALS: () => getApiUrl('testimonials'),
  CONTACT_US: () => getApiUrl('contact-us'),
  ADVERTISEMENT: () => getApiUrl('advertisement'),
  FOOTER: () => getApiUrl('footer'),
  TEMPLATE: () => getApiUrl('template'),
  SEO_DETAIL: () => getApiUrl('seo-detail'),
  postContactUs: `${BASE_URL}/contact?website=${WEBSITE_DOMAIN}`,
};

export  { API, WEBSITE_DOMAIN };
