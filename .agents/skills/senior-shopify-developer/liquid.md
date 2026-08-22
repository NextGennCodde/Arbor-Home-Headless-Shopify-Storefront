# Liquid & Dawn theme architecture

## Structure (Online Store 2.0 / Dawn conventions)

- `sections/` — top-level, schema-driven, one per page region. Every section
  that should be addable in the customizer needs a `{% schema %}` with
  `presets` (unless it's a static section like `header`/`footer`).
- `blocks/` — reusable pieces within a section (OS 2.0 blocks), each with its
  own settings; prefer blocks over duplicating a section for minor variants.
- `snippets/` — `{% render %}`-only partials, no schema. Always pass params
  explicitly (`{% render 'card', product: product, show_vendor: true %}`);
  never rely on implicit variable scope leaking in — `render` is scoped,
  `include` is deprecated and should not be used in new code.
- `templates/*.json` — JSON templates reference sections by id; don't hardcode
  markup here.
- `assets/` — compiled/plain CSS and JS, referenced via `asset_url`.
- `config/settings_schema.json` / `settings_data.json` — theme-wide settings.
- `locales/*.json` — all user-facing strings go through `{{ 'key' | t }}`,
  never hardcoded English in markup.

## Rules

- Never break the Theme Editor: `{% schema %}` must be valid JSON, every
  setting `id` referenced in markup must exist in the schema, and removing a
  setting that's still referenced will silently no-op rather than error —
  check for stale references before deleting a setting.
- Avoid N+1-style Liquid: don't call `all_products['handle']` or hit
  `collections` repeatedly inside a loop; hoist lookups above the loop.
- Guard every object access that can be nil: `{% if product.featured_image %}`
  before using it, `| default:` for settings that may be unset.
- Escape user-influenced output: `| escape` on anything from a metafield,
  customer input, or search query before rendering as HTML.
- Use `{% liquid %}` blocks for multi-line logic instead of a wall of
  `{%- ... -%}` tags — it's what Dawn does and it's far more readable.
- Prefer `{% render %}` blocks with explicit `for` loops
  (`{% render 'card' for products as product %}`) over building option
  arrays manually when iterating.
- Metafields/metaobjects: read via `product.metafields.namespace.key.value`,
  and always check existence before use — metaobject references can be null
  even when the field is "required" in the definition.
- Don't fight the Section Rendering API: if a section needs to update without
  a full page reload (e.g. cart drawer, filters), fetch
  `?section_id=` / `sections=` and swap the returned HTML rather than
  re-implementing the section's markup in JS.
