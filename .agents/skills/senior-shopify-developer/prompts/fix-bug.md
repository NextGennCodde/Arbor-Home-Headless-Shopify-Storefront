# Fix a bug

1. Load `../debugging.md`.
2. Reproduce and isolate the layer (Liquid data / CSS / JS) before writing
   any fix — state the root cause in one or two sentences.
3. Check the common-gotcha lists in `debugging.md` first; most theme bugs
   are one of: nil object, render-scope leak, stale event listener after a
   Section-Rendering-API swap, or a schema/setting id mismatch.
4. Fix the root cause, not the symptom — no `!important`/`setTimeout`
   band-aids without first ruling out the real timing/specificity issue.
5. Confirm the fix doesn't regress Theme Editor behavior, keyboard operation,
   or other sections that might share the touched snippet/asset.
