# ScrollTrigger — full reference

Scroll-linked animations, pinning, scrub, triggers. Register once: `gsap.registerPlugin(ScrollTrigger)`.
Attach `scrollTrigger` to a **top-level tween or timeline only** — never a tween nested inside a timeline.

## Basic trigger

```javascript
gsap.to(".box", {
  x: 500, duration: 1,
  scrollTrigger: {
    trigger: ".box",
    start: "top center",   // when top of trigger hits center of viewport
    end: "bottom center",
    toggleActions: "play reverse play reverse" // onEnter onLeave onEnterBack onLeaveBack
  }
});
```

`start`/`end` format is `"triggerPosition viewportPosition"` (e.g. `"top top"`, `"center center"`, `"bottom 80%"`). A number = px scrolled from top. Relative: `"+=300"`, `"+=100%"`, or `"max"`. Wrap in `clamp()` (v3.12+) to keep within page bounds: `start: "clamp(top bottom)"`. Can be a function receiving the ScrollTrigger instance — call `ScrollTrigger.refresh()` after layout changes.

## Config options

| Property | Type | Description |
|---|---|---|
| `trigger` | String \| Element | Element defining start position. Required (or use shorthand `scrollTrigger: ".sel"`). |
| `start` | String \| Number \| Function | Default `"top bottom"` (or `"top top"` if `pin: true`). |
| `end` | String \| Number \| Function | Default `"bottom top"`. |
| `endTrigger` | String \| Element | Element used for `end` when different from trigger. |
| `scrub` | Boolean \| Number | Link progress to scroll. `true` = direct; number = seconds to "catch up". |
| `toggleActions` | String | Four actions: onEnter, onLeave, onEnterBack, onLeaveBack. Each: `play` `pause` `resume` `reset` `restart` `complete` `reverse` `none`. Default `"play none none none"`. |
| `pin` | Boolean \| String \| Element | Pin element while active. Animate its children, not itself. |
| `pinSpacing` | Boolean \| String | Default `true` (adds spacer). `false` or `"margin"`. |
| `horizontal` | Boolean | Horizontal scrolling. |
| `scroller` | String \| Element | Scroll container (default viewport). |
| `markers` | Boolean \| Object | Dev markers. Remove in production. |
| `once` | Boolean | Kill after end reached once. |
| `id` | String | For `ScrollTrigger.getById(id)`. |
| `refreshPriority` | Number | Lower = refreshed first. Set when triggers are created out of page order. |
| `toggleClass` | String \| Object | Add/remove class when active. |
| `snap` | Number \| Array \| Function \| "labels" \| Object | Snap to progress. Object: `{ snapTo: 0.25, duration: 0.3, delay: 0.1, ease: "power1.inOut" }`. |
| `containerAnimation` | Tween \| Timeline | For fake horizontal scroll (see below). No pinning/snapping on these. |
| `onEnter/onLeave/onEnterBack/onLeaveBack` | Function | Receive the ScrollTrigger instance (`progress`, `direction`, `isActive`, `getVelocity()`). |
| `onUpdate/onToggle/onRefresh/onScrubComplete` | Function | Progress change / active flip / after recalc / numeric scrub finished. |

**Standalone** (no tween): `ScrollTrigger.create({ trigger, start, end, onUpdate: (self) => ... })`.

## Scrub

Ties progress to scroll. `scrub: true` = direct; `scrub: 1` = 1s smoothing lag. Use scrub OR toggleActions, never both (scrub wins).

## Pinning

```javascript
scrollTrigger: { trigger: ".section", start: "top top", end: "+=1000", pin: true, scrub: 1 }
```
`pinSpacing` defaults `true` (spacer prevents layout collapse). Animate the pinned element's **children**.

## ScrollTrigger.batch()

One ScrollTrigger per target, callbacks batched within a short interval. Good IntersectionObserver alternative. **Callbacks receive `(elements, triggers)` arrays** (not the instance).

```javascript
ScrollTrigger.batch(".card", {
  interval: 0.1,      // max seconds to collect a batch
  batchMax: 4,        // max elements per batch (can be a function for responsive)
  start: "top 80%",
  onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1, overwrite: true }),
  onLeaveBack: (batch) => gsap.set(batch, { opacity: 0, y: 50, overwrite: true })
});
```
Do not pass `trigger`, `animation`, `scrub`, `snap`, `toggleActions`, `invalidateOnRefresh`, `onSnapComplete`, `onScrubComplete`.

## Horizontal scroll (containerAnimation)

Pin a section; as user scrolls vertically, inner content moves horizontally. **The horizontal tween MUST use `ease: "none"`** or scroll/position won't line up (very common mistake).

```javascript
const scrollingEl = document.querySelector(".horizontal-el");
const scrollTween = gsap.to(scrollingEl, {
  xPercent: () => Math.max(0, window.innerWidth - scrollingEl.offsetWidth),
  ease: "none", // REQUIRED
  scrollTrigger: {
    trigger: scrollingEl,
    pin: scrollingEl.parentNode, // pin the wrapper, not the animated element
    start: "top top",
    end: "+=1000"
  }
});

// Tweens triggered by the horizontal movement reference containerAnimation:
gsap.to(".nested-el-1", {
  y: 100,
  scrollTrigger: {
    containerAnimation: scrollTween, // IMPORTANT
    trigger: ".nested-wrapper-1",
    start: "left center",            // based on horizontal movement
    toggleActions: "play none none reset"
  }
});
```
Caveats: no pinning/snapping on containerAnimation ScrollTriggers; animate a child, not the trigger itself.

## ScrollTrigger.scrollerProxy()

For third-party smooth-scroll libs (GSAP's own **ScrollSmoother** needs no proxy). Provide `scrollTop`/`scrollLeft` getter-setters (called with an arg = set, no arg = get), optional `getBoundingClientRect`, `scrollWidth/Height`, `fixedMarkers`, `pinType` (`"fixed"` if pins jitter, `"transform"` if they don't stick). **Critical:** notify ScrollTrigger on scroll — `smoothScroller.addListener(ScrollTrigger.update)`.

```javascript
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) { if (arguments.length) scrollbar.scrollTop = value; return scrollbar.scrollTop; },
  getBoundingClientRect() { return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }; }
});
scrollbar.addListener(ScrollTrigger.update);
```

## Refresh & cleanup

- `ScrollTrigger.refresh()` — recalculate after DOM/layout/font changes or dynamic content. Auto-called on resize (debounced 200ms). Runs in creation order or by `refreshPriority`.
- Create triggers **top-to-bottom** in page order, or set `refreshPriority` (first on page = lower number).
- SPA / unmount cleanup: `ScrollTrigger.getAll().forEach(t => t.kill())` or `ScrollTrigger.getById("id")?.kill()`. In React use `useGSAP()`; in Vue/Svelte use `gsap.context()` + `ctx.revert()`.

## Do NOT

- Put ScrollTrigger on a child tween of a timeline — put it on the timeline. Wrong: `gsap.timeline().to(".a", { scrollTrigger })`. Right: `gsap.timeline({ scrollTrigger }).to(".a", {...})`.
- Use `scrub` and `toggleActions` together.
- Use any ease other than `"none"` on a `containerAnimation` tween.
- Leave `markers: true` in production.
- Forget `refresh()` after layout changes affecting trigger positions.

Docs: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
