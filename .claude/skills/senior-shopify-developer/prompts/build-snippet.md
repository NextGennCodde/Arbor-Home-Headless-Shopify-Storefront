# Build a new snippet

1. Load `../liquid.md` and `../coding-standards.md`.
2. Confirm this is genuinely reusable (used or clearly about to be used in
   2+ places) — a one-off doesn't need extraction into a snippet.
3. Define its parameter contract explicitly: list every param it expects,
   which are required vs. optional with sane `default:` fallbacks.
4. No implicit reliance on outer scope — everything the snippet needs comes
   in via `{% render 'name', param: value %}`, never `{% include %}`.
5. Guard against nil/missing params before using them in markup.
6. Keep it presentation-agnostic where possible so it composes into
   different sections without modification.
