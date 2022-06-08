<script setup lang="ts">
import PokemonCardAbilitiesItem from "./PokemonCardAbilitiesItem.vue";
import type { PokemonAbility } from "@/services";

interface Props {
  abilities: PokemonAbility[];
}

defineProps<Props>();
</script>

<template>
  <Card class="pokemon-card-abilities">
    <h3>Habilidades</h3>
    <ul>
      <PokemonCardAbilitiesItem
        v-for="{ ability } of abilities"
        :key="ability.url"
        :ability-name="ability.name"
      />
    </ul>
  </Card>
</template>
<style scoped lang="postcss">
.pokemon-card-abilities {
  @apply px-4;
}

.pokemon-card-abilities,
.pokemon-card-abilities ul {
  @apply flex flex-col;
}

.pokemon-card-abilities h3 {
  @apply text-xl font-bold text-center py-4;
}
</style>
