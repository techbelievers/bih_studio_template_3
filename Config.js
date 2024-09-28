const BASE_URL = 'https://buyindiahomes.in/api';
// const WEBSITE_DOMAIN = "buyindiahomes.in";
const WEBSITE_DOMAIN = typeof window !== 'undefined' ? window.location.hostname : 'buyindiahomes.in';
console.log('Website Domain:', WEBSITE_DOMAIN);
// const getApiUrl = (endpoint) => `${BASE_URL}/${endpoint}?website=${WEBSITE_DOMAIN}`;
const getApiUrl = (endpoint) => {
  // Log the endpoint and the website domain
  console.log('API Endpoint:', endpoint);
  console.log('Website Domain:', WEBSITE_DOMAIN);
  console.log(`${BASE_URL}/${endpoint}?website=${WEBSITE_DOMAIN}`);
  return `${BASE_URL}/${endpoint}?website=${WEBSITE_DOMAIN}`;
};

console.log('Website Domain:', `${BASE_URL}/header?website=${WEBSITE_DOMAIN}`);

const API = {
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
  TESTIMONIALS: () => getApiUrl('testimonials'),
  CONTACT_US: () => getApiUrl('contact-us'),
  ADVERTISEMENT: () => getApiUrl('advertisement'),
  FOOTER: () => getApiUrl('footer'),
  TEMPLATE: () => getApiUrl('template'),
  postContactUs: `${BASE_URL}/contact?website=${WEBSITE_DOMAIN}`,
};

export  { API, WEBSITE_DOMAIN };
