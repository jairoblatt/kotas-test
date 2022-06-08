<script setup lang="ts">
import type { PokemonTypes } from "@/services/types";

interface Props {
  type: PokemonTypes;
}

defineProps<Props>();
</script>

<template>
  <div :class="[`pokemon-card-label--${type}`, 'pokemon-card-label']">
    {{ type }}
  </div>
</template>

<style scoped lang="postcss">
.pokemon-card-label {
  @apply uppercase rounded-full text-center;
  @apply w-fit px-3 md:py-0.5 md:min-w-[6rem] text-white;
  @apply bg-default sm:text-sm text-xs;
}

.pokemon-card-label--grass {
  @apply bg-grass;
}

.pokemon-card-label--poison {
  @apply bg-poison;
}

.pokemon-card-label--water {
  @apply bg-water;
}

.pokemon-card-label--fire {
  @apply bg-fire;
}

.pokemon-card-label--electric {
  @apply bg-electric;
}

.pokemon-card-label--ground {
  @apply bg-ground;
}

.pokemon-card-label--fairy {
  @apply bg-fairy;
}

.pokemon-card-label--normal {
  @apply bg-normal;
}

.pokemon-card-label--flying {
  @apply bg-flying;
}
</style>
