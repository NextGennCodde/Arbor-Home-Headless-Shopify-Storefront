# GSAP plugins — reference

All plugins are **free** (incl. formerly Club-only SplitText, MorphSVG). Install from the public `gsap` package; import as `gsap/SplitText`, `gsap/MorphSVGPlugin`, etc. **Register every plugin before use**, once (in React register at app level / before first `useGSAP`, not in a re-rendering component). Never suggest `.npmrc` auth tokens or a private registry.

```javascript
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Flip } from "gsap/Flip";
gsap.registerPlugin(ScrollToPlugin, Flip);
```

## Scroll

### ScrollToPlugin — animate scroll position

```javascript
gsap.to(window, { duration: 1, scrollTo: { y: 500 } });
gsap.to(window, { duration: 1, scrollTo: { y: "#section", offsetY: 50 } });
gsap.to(container, { duration: 1, scrollTo: { x: "max" } });
```
`scrollTo` object: `x`/`y` (number or `"max"`), `element` (scroll into view), `offsetX`/`offsetY`.

### ScrollSmoother — smooth/momentum native scroll

Requires ScrollTrigger + this DOM structure; register after ScrollTrigger:
```html
<div id="smooth-wrapper"><div id="smooth-content"><!-- content --></div></div>
<!-- position:fixed elements go outside the wrapper -->
```

## DOM / UI

### Flip — animate between two layout states (FLIP)

```javascript
const state = Flip.getState(".item");
// change the DOM: reorder, add/remove, toggle classes
Flip.from(state, { duration: 0.5, ease: "power2.inOut" });
```
`Flip.from` vars: `absolute`, `nested`, `scale` (default true), `simple`, `duration`, `ease`. Use for lists, grids, expand/collapse.

### Draggable — drag / spin / throw

```javascript
gsap.registerPlugin(Draggable, InertiaPlugin);
Draggable.create(".box", { type: "x,y", bounds: "#container", inertia: true });
Draggable.create(".knob", { type: "rotation" });
```
Options: `type` (`"x"`/`"y"`/`"x,y"`/`"rotation"`/`"scroll"`), `bounds`, `inertia` (needs InertiaPlugin), `edgeResistance` (0–1), `cursor`, `onDragStart/onDrag/onDragEnd`, `onThrowUpdate/onThrowComplete`.

### InertiaPlugin — momentum / velocity glide

Works with Draggable (`inertia: true`), or track any property's velocity and glide to a stop:
```javascript
InertiaPlugin.track(".box", "x");
gsap.to(obj, { inertia: { x: "auto" } });
```

### Observer — normalized pointer/scroll/wheel input

```javascript
Observer.create({ target: "#area", type: "wheel,touch,pointer", tolerance: 10,
  onUp: () => {}, onDown: () => {}, onLeft: () => {}, onRight: () => {} });
```

## Text

### SplitText — split into chars/words/lines

Returns instance with `chars`, `words`, `lines` (and `masks`). Revert with `.revert()` or via `gsap.context()`. Works with matchMedia and useGSAP.

```javascript
const split = SplitText.create(".heading", { type: "words, chars" });
gsap.from(split.chars, { opacity: 0, y: 20, stagger: 0.03, duration: 0.4 });

// autoSplit + onSplit (v3.13+): animate inside onSplit and RETURN the tween for auto-cleanup/re-sync
SplitText.create(".split", {
  type: "lines", autoSplit: true,
  onSplit(self) { return gsap.from(self.lines, { y: 100, opacity: 0, stagger: 0.05, duration: 0.5 }); }
});
```
Key vars: `type` (split only what you animate), `charsClass`/`wordsClass`/`linesClass` (append `"++"` for indexed classes), `aria` (`"auto"` default), `autoSplit`, `onSplit(self)`, `mask` (`"lines"`/`"words"`/`"chars"` for reveal), `tag`, `deepSlice`, `ignore`, `smartWrap`, `wordDelimiter`, `prepareText`, `propIndex`, `reduceWhiteSpace`, `onRevert`. Tips: split after custom fonts load (`document.fonts.ready`) or use `autoSplit`; `font-kerning: none; text-rendering: optimizeSpeed;` avoids kerning shift; avoid `text-wrap: balance`; no SVG `<text>` support.

### ScrambleText — scramble/glitch reveal

```javascript
gsap.to(".text", { duration: 1, scrambleText: { text: "New message", chars: "01", revealDelay: 0.5 } });
```

## SVG

### DrawSVG — animate stroke draw/erase

`drawSVG` describes the **visible stroke segment** `"start end"` (%, or length), not "A→B over time". Element needs a visible `stroke` + `stroke-width`.
```javascript
gsap.from("#path", { duration: 1, drawSVG: 0 });                 // nothing → full
gsap.fromTo("#p", { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 1 });
gsap.to("#path", { duration: 1, drawSVG: "20% 80%" });           // middle only
```
Affects stroke only (not fill). Prefer single-segment `<path>`. `DrawSVGPlugin.getLength(el)` / `.getPosition(el)`.

### MorphSVG — morph one shape into another (`d`)

Shapes needn't share point counts. Works on `<path>`, `<polyline>`, `<polygon>`; convert primitives with `MorphSVGPlugin.convertToPath("circle, rect, ellipse, line")`.
```javascript
gsap.to("#diamond", { duration: 1, morphSVG: "#lightning", ease: "power2.inOut" });
gsap.to("#diamond", { duration: 1, morphSVG: { shape: "#lightning", type: "rotational", shapeIndex: 2 } });
```
Object opts: `shape` (required), `type` (`"linear"`/`"rotational"`), `map` (`"size"`/`"position"`/`"complexity"`), `shapeIndex` (fix crossover — use `"log"` to print the auto value, or `findShapeIndex()`; array per segment for multi-segment), `smooth` (v3.14+), `curveMode`, `origin`, `precision`, `precompile`, `render`, `updateTarget`. For twisted morphs set `shapeIndex`; precompile only helps first-frame startup, not mid-tween jank.

### MotionPath — animate along an SVG path

```javascript
gsap.to(".dot", { duration: 2, motionPath: { path: "#path", align: "#path", alignOrigin: [0.5, 0.5], autoRotate: true } });
```
Opts: `path`, `align`, `alignOrigin` `[x,y]`, `autoRotate`, `curviness` (0–2). **MotionPathHelper** = dev-time visual editor.

## Easing plugins

- **CustomEase** — arbitrary curve: `CustomEase.create("name", ".17,.67,.83,.67")` (cubic-bezier) or SVG path data for complex curves.
- **EasePack** — SlowMo, RoughEase, ExpoScaleEase.
- **CustomWiggle** — multi-oscillation wiggle/shake.
- **CustomBounce** — configurable bounce.

## Physics

```javascript
gsap.to(".ball", { duration: 2, physics2D: { velocity: 250, angle: 80, gravity: 500 } });  // Physics2DPlugin
gsap.to(".obj", { duration: 2, physicsProps: { x: { velocity: 100, end: 300 }, y: { velocity: -50, acceleration: 200 } } }); // PhysicsPropsPlugin
```

## Dev & integrations

- **GSDevTools** — scrub/debug UI: `GSDevTools.create({ animation: tl })`. Dev only; never ship.
- **PixiPlugin** — animate PixiJS display objects: `gsap.to(sprite, { pixi: { x: 200, scale: 1.5 }, duration: 1 })`.

## Do NOT

- Use a plugin without `gsap.registerPlugin()`.
- Ship GSDevTools or `markers: true` to production.
- Recommend Club GSAP membership, auth tokens, or a private registry — all free.

Docs: https://gsap.com/docs/v3/Plugins/
