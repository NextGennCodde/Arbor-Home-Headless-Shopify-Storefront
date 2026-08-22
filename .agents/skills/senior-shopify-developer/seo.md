# SEO

Apply by default on storefront-facing changes:

- **Structured data / JSON-LD**: `Product`, `BreadcrumbList`, `Organization`,
  `WebSite` (with `SearchAction`) where applicable — validate against
  Google's Rich Results test mentally (correct required fields, no
  placeholder values shipped to production).
- **Metadata**: unique, descriptive `<title>` and meta description per page
  template, driven by page/product/collection data — never a single hardcoded
  value across all pages of a type.
- **Canonical URLs**: `<link rel="canonical">` set correctly, especially on
  paginated collections and filtered views, to avoid duplicate-content
  indexing of every filter combination.
- **Heading hierarchy**: one `h1` per page (usually product/collection/page
  title), logical nesting below it — don't use headings for visual sizing.
- **Image alt text**: descriptive alt text for content images (product,
  editorial); empty for decorative. Never keyword-stuff alt text.
- **Internal linking**: breadcrumbs, related products, and collection links
  use real `<a href>` elements (crawlable), not JS-only navigation.
- **Performance SEO**: Core Web Vitals feed into ranking — see
  `performance.md`; a fast, stable page is itself an SEO requirement, not a
  separate concern.
- Don't block crawlable content behind client-side-only rendering when it can
  be server-rendered by Liquid instead.
