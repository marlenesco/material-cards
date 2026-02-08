<script setup lang="ts">
import { ref } from "vue";
import { Heart } from "lucide-vue-next";
import { MaterialCard } from "@material-cards/vue";

const isOpen = ref(false);
</script>

<template>
  <main style="max-width: 420px; margin: 40px auto; padding: 16px;">
    <MaterialCard
      color="orange"
      :is-open="isOpen"
      @open-change="(value) => (isOpen = value)"
      :card="{
        title: 'Vue Demo',
        subtitle: 'Material Card',
        description: 'Card Vue con stato controllato.',
        image: {
          src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80',
          alt: 'Mountain'
        },
        actions: [{ id: 'fav', label: 'Preferiti', icon: Heart }],
        links: [{ label: 'Vue Docs', href: 'https://vuejs.org', target: '_blank' }]
      }"
    />
  </main>
</template>
