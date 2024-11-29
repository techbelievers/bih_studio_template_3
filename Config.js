// const ENVIRONMENT = "LOCAL";
const ENVIRONMENT = "PRODUCTION";



let BASE_URL;
let DEFAULT_DOMAIN;

if (ENVIRONMENT === "PRODUCTION") {
  BASE_URL = 'https://www.buyindiahomes.in/api';  // Production URL
  DEFAULT_DOMAIN = "builderkonnect.com";  // Production domain
} else {
  BASE_URL = 'https://www.buyindiahomes.in/api';  // Local development URL (you can use localhost if required)
  DEFAULT_DOMAIN = "smp-amberwoodrahatani.com";  // Local domain (for consistency)
}



const getDomain = () => {
  // Check if window is available (i.e., client-side)

  if (ENVIRONMENT=="PRODUCTION"){
  if (typeof window !== 'undefined') {
    return window.location.hostname; // Get domain from client
  }
  // Default for server-side
  return DEFAULT_DOMAIN;
  }
  else{
    return DEFAULT_DOMAIN;
  }


};

const WEBSITE_DOMAIN = getDomain();


const getApiUrl = (endpoint) => {
  // const WEBSITE_DOMAIN = typeof window !== 'undefined' ? window.location.hostname : 'builderkonnect.com';
  // const WEBSITE_DOMAIN = "10.211.55.3";
  const WEBSITE_DOMAIN = getDomain();
  // Log the endpoint and the website domain
  console.log('API Endpoint:', endpoint);
  console.log('Website Domain:', WEBSITE_DOMAIN);
  console.log(`${BASE_URL}/${endpoint}?website=${WEBSITE_DOMAIN}`);
  return `${BASE_URL}/${endpoint}?website=${WEBSITE_DOMAIN}`;
};


const getSeoData = (endpoint , domain) => {
  console.log('SEODATA');
  console.log('API Endpoint:', endpoint);
  console.log('Website Domain:', domain);
  console.log(`${BASE_URL}/${endpoint}?website=${domain}`);
  return `${BASE_URL}/${endpoint}?website=${domain}`;
};

const getPropertyData = (endpoint , domain) => {
  console.log('PropertyData');
  console.log('API Endpoint:', endpoint);
  console.log('Website Domain:', domain);
  console.log(`${BASE_URL}/${endpoint}?website=${domain}`);
  return `${BASE_URL}/${endpoint}?website=${domain}`;
};

const getApiUrlmetadata = (endpoint,domain) => {
  // const WEBSITE_DOMAIN = typeof window !== 'undefined' ? window.location.hostname : 'builderkonnect.com';
  // const WEBSITE_DOMAIN = "10.211.55.3";
  const WEBSITE_DOMAIN = "smp-amberwoodrahatani.com";
  // Log the endpoint and the website domain
  console.log('API Endpoint:', endpoint);
  console.log('Website Domain:', WEBSITE_DOMAIN);
  console.log('Logs: - ',`${BASE_URL}/${endpoint}?website=${WEBSITE_DOMAIN}`);
  return `${BASE_URL}/${endpoint}?website=${domain}`;
};

const getblogspost = (endpoint,post_slug,domain) => {
  // const WEBSITE_DOMAIN = typeof window !== 'undefined' ? window.location.hostname : 'builderkonnect.com';
  // const WEBSITE_DOMAIN = "10.211.55.3";
  const WEBSITE_DOMAIN = domain;
  // Log the endpoint and the website domain
  console.log('API Endpoint:', endpoint);
  console.log('Website Domain:', domain);
  console.log('Logs: - ',`${BASE_URL}/${endpoint}/${post_slug}?website=${domain}`);
  return `${BASE_URL}/${endpoint}/${post_slug}?website=${domain}`;
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
  // PROPERTY_DETAILS: () => getApiUrl('propert-details'),
  PROPERTY_DETAILS: (domain) => getPropertyData('propert-details',domain),
  UNIT_LAYOUT: () => getApiUrl('unit-layout'),
  FLOOR_PLANS: () => getApiUrl('floor-layout'),
  MASTER_LAYOUT: () => getApiUrl('master-layout'),
  LOCATION_MAP: () => getApiUrl('location-map'),
  LOCATION_ADVANTAGES: () => getApiUrl('location-advantages'),
  FAQ: () => getApiUrl('faq'),
  BLOGS: () => getApiUrl('blogs'),
  BLOGS_DETAIL: (post_slug,domain) => getblogspost('blogs',post_slug,domain),
  TESTIMONIALS: () => getApiUrl('testimonials'),
  CONTACT_US: () => getApiUrl('contact-us'),
  ADVERTISEMENT: () => getApiUrl('advertisement'),
  FOOTER: () => getApiUrl('footer'),
  TEMPLATE: () => getApiUrl('template'),
  SEO_DETAIL: (domain) => getSeoData('seo-detail',domain),
  postContactUs: `${BASE_URL}/contact?website=${WEBSITE_DOMAIN}`,
};

export  { API, WEBSITE_DOMAIN , DEFAULT_DOMAIN};
