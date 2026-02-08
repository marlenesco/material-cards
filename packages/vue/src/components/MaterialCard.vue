<script setup lang="ts">
import { computed, ref, watch, type Component, type PropType } from "vue";
import type { CardAction, CardBaseProps, CardColor } from "@material-cards/core";

interface VueCardAction extends CardAction {
  icon?: Component;
}

type CardInput = Omit<CardBaseProps["card"], "actions"> & { actions?: VueCardAction[] };

const props = defineProps({
  card: {
    type: Object as PropType<CardInput>,
    required: true
  },
  color: {
    type: String as PropType<CardColor>,
    default: "blue-grey"
  },
  colorHex: {
    type: String,
    required: false
  },
  // Keep this uncasted so an omitted prop remains undefined.
  isOpen: {
    type: null as unknown as PropType<boolean | undefined>,
    required: false
  },
  defaultOpen: {
    type: Boolean,
    default: false
  },
  onOpenChange: {
    type: Function as PropType<(isOpen: boolean) => void>,
    required: false
  }
});

const emit = defineEmits<{
  (event: "open-change", value: boolean): void;
}>();

const internalOpen = ref(props.defaultOpen ?? false);
watch(
  () => props.defaultOpen,
  (value) => {
    if (props.isOpen === undefined) internalOpen.value = value ?? false;
  }
);

const open = computed(() => props.isOpen ?? internalOpen.value);

const COLOR_MAP: Record<Exclude<CardColor, "custom">, string> = {
  red: "#ef4444",
  pink: "#ec4899",
  purple: "#a855f7",
  "deep-purple": "#7e22ce",
  indigo: "#6366f1",
  blue: "#3b82f6",
  "light-blue": "#0ea5e9",
  cyan: "#06b6d4",
  teal: "#14b8a6",
  green: "#22c55e",
  "light-green": "#84cc16",
  lime: "#65a30d",
  yellow: "#eab308",
  amber: "#f59e0b",
  orange: "#f97316",
  "deep-orange": "#ea580c",
  brown: "#8b5e3c",
  grey: "#6b7280",
  "blue-grey": "#475569"
};

const resolvedColor = computed(() => {
  if (props.color === "custom") return props.colorHex ?? COLOR_MAP["blue-grey"];
  return props.colorHex ?? COLOR_MAP[props.color];
});

function toggleOpen() {
  const next = !open.value;
  emit("open-change", next);
  props.onOpenChange?.(next);
  if (props.isOpen === undefined) internalOpen.value = next;
}
</script>

<template>
  <article class="card" :style="{ '--mc-color': resolvedColor }">
    <header class="header">
      <h3 class="title">{{ card.title }}</h3>
      <p v-if="card.subtitle" class="subtitle">{{ card.subtitle }}</p>
    </header>

    <img v-if="card.image" class="image" :src="card.image.src" :alt="card.image.alt" />

    <section v-if="card.description" class="content">
      <p class="description">{{ card.description }}</p>
    </section>

    <section class="actions">
      <button type="button" class="toggle" :aria-expanded="open" @click="toggleOpen">
        {{ open ? "Close" : "Open" }}
      </button>

      <template v-for="action in card.actions" :key="action.id">
        <a v-if="action.href" class="action" :href="action.href" :aria-label="action.ariaLabel ?? action.label">
          <component :is="action.icon" v-if="action.icon" aria-hidden="true" />
          <span v-else-if="action.iconName" aria-hidden="true">{{ action.iconName }}</span>
          <span>{{ action.label }}</span>
        </a>
        <button v-else type="button" class="action" :aria-label="action.ariaLabel ?? action.label">
          <component :is="action.icon" v-if="action.icon" aria-hidden="true" />
          <span v-else-if="action.iconName" aria-hidden="true">{{ action.iconName }}</span>
          <span>{{ action.label }}</span>
        </button>
      </template>
    </section>

    <footer class="footer" :class="{ footerOpen: open }">
      <nav class="links">
        <a
          v-for="link in card.links"
          :key="`${link.href}-${link.label}`"
          class="link"
          :href="link.href"
          :aria-label="link.ariaLabel ?? link.label"
          :target="link.target"
          :rel="link.target === '_blank' ? 'noreferrer' : undefined"
        >
          {{ link.label }}
        </a>
      </nav>
    </footer>
  </article>
</template>

<style scoped>
.card {
  --mc-color: #455a64;
  --mc-surface: #fff;
  --mc-text: #111827;
  --mc-muted: #4b5563;
  border: 1px solid color-mix(in srgb, var(--mc-color) 30%, #d1d5db);
  border-radius: 16px;
  background: var(--mc-surface);
  color: var(--mc-text);
  overflow: hidden;
}
.header { padding: 16px; border-top: 4px solid var(--mc-color); }
.title { margin: 0; font-size: 1.1rem; }
.subtitle { margin: 4px 0 0; color: var(--mc-muted); font-size: 0.9rem; }
.image { width: 100%; height: 220px; object-fit: cover; display: block; }
.content { padding: 0 16px; }
.description { margin: 12px 0; line-height: 1.5; }
.actions { display: flex; gap: 10px; padding: 12px 16px 16px; }
.action, .toggle {
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  padding: 8px 12px;
  background: #fff;
  color: inherit;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.footer { max-height: 0; overflow: hidden; transition: max-height 220ms ease; border-top: 1px solid #f3f4f6; }
.footerOpen { max-height: 220px; }
.links { display: flex; flex-wrap: wrap; gap: 8px; padding: 12px 16px 16px; }
.link { font-size: 0.85rem; color: var(--mc-color); }
</style>
