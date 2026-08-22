# GSAP with React / Next.js

```bash
npm install gsap @gsap/react
```

## Prefer useGSAP()

Use `useGSAP()` from `@gsap/react` instead of `useEffect` — it auto-reverts all animations and ScrollTriggers on unmount and gives you a scope + `contextSafe`.

```javascript
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP); // register once, before use

const containerRef = useRef(null);
useGSAP(() => {
  gsap.to(".box", { x: 100 });
  gsap.from(".item", { opacity: 0, stagger: 0.1 });
}, { scope: containerRef });
```

- Pass a **`scope`** (ref/element) so selectors like `.box` only match inside the component.
- Cleanup runs automatically on unmount.

## Second argument: deps / config

Default deps are `[]` (runs once). Pass a config for more control:

```javascript
useGSAP(() => { /* ... */ }, {
  dependencies: [endX],
  scope: container,
  revertOnUpdate: true // revert + re-run cleanup each time a dependency changes
});
```

## Refs for targets

Use refs so GSAP targets real DOM nodes; don't rely on unscoped selector strings across re-renders. With `useGSAP` pass the ref as `scope`; with `useEffect` pass it to `gsap.context()`.

## contextSafe for late-created animations

Animations created in handlers that run **after** `useGSAP` (e.g. click listeners) aren't in the context and won't be reverted. Wrap them with `contextSafe`, and remove listeners in cleanup:

```javascript
useGSAP((context, contextSafe) => {
  gsap.to(goodRef.current, { x: 100 });               // ✅ in context

  const onClick = contextSafe(() => {                  // ✅ wrapped
    gsap.to(goodRef.current, { rotation: 180 });
  });
  goodRef.current.addEventListener("click", onClick);
  return () => goodRef.current.removeEventListener("click", onClick); // ✅ cleanup
}, { scope: container });
```

## gsap.context() in plain useEffect (when @gsap/react isn't used)

```javascript
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to(".box", { x: 100 });
  }, containerRef);
  return () => ctx.revert(); // ALWAYS revert
}, []);
```

## SSR (Next.js)

GSAP is browser-only. Keep all `gsap.*` / `ScrollTrigger.*` inside `useGSAP`/`useEffect` (client). Never execute during server render; dynamic-import plugins inside the effect if bundle size matters.

## Do NOT

- Target selectors without a `scope`.
- Skip cleanup (revert context / kill tweens & ScrollTriggers).
- Run GSAP during SSR.

Docs: https://gsap.com/resources/React
