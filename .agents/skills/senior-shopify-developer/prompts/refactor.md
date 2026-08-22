# Refactor mode

Goal: improve structure/maintainability without changing behavior.

1. Load `../coding-standards.md` and `../frontend-architecture.md`.
2. Identify the concrete smell being fixed (duplication, mixed
   logic/presentation, oversized file, wrong module boundary) — name it
   before changing code.
3. Confirm the refactor is behavior-preserving: same rendered output, same
   Theme Editor settings/schema (unless the refactor's explicit goal is a
   schema change, in which case call that out separately).
4. Keep the diff scoped to the stated refactor — don't opportunistically
   rewrite unrelated code in the same pass.
5. Note any follow-up cleanup that's now possible but out of scope, rather
   than doing it unasked.
