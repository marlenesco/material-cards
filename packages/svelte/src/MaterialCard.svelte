<script lang="ts">
  import type { CardBaseProps, CardColor } from "@material-cards/core";
  import type { SvelteCardAction } from "./types";

  export let card: Omit<CardBaseProps["card"], "actions"> & { actions?: SvelteCardAction[] };
  export let color: CardColor = "blue-grey";
  export let colorHex: string | undefined = undefined;
  export let isOpen: boolean | undefined = undefined;
  export let defaultOpen = false;
  export let onOpenChange: ((isOpen: boolean) => void) | undefined = undefined;

  let internalOpen = defaultOpen;
  let open = isOpen ?? internalOpen;
  $: open = isOpen ?? internalOpen;

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

  $: resolvedColor =
    color === "custom"
      ? (colorHex ?? COLOR_MAP["blue-grey"])
      : (colorHex ?? COLOR_MAP[color]);

  function toggleOpen() {
    const next = !open;
    onOpenChange?.(next);
    if (isOpen === undefined) internalOpen = next;
  }
</script>

<article class="card" style={`--mc-color: ${resolvedColor};`}>
  <header class="header">
    <h3 class="title">{card.title}</h3>
    {#if card.subtitle}
      <p class="subtitle">{card.subtitle}</p>
    {/if}
  </header>

  {#if card.image}
    <img class="image" src={card.image.src} alt={card.image.alt} />
  {/if}

  {#if card.description}
    <section class="content">
      <p class="description">{card.description}</p>
    </section>
  {/if}

  <section class="actions">
    <button type="button" class="toggle" on:click={toggleOpen} aria-expanded={open}>
      {open ? "Close" : "Open"}
    </button>

    {#each card.actions ?? [] as action (action.id)}
      {#if action.href}
        <a class="action" href={action.href} aria-label={action.ariaLabel ?? action.label}>
          {#if action.icon}
            <svelte:component this={action.icon} />
          {:else if action.iconName}
            <span aria-hidden="true">{action.iconName}</span>
          {/if}
          <span>{action.label}</span>
        </a>
      {:else}
        <button type="button" class="action" aria-label={action.ariaLabel ?? action.label}>
          {#if action.icon}
            <svelte:component this={action.icon} />
          {:else if action.iconName}
            <span aria-hidden="true">{action.iconName}</span>
          {/if}
          <span>{action.label}</span>
        </button>
      {/if}
    {/each}
  </section>

  <footer class={`footer ${open ? "footerOpen" : ""}`}>
    <nav class="links">
      {#each card.links ?? [] as link (`${link.href}-${link.label}`)}
        <a
          class="link"
          href={link.href}
          aria-label={link.ariaLabel ?? link.label}
          target={link.target}
          rel={link.target === "_blank" ? "noreferrer" : undefined}
        >
          {link.label}
        </a>
      {/each}
    </nav>
  </footer>
</article>

<style>
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
