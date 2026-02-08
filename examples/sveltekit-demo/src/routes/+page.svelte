<script lang="ts">
  import Heart from "@lucide/svelte/icons/heart";
  import { MaterialCard } from "@material-cards/svelte";

  let open = false;
</script>

<main style="max-width: 420px; margin: 40px auto; padding: 16px;">
  <MaterialCard
    color="indigo"
    isOpen={open}
    onOpenChange={(next) => (open = next)}
    card={{
      title: "SvelteKit Demo",
      subtitle: "Material Card",
      description: "Card Svelte con icona esterna.",
      image: {
        src: "https://images.unsplash.com/photo-1493244040629-496f6d136cc3?auto=format&fit=crop&w=900&q=80",
        alt: "Forest"
      },
      actions: [{ id: "fav", label: "Preferiti", icon: Heart }],
      links: [{ label: "SvelteKit", href: "https://kit.svelte.dev", target: "_blank" }]
    }}
  />
</main>
