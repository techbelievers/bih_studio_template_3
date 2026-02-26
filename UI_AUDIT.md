# Website_3 UI Audit & Improvement Scope

## Latest pass – component fixes (revisit)

- **Studio PropertyDetails** – Description/spec/info can be undefined: content now uses `(propertyDetails.property_description || '')` etc., and slice/expand logic uses a single safe string.
- **Know Your Returns** – `data.returns` may be undefined: use `(returns || []).filter(...)`; `page[0]` → `page?.[0]`.
- **EnquirePopup** – No longer mutates `formData`; submits `{ ...formData, note: slug ?? "" }`.
- **Studio HeroBanner** – Same as EnquirePopup: submit `{ ...formData, note: slug ?? "" }` instead of mutating.
- **Studio MasterPlan (plans)** – Guard empty sections: if `!sections.length` return null; use `currentSection?.data ?? []` so `sections[activeSection].data` never throws; default `master_layout` and `unit_layout` to `[]`.
- **Header** – Error display: use `error?.message ?? String(error)` so non-Error responses don’t break.
- **Home PropertyDetails** – Fallback for description: `propertyDetails.studio_description || propertyDetails.property_description || ""`.
- **Studio Gallery** – `setGalleryData(data.property_photos || [])`, `setVideoData(data.property_videos || [])`; use `data.page?.[0]` for heading/subheading.

## Completed in earlier pass

- **FloatingButtons** – Fixed props: now uses `({ slug: slugProp, websiteDomain })` and safe `slugValue` for WhatsApp message and form `note`; no mutation of form state.
- **PropertyPriceTable** – `useEffect` dependency fixed: `[slug]` so prices refetch when slug changes.
- **EnquirePopup** – CSS updated to use theme variables: `--color-primary`, `--color-bg-card`, `--color-bg-light`, `--color-text-light`; primary CTA and thank-you close button; focus and scrollbar use primary.
- **LocationHighlights** – Section background set to `var(--color-bg-light)` for consistency with other sections.

## Component status (theme / structure)

| Area | Component | Status |
|------|-----------|--------|
| **Global** | Header, Footer | Redesigned; theme vars |
| **Global** | FloatingButtons | Theme + popups styled; props fixed |
| **Global** | EnquirePopup | Theme vars applied |
| **Global** | Loader, ThankYou, PrivacyPolicy, BlogContent | Theme applied |
| **Home** | HeroBanner, Properties, Services, Advertisements, ContactUs, BankPartners | Redesigned |
| **Home** | PropertyDetails, FAQ, EMICalculator, Blogs, Gallery, LocationMap, LocationHighlights, Video | Redesigned / theme |
| **Home** | UnitLayout, FloorPlans, MasterPlan, Amenities, MahaReraInformation | Redesigned |
| **Studio** | HeroBanner, PropertyPriceTable, PropertyDetails, Returns | Theme; slug deps fixed where needed |
| **Studio** | MasterPlan, Advertise, Amenities, Gallery, LocationMap, Maharera | Theme; slug in useEffect deps |

## Optional future improvements

1. **Studio detail page** – Simplify visuals to match home (e.g. fewer gradients, same card/modal pattern) if you want one consistent “minimal” look.
2. **EnquirePopup** – Thank-you success icon still uses green `#28A745`; could switch to `var(--color-success)` if you add it to the theme.
3. **Properties (home)** – Card price badge uses `rgba(0,0,0,0.7)`; could use primary/accent for a stronger CTA.
4. **Accessibility** – Ensure all interactive cards have visible focus styles and that modals trap focus (EnquirePopup already uses portal).

## Design tokens (reference)

- Primary: `--color-primary` (#0F766E), `--color-primary-dark`, `--color-primary-light`
- Accent: `--color-accent` (#D97706), `--color-accent-dark`
- Text: `--color-text`, `--color-text-dark`, `--color-text-light`
- Background: `--color-bg`, `--color-bg-light`, `--color-bg-card`
- Fonts: `--font-heading` (Fraunces), `--font-body` (DM Sans)
- Radius: `--radius`, `--radius-lg`; Shadow: `--shadow`, `--shadow-lg`
