<script setup lang="ts">
import PokemonCard from "@/components/PokemonCard.vue";
import PokemonCardAbilities from "@/components/PokemonCardAbilities.vue";
import { QUERY_KEY_POKEMON_NAME } from "@/constants";
import { pokemon } from "@/services";

const name = useRoute().params.name as string;

const { data, isLoading, isError } = useQuery(
  [QUERY_KEY_POKEMON_NAME, name],
  async () => (await pokemon.get(name)).data
);
</script>

<template>
  <TheSection class="details" small>
    <PokemonCard
      v-if="!isError"
      :data="data"
      :preview="isLoading"
      class="details__card"
      no-details
    />
    <PokemonCardAbilities v-if="data" :abilities="data.abilities" />
    <RouterLink :to="{ name: 'home' }" class="details__link">
      Voltar
    </RouterLink>
  </TheSection>
</template>
<style scoped lang="postcss">
.details__card {
  @apply mt-10;
}

.details__link {
  @apply mx-auto font-bold text-blue-500 w-fit;
}
</style>
