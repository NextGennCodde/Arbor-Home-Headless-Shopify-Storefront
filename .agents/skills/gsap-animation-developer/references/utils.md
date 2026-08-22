# gsap.utils — reference

Pure helpers on `gsap.utils` (no registration). Use in tween vars, function-based values, ScrollTrigger/Observer callbacks, or any driving JS.

**Function form:** most utils take the value as the **last** argument. Omit it to get a reusable function. **Exception — `random()`**: pass `true` as the last arg for the function form (don't omit).

```javascript
gsap.utils.clamp(0, 100, 150);        // 100
const c = gsap.utils.clamp(0, 100); c(150); // 100
```

## Ranges

- **clamp(min, max, value?)** — constrain: `clamp(0,100,150) → 100`.
- **mapRange(inMin, inMax, outMin, outMax, value?)** — remap: `mapRange(0,1,0,360,0.5) → 180`.
- **normalize(min, max, value?)** — to 0–1: `normalize(0,100,50) → 0.5`.
- **interpolate(start, end, progress?)** — lerp numbers, colors, or objects: `interpolate("#ff0000","#0000ff",0.5)`, `interpolate({x:0},{x:100},0.5) → {x:50}`.

## Random & snap

- **random(min, max[, snapIncrement, returnFn])** or **random(array[, returnFn])** — `random(0,500,5)` snaps to nearest 5; `random(["red","blue"])` picks one. Reusable: pass `true` last: `random(-200,500,10,true)`. In vars as string: `x: "random(-100, 100, 5)"`, `backgroundColor: "random([red, blue, green])"`.
- **snap(snapTo, value?)** — `snap(10, 23) → 20`; array form `snap([0,100,200], 150) → 100`. In tween: `{ x: 200, snap: { x: 20 } }`.
- **shuffle(array)** — new array, random order.
- **distribute(config)** — returns a per-target value function; used for advanced spreads. Config: `base`, `amount` (total split across targets) or `each` (fixed step), `from` (`"start"`/`"center"`/`"edges"`/`"random"`/`"end"`/index/ratios), `grid` (`[rows, cols]` or `"auto"`), `axis`, `ease`.
```javascript
gsap.to(".class", { scale: gsap.utils.distribute({ base: 0.5, amount: 2.5, from: "center" }) });
```

## Units & color

- **getUnit("100px") → "px"** · **unitize(100, "px") → "100px"** (unchanged if already has a unit).
- **splitColor(color, returnHSL?)** — `splitColor("#6fb936") → [111,185,54]`; RGBA adds alpha; pass `true` for HSL.

## Arrays & composition

- **selector(scope)** — scoped query fn (accepts element or React ref): `const q = gsap.utils.selector(containerRef); gsap.to(q(".circle"), { x: 100 });`.
- **toArray(value, scope?)** — selector/NodeList/element → real array: `toArray(".item", container)`.
- **pipe(...fns)** — compose: `pipe(f1, f2)(v) === f2(f1(v))`.
- **wrap(min, max, value?)** — cyclic: `wrap(0,360,370) → 10`, `wrap(0,360,-10) → 350`.
- **wrapYoyo(min, max, value?)** — bounces at ends: `wrapYoyo(0,100,150) → 50`.

## Notes

- `mapRange`/`normalize` work on **numbers**, not units — use `getUnit`/`unitize` when units matter.
- Prefer the function form when reusing the same config many times (scroll/mousemove handlers).

Docs: https://gsap.com/docs/v3/HelperFunctions
