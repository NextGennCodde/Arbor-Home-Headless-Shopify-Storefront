# Build a new section

1. Load `../liquid.md`, `../css.md`, `../javascript.md`,
   `../accessibility.md`, `../performance.md`.
2. Before coding: confirm no existing section already covers this need
   (grep `sections/`); if a close match exists, extend it with a block
   instead of creating a near-duplicate section.
3. Design the `{% schema %}` first: settings, blocks (if variant content is
   needed), sensible `presets` so merchants can add it from the customizer.
4. Build markup mobile-first, semantic HTML, with the section's interactive
   behavior (if any) wrapped in a custom element scoped to that section.
5. Style with scoped classes (BEM-ish, matching repo convention); no global
   selector leakage into other sections.
6. If the section needs JS, defer/module-load it and ensure it re-initializes
   correctly if the section is re-rendered via the Section Rendering API.
7. Verify: Theme Editor add/remove/reorder works, keyboard-only operation
   works, image(s) have proper `alt`/lazy-loading/sizing, no layout shift.
