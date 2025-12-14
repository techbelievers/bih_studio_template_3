# BIh Studios - React + Vite

This project has been converted from Next.js to a pure React application using Vite, with build-time prerendering for optimal SEO and performance.

## Features

- ✅ Pure React 18 with Vite
- ✅ Build-time prerendering for all routes
- ✅ SEO optimizations (meta tags, structured data)
- ✅ Performance optimizations (code splitting, deferred hydration)
- ✅ LCP optimizations (inline critical CSS, deferred React hydration)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update environment variables in `.env`:
```
VITE_SLUG_URL=studioapartmentsinpune.com
VITE_API_URL=https://www.buyindiahomes.in/api
```

## Development

Run the development server:
```bash
npm run dev
```

## Build

Build and prerender all routes:
```bash
npm run build
```

This will:
1. Fetch SEO data from API (prebuild)
2. Build the React app with Vite
3. Prerender all routes (studios, blogs, static pages)
4. Optimize CSS (make non-blocking)

## Project Structure

```
website/
├── src/
│   ├── pages/          # Page components
│   ├── components/     # Reusable components
│   ├── hooks/          # Custom hooks
│   ├── App.jsx         # Router setup
│   └── main.jsx        # Entry point
├── scripts/
│   ├── fetch-seo-data.js      # Fetch SEO data before build
│   ├── prerender.js            # Prerender all routes
│   └── make-css-non-blocking.js  # CSS optimization
├── config.js           # API configuration
├── vite.config.js      # Vite configuration
└── index.html          # HTML template
```

## Routes

- `/` - Homepage
- `/studios/:property_slug` - Studio property pages
- `/blogs/:post_slug` - Blog posts
- `/privacy-policy` - Privacy policy
- `/thank-you` - Thank you page

## Environment Variables

- `VITE_SLUG_URL` - Domain for API calls (e.g., studioapartmentsinpune.com)
- `VITE_API_URL` - API base URL (default: https://www.buyindiahomes.in/api)

## Notes

- All routes are prerendered at build time for better SEO
- React hydration is deferred for better LCP
- CSS is made non-blocking in post-build step
- Studio and blog routes are fetched from API during build
