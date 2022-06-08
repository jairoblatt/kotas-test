<script setup lang="ts">
import {
  POKEMON_DEFAULT_LANGUAGE,
  QUERY_KEY_POKEMON_ABILITY,
} from "@/constants";
import { pokemon, PokemonAbility } from "@/services";
import { filter } from "@/shared";

interface Props {
  abilityName: PokemonAbility["ability"]["name"];
  is?: string;
}

const props = withDefaults(defineProps<Props>(), {
  is: "li",
});

/**
 *
 * Will cache the ability to use on the next request without a refetch.
 * So we don't have to worry about the component being unmounted and lost
 * fetched data, all data is stored with query key outside the instance.
 *
 **/
const { data, isFetching } = useQuery(
  [QUERY_KEY_POKEMON_ABILITY, props.abilityName],
  async () => (await pokemon.getAbility(props.abilityName)).data
);

const description = computed(() => {
  return filter(data.value!.effect_entries, {
    language: { name: POKEMON_DEFAULT_LANGUAGE },
  })?.[0];
});
</script>
<template>
  <component :is="is" class="pokemon-card-abilities">
    <skeleton v-if="isFetching" class="w-full h-9" />
    <span v-else-if="description"> {{ description.effect }}</span>
  </component>
</template>
<style scoped lang="postcss">
.pokemon-card-abilities {
  @apply border-t py-5 text-gray-700;
}
</style>
