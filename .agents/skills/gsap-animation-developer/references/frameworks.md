# GSAP with Vue, Nuxt, Svelte (non-React)

For React use `references/react.md`. Universal principles:

1. **Create** tweens/ScrollTriggers **after** the DOM exists (`onMounted` / `onMount`).
2. **Revert/kill** in unmount cleanup so nothing runs on detached nodes.
3. **Scope selectors** to the component root via `gsap.context(cb, containerRef)`.

## Vue 3 (`<script setup>`)

```javascript
<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger); // once per app (e.g. main.js)

const container = ref(null);
let ctx;

onMounted(() => {
  if (!container.value) return;
  ctx = gsap.context(() => {
    gsap.to(".box", { x: 100 });
    gsap.from(".item", { autoAlpha: 0, stagger: 0.1 });
  }, container.value);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <div ref="container">
    <div class="box">Box</div>
    <div class="item">Item</div>
  </div>
</template>
```

`gsap.context(cb, container.value)` scopes selectors and tracks everything (incl. ScrollTriggers) for `ctx.revert()`.

## Nuxt 4 — composable + lazy-loaded plugins

Register core plugins in a composable; lazy-load heavy/rarely-used plugins to cut bundle size.

```typescript
// composables/useGSAP.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const pluginMap = {
  CustomEase: () => import("gsap/CustomEase"),
  Flip: () => import("gsap/Flip"),
  MotionPathPlugin: () => import("gsap/MotionPathPlugin"),
  Observer: () => import("gsap/Observer"),
  ScrollToPlugin: () => import("gsap/ScrollToPlugin"),
  ScrollTrigger: () => import("gsap/ScrollTrigger"),
  DrawSVGPlugin: () => import("gsap/DrawSVGPlugin"),
  MorphSVGPlugin: () => import("gsap/MorphSVGPlugin"),
  ScrollSmoother: () => import("gsap/ScrollSmoother"),
  SplitText: () => import("gsap/SplitText"),
  // ...add the rest as needed
} as const;

type Plugins = keyof typeof pluginMap;

export default function () {
  gsap.registerPlugin(ScrollTrigger); // register widely-used plugins upfront

  async function lazyLoadPlugin<K extends Plugins>(plugin: K) {
    const m: any = await pluginMap[plugin]();
    const p = m[plugin];
    gsap.registerPlugin(p);
    return p;
  }

  return { gsap, ScrollTrigger, lazyLoadPlugin };
}
```

In a component: `const { gsap, ScrollTrigger, lazyLoadPlugin } = useGSAP();` then `await lazyLoadPlugin("SplitText")` where needed. Use `gsap.context(scope)` + `onUnmounted → ctx.revert()` as in Vue 3.

## Svelte

```javascript
<script>
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  let container;

  onMount(() => {
    if (!container) return;
    const ctx = gsap.context(() => {
      gsap.to(".box", { x: 100 });
      gsap.from(".item", { autoAlpha: 0, stagger: 0.1 });
    }, container);
    return () => ctx.revert(); // onMount cleanup runs on destroy
  });
</script>

<div bind:this={container}>
  <div class="box">Box</div>
  <div class="item">Item</div>
</div>
```

Svelte 5's lifecycle differs but the principle holds: create when mounted, revert when destroyed.

## ScrollTrigger in components

ScrollTriggers are included in `gsap.context()` and reverted by `ctx.revert()`. Call `ScrollTrigger.refresh()` after layout-affecting DOM updates (Vue `nextTick`, Svelte `tick`, or after async content).

## Do NOT

- Create tweens/ScrollTriggers before mount (DOM may not exist).
- Use selectors without a `scope`.
- Skip `ctx.revert()` cleanup.
- Register plugins in per-render component bodies — register once at app level.
