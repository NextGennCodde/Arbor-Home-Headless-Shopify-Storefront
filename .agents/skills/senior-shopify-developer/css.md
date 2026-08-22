# CSS rules

- Mobile-first: write the base rule for small screens, add `min-width` media
  queries (or container queries) to scale up — never the reverse.
- Use CSS custom properties for anything themeable (colors, spacing scale,
  radii) so theme settings can drive them via inline `style` on a wrapper
  instead of generating whole stylesheets per setting.
- BEM-ish naming where it matches the existing repo convention
  (`card`, `card__media`, `card--featured`); don't introduce a second
  convention (e.g. utility classes) into a codebase that's already BEM, and
  vice versa.
- Avoid specificity wars: no ID selectors for styling, no deep descendant
  chains (`.a .b .c .d`) — one class per targeted element is enough.
- Never use `!important` to patch a specificity problem; fix the selector.
- Prefer modern layout: `grid`/`flexbox` over floats or absolute positioning
  for layout; `gap` instead of margin hacks between flex/grid children.
- Use `clamp()` for fluid type/spacing instead of a pile of breakpoint
  overrides for font-size.
- Use logical properties (`margin-inline`, `padding-block`, `inset`) instead
  of physical ones (`margin-left`, `top`) so the theme doesn't silently break
  under RTL markets.
- Use `Container Queries` for components that need to respond to their
  container's size rather than the viewport (cards in a variable-width grid).
- Consider the `View Transitions API` for section/page transitions where it
  meaningfully improves perceived quality, but always ship a
  `prefers-reduced-motion` fallback with no transition.
