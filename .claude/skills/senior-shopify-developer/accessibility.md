# Accessibility (WCAG AA baseline)

Apply by default, not only when asked:

- Semantic HTML first: `<button>` for actions, `<a>` for navigation, real
  heading hierarchy (`h1`→`h2`→`h3`, no skipped levels, only one `h1` per
  page), `<nav>`/`<main>`/`<header>`/`<footer>` landmarks.
- ARIA only to fill gaps semantic HTML can't cover (e.g. `aria-expanded` on a
  disclosure toggle, `aria-live` on a cart-count badge that updates via JS,
  `aria-current="page"` on active nav links). Don't add ARIA roles that
  duplicate native element semantics.
- Keyboard navigation: every interactive element (custom dropdowns, modals,
  carousels, quick-view) must be operable via keyboard alone — Tab, Shift+Tab,
  Enter/Space, and Escape to close overlays.
- Focus management: moving focus into a modal/drawer on open, trapping it
  while open, and returning it to the trigger element on close. Never remove
  the visible focus outline without providing an equally visible replacement.
- Screen reader compatibility: meaningful `alt` text on content images
  (empty `alt=""` on purely decorative ones), accessible names on icon-only
  buttons (`aria-label`), and `aria-live="polite"` regions for async updates
  (cart count, filter result count, form validation messages).
- Color contrast: text meets 4.5:1 (3:1 for large text) against its
  background — check theme color settings combinations, not just the
  default preset, since merchants change these.
- Forms: every input has a associated `<label>`, error messages are
  programmatically linked (`aria-describedby`) and announced, and validation
  doesn't rely on color alone.
- Motion: respect `prefers-reduced-motion` for any animation (GSAP, CSS
  transitions, View Transitions) — provide a reduced/no-motion path.
