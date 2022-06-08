<script setup lang="ts">
import { QUERY_KEY_POKEMON_LIST_HOME } from "@/constants";
import { pokemon } from "@/services";
import { filter } from "@/shared";
import SearchBar from "../components/SearchBar.vue";
import PokemonCard from "@/components/PokemonCard.vue";
import Paginate from "@/components/Paginate.vue";
import type { Nullable } from "@/types";
import type { Pokemon } from "@/services";

const PER_PAGE = 24;
const showPreviewCard = ref(false);

const { data, isFetching, fetchNextPage } = useInfiniteQuery(
  QUERY_KEY_POKEMON_LIST_HOME,
  async ({ pageParam: offset = 0 }) => {
    showPreviewCard.value = true;

    const { data: minimal } = await pokemon.getList({
      offset,
      limit: PER_PAGE,
    });

    const results = [];

    for (const result of minimal.results) {
      const { data } = await pokemon.get(result.name);
      results.push(data);
    }

    showPreviewCard.value = false;

    return { offset, data: { ...minimal, results } };
  },
  {
    getNextPageParam({ offset, data }) {
      const offsetNext = offset + PER_PAGE;
      return offsetNext > data.count ? offsetNext - data.count : offsetNext;
    },
  }
);

const userQuery = ref("");
const userQueryResults = ref<Nullable<Pokemon[]>>(null);

const flatQueryData = computed(() => {
  return data.value?.pages.flatMap(({ data }) => data.results);
});
const results = computed(() => {
  return userQueryResults.value || flatQueryData.value || [];
});

function searchItem(query: string) {
  userQuery.value = query;
  userQueryResults.value = [];

  const cacheData = filterCache(query);

  if (cacheData?.length) {
    userQueryResults.value = (cacheData as unknown) as Pokemon[];
  } else {
    showPreviewCard.value = true;
    pokemon
      .get(query.toLowerCase())
      .then(({ data }) => {
        userQueryResults.value = [data];
      })
      .finally(() => {
        showPreviewCard.value = false;
      });
  }
}

function filterCache(query: string) {
  return filter(flatQueryData.value, (result) => {
    if (
      result.name.toLowerCase().includes(query) ||
      result.id == Number(query)
    ) {
      return result;
    }
  });
}
</script>

<template>
  <TheSection class="home">
    <div class="home__search__bar">
      <SearchBar
        :model-value="userQuery"
        placeholder="Pesquise por nome ou código"
        @update:model-value="searchItem"
      />
    </div>

    <h1>Pokémons</h1>

    <div class="home__content">
      <RouterLink
        v-for="result of results"
        :key="result.name"
        custom
        :to="{
          name: 'details',
          params: { name: result.name },
        }"
        #default="{ navigate }"
      >
        <PokemonCard :data="result" @click="navigate" />
      </RouterLink>
      <PokemonCard
        v-if="showPreviewCard"
        v-for="item of PER_PAGE"
        :key="`pokemon-card-preview-${item}`"
        preview
      />

      <span v-if="!results.length && userQuery">
        Nenhum resultado encontrado.
      </span>
    </div>

    <Paginate :loading="isFetching" @paginate="fetchNextPage()" />
  </TheSection>
</template>

<style scoped lang="postcss">
.home__search__bar {
  @apply mt-5;
}

.home h1 {
  @apply font-bold;
}

.home__content {
  @apply grid grid-cols-2 gap-x-4 gap-y-4 sm:gap-y-10;
}

@screen sm {
  .home__content {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
</style>
