const config = {
  SLUG_URL: import.meta.env.VITE_SLUG_URL || "studioapartmentsinpune.com",
  API_URL: import.meta.env.VITE_API_URL || "https://www.buyindiahomes.in/api",
};

const BASE_URL = config.API_URL;
const DEFAULT_DOMAIN = config.SLUG_URL;

const getDomain = () => {
  if (typeof window !== 'undefined') {
    return DEFAULT_DOMAIN;
  }
  return DEFAULT_DOMAIN;
};

const WEBSITE_DOMAIN = getDomain();

const getApiUrl = (endpoint) => {
  const domain = getDomain();
  return `${BASE_URL}/${endpoint}?website=${domain}`;
};

const getDataProject = (endpoint, domain, slug) => {
  return `${BASE_URL}/${endpoint}?website=${domain}&project=${slug}`;
};

const getDataSlug = (endpoint, slug) => {
  const domain = getDomain();
  return `${BASE_URL}/${endpoint}?website=${domain}&project=${slug}`;
};

const getDomainDataSlug = (endpoint, domain, slug) => {
  return `${BASE_URL}/${endpoint}?website=${domain}&project=${slug}`;
};

const getBlogData = (endpoint, domain) => {
  return `${BASE_URL}/${endpoint}?website=${domain}`;
};

const getSeoData = (endpoint, domain) => {
  return `${BASE_URL}/${endpoint}?website=${domain}`;
};

const getStudiotemplate = (endpoint, domain) => {
  return `${BASE_URL}/${endpoint}?website=${domain}`;
};

const getPropertyData = (endpoint, domain) => {
  return `${BASE_URL}/${endpoint}?website=${domain}`;
};

const getblogspost = (endpoint, post_slug, domain) => {
  return `${BASE_URL}/${endpoint}/${post_slug}?website=${domain}`;
};

const API = {
  METAHEADER: (domain) => getSeoData('header', domain),
  HEADER: () => getApiUrl('header'),
  MAHARERA: () => getApiUrl('rera'),
  PROPERTY_PRICES: () => getApiUrl('property-prices'),
  GALLERY: () => getApiUrl('gallary'),
  VIDEO: () => getApiUrl('video'),
  AMENITIES: () => getApiUrl('amenities'),
  BANKS: () => getApiUrl('banks'),
  PROPERTY_DETAILS: (domain) => getPropertyData('propert-details', domain),
  UNIT_LAYOUT: () => getApiUrl('unit-layout'),
  FLOOR_PLANS: () => getApiUrl('floor-layout'),
  MASTER_LAYOUT: () => getApiUrl('master-layout'),
  LOCATION_MAP: () => getApiUrl('location-map'),
  LOCATION_ADVANTAGES: () => getApiUrl('location-advantages'),
  FAQ: () => getApiUrl('faq'),
  BLOGS: () => getApiUrl('blogs'),
  GET_BLOG: (domain) => getBlogData('blogs', domain),
  BLOGS_DETAIL: (post_slug, domain) => getblogspost('blogs', post_slug, domain),
  TESTIMONIALS: () => getApiUrl('testimonials'),
  CONTACT_US: () => getApiUrl('contact-us'),
  ADVERTISEMENT: () => getApiUrl('advertisement'),
  FOOTER: () => getApiUrl('footer'),
  TEMPLATE: () => getApiUrl('template'),
  GET_PROPERTIES: () => getApiUrl('get-properties'),
  GET_PROPERTIES_SITEMAP: (domain) => getBlogData('get-properties', domain),
  SEO_DETAIL: (domain) => getSeoData('seo-detail', domain),

  // Studio APIS
  PROPERTY_DETAILS_STUDIO: (domain, slug) => getDataProject('propert-details', domain, slug),
  GALLERY_STUDIO: (slug) => getDataSlug('gallary', slug),
  MAHARERA_STUDIO: (slug) => getDataSlug('rera', slug),
  VIDEO_STUDIO: (slug) => getDataSlug('video', slug),
  AMENITIES_STUDIO: (slug) => getDataSlug('amenities', slug),
  PROPERTY_PRICES_STUDIO: (slug) => getDataSlug('property-prices', slug),
  UNIT_LAYOUT_STUDIO: (slug) => getDataSlug('unit-layout', slug),
  FLOOR_PLANS_STUDIO: (slug) => getDataSlug('floor-layout', slug),
  MASTER_LAYOUT_STUDIO: (slug) => getDataSlug('master-layout', slug),
  LOCATION_MAP_STUDIO: (slug) => getDataSlug('location-map', slug),
  LOCATION_ADVANTAGES_STUDIO: (slug) => getDataSlug('location-advantages', slug),
  HEADER_STUDIO: (domain, slug) => getDomainDataSlug('header', domain, slug),
  SEO_DETAIL_STUDIO: (domain, slug) => getDomainDataSlug('seo-detail', domain, slug),
  TEMPLATE_STUDIO: (domain) => getStudiotemplate('template', domain),
  KNOW_YOUR_RETURNS_STUDIO: (slug) => getDataSlug('returns', slug),
  STUDIO_ADVERTISEMENT: () => getApiUrl('studio_advertisement'),
  STUDIO_ADVERTISEMENT_SLUG: (slug) => getDataSlug('studio_advertisement', slug),

  // POST APIS
  postContactUs: `${BASE_URL}/contact?website=${WEBSITE_DOMAIN}`,
};

export { API, WEBSITE_DOMAIN, DEFAULT_DOMAIN };
export default config;

