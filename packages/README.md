# vNext packages

## Shared prop model

- `card`: `{ title, subtitle?, description?, image?, links?, actions? }`
- `color`: palette token (`blue-grey` default) or `custom`
- `colorHex`: custom hex override (example `#0f766e`)
- `isOpen`, `defaultOpen`, `onOpenChange`

## React icon example

```tsx
import { Heart } from "lucide-react";
import { MaterialCard } from "@material-cards/react";

<MaterialCard
  color="teal"
  card={{
    title: "Example",
    actions: [{ id: "like", label: "Like", Icon: Heart }]
  }}
/>
```

## Vue icon example

```vue
<script setup lang="ts">
import { MaterialCard } from "@material-cards/vue";
import { Heart } from "lucide-vue-next";
</script>

<template>
  <MaterialCard
    color="teal"
    :card="{ title: 'Example', actions: [{ id: 'like', label: 'Like', icon: Heart }] }"
  />
</template>
```

## Svelte icon example

```svelte
<script lang="ts">
  import { MaterialCard } from "@material-cards/svelte";
  import Heart from "@lucide/svelte/icons/heart";
</script>

<MaterialCard
  color="teal"
  card={{ title: "Example", actions: [{ id: "like", label: "Like", icon: Heart }] }}
/>
```
