# Migration Notes - Next.js to React + Vite

## Completed Tasks

### Phase 1: Project Setup ✅
- ✅ Created `vite.config.js` with optimizations
- ✅ Created `config.js` using environment variables
- ✅ Created `index.html` with SEO meta tags template
- ✅ Updated `package.json` with Vite dependencies and scripts
- ✅ Created prerender scripts (`scripts/prerender.js`, `scripts/fetch-seo-data.js`, `scripts/make-css-non-blocking.js`)
- ✅ Updated `tailwind.config.js` for Vite

### Phase 2: Pages & Routing ✅
- ✅ Created `src/App.jsx` with React Router
- ✅ Created `src/main.jsx` with deferred hydration
- ✅ Converted `HomePage.jsx` (from AppTemplate.js)
- ✅ Converted `StudioPage.jsx` (from studios/[property_slug]/index.js)
- ✅ Converted `BlogContent.jsx` (from blogs/[post_slug].js)
- ✅ Converted `PrivacyPolicy.jsx`
- ✅ Converted `ThankYou.jsx`

### Phase 3: Component Migration ✅
- ✅ Created `StudioTemplate.jsx` (from Property.js)
- ✅ Updated `template6/App.jsx` for homepage
- ✅ Copied template6 components to `src/components/template6/`
- ✅ Updated Config imports (bulk replaced)
- ✅ Updated Next.js imports (Link, useRouter → react-router-dom)
- ✅ Updated Header component to use React Router

### Phase 4: Prerendering ✅
- ✅ Created `scripts/prerender.js` - fetches studio and blog routes, prerenders all
- ✅ Created `scripts/fetch-seo-data.js` - fetches SEO data before build
- ✅ Created `scripts/make-css-non-blocking.js` - optimizes CSS loading

### Phase 5: SEO & Performance ✅
- ✅ Implemented `react-helmet-async` in all pages
- ✅ Added deferred hydration in `main.jsx`
- ✅ Added deferred API calls in Header component
- ✅ Inline critical CSS in `index.html`
- ✅ Code splitting configured in `vite.config.js`
- ✅ Compression (gzip, brotli) configured

## Remaining Tasks / Manual Fixes Needed

### Component Updates
Some components may still need manual updates:

1. **Next.js specific code**: Some components may still have Next.js patterns
   - Check for `getInitialProps`, `getServerSideProps` (should be removed)
   - Check for `next/image` (replace with regular `<img>`)
   - Check for `next/link` (should be `react-router-dom` Link)

2. **Dynamic imports**: Some files may still use `next/dynamic`
   - Replace with `React.lazy()` and `Suspense`

3. **Router usage**: Components using `useRouter` from Next.js
   - Replace with `useLocation`, `useNavigate`, `useParams` from `react-router-dom`

### Files to Review
- All files in `src/components/template6/components/` - verify imports are correct
- All files in `src/components/template6/detail-components/` - verify imports are correct
- Check for any remaining `Config.js` imports (should be `config.js`)

### Testing Checklist
- [ ] Run `npm install` to install dependencies
- [ ] Create `.env` file with correct values
- [ ] Test `npm run dev` - development server
- [ ] Test `npm run build` - build and prerender
- [ ] Verify all routes prerender correctly
- [ ] Check SEO meta tags in prerendered HTML
- [ ] Test client-side navigation
- [ ] Verify API calls work correctly

## Environment Variables

Create `.env` file:
```
VITE_SLUG_URL=studioapartmentsinpune.com
VITE_API_URL=https://www.buyindiahomes.in/api
```

## Build Process

1. **Prebuild**: `scripts/fetch-seo-data.js` - Fetches SEO data, creates `seodata.json`
2. **Build**: `vite build` - Builds React app
3. **Postbuild**: 
   - `scripts/prerender.js` - Prerenders all routes
   - `scripts/make-css-non-blocking.js` - Optimizes CSS

## Key Changes

### Routing
- Next.js file-based routing → React Router with `<Routes>`
- `getInitialProps` → `useEffect` + state
- Server-side props → Client-side data fetching

### Imports
- `next/link` → `react-router-dom` Link
- `next/router` → `react-router-dom` hooks
- `next/dynamic` → `React.lazy()`
- `Config.js` → `config.js` (lowercase)

### Build
- Next.js build → Vite build
- Server-side rendering → Build-time prerendering
- `.next/` output → `dist/` output

## Notes

- All studio and blog routes are fetched from API during build
- Prerendered HTML files are saved in `dist/` directory
- React hydrates the prerendered HTML on client-side
- Hydration is deferred for better LCP performance

