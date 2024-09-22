

// src/config.js
// const BASE_URL = 'http://10.211.55.3/buyindiahomes_property/public/api';
const BASE_URL = 'http://buyindiahomes.in/api';

// Get the domain once and use it across the app
// const WEBSITE_DOMAIN = window.location.hostname;
// const WEBSITE_DOMAIN = "10.211.55.3";
const WEBSITE_DOMAIN = "buyindiahomes.in";

const getApiUrl = (endpoint) => `${BASE_URL}/${endpoint}?website=${WEBSITE_DOMAIN}`;

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



export { API, WEBSITE_DOMAIN };
