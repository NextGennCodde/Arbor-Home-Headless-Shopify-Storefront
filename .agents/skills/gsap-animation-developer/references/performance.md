# GSAP performance — reference

For smooth 60fps and low jank.

## Prefer transform + opacity

Animating `x`, `y`, `scaleX/Y`, `rotation`/`rotationX/Y`, `skewX/Y`, and `opacity` stays on the compositor (no layout, minimal paint).

- ✅ Prefer: `x`, `y`, `scale`, `rotation`, `opacity`.
- ❌ Avoid for movement: `width`, `height`, `top`, `left`, `margin`, `padding` (trigger layout → jank).

GSAP's `x`/`y` use translate — use them instead of `left`/`top`.

## will-change

Add `will-change: transform;` in CSS **only** on elements that actually animate (promotes a layer). Don't blanket-apply it or `force3D` "just in case."

## quickTo() for frequently-updated props

For values updated every frame (mouse followers), reuse one tween:

```javascript
const xTo = gsap.quickTo("#id", "x", { duration: 0.4, ease: "power3" });
const yTo = gsap.quickTo("#id", "y", { duration: 0.4, ease: "power3" });
container.addEventListener("mousemove", (e) => { xTo(e.pageX); yTo(e.pageY); });
```

## Many elements

- Use **`stagger`** instead of many manual-delay tweens (more efficient).
- For long lists: virtualize or animate only visible items; don't spin up hundreds of simultaneous tweens.
- Reuse timelines; don't create new ones every frame.

## Batch reads/writes

GSAP batches internally. When mixing with manual DOM reads/writes, do all reads first, then all writes — avoid interleaving (layout thrashing).

## ScrollTrigger

- `pin: true` promotes the pinned element — pin only what's needed.
- Small `scrub` (e.g. `scrub: 1`) reduces work; test on low-end devices.
- Call `ScrollTrigger.refresh()` only when layout actually changes, debounced — not on every resize.

## Reduce simultaneous work

Pause/kill off-screen or inactive animations. Avoid animating huge numbers of properties on many elements at once — simplify or sequence.

## Do NOT

- Animate `width`/`height`/`top`/`left` for movement when transforms work.
- Set `will-change`/`force3D` on every element.
- Create hundreds of overlapping tweens/ScrollTriggers without testing on low-end devices.
- Skip cleanup — stray tweens/ScrollTriggers keep running.
