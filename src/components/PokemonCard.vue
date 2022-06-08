<script setup lang="ts">
import PokemonCardLabel from "@/components/PokemonCardLabel.vue";
import type { Pokemon } from "@/services";

interface Props {
  data?: Pokemon;
  preview?: boolean;
  noDetails?: boolean;
}

const props = defineProps<Props>();

const imgSuccess = ref(false);

const imgSrc = computed(() => {
  if (props.data) {
    const { sprites } = props.data;
    return (
      sprites.other?.["official-artwork"]?.front_default ||
      sprites.front_default
    );
  }
});

function onImageLoad() {
  imgSuccess.value = true;
}

function onImageError() {
  imgSuccess.value = false;
}
</script>

<template>
  <Card
    class="pokemon-card"
    :class="{
      'pokemon-card--hover': !noDetails,
      'pokemon-card--no--details': noDetails,
    }"
  >
    <div class="pokemon-card__image">
      <Skeleton v-if="preview" class="pokemon-card__image__placeholder" />
      <img
        v-else-if="data && imgSrc"
        v-show="imgSuccess"
        :src="imgSrc"
        height="96"
        width="96"
        :alt="`${data.name} image`"
        @load="onImageLoad"
        @error="onImageError"
      />
    </div>

    <div class="pokemon-card__content">
      <div v-if="preview" class="pokemon-card__content__placeholder">
        <Skeleton class="sm:h-6 h-3 sm:w-36 w-24" />
        <Skeleton v-if="!noDetails" class="w-20 h-4 mt-3 mb-8" />
      </div>
      <template v-else-if="data">
        <h2>{{ data.name }}</h2>
        <h3 v-if="!noDetails">Cód: {{ data.id }}</h3>
      </template>
    </div>

    <div class="pokemon-card__labels">
      <Skeleton v-if="preview" class="pokemon-card__label__placeholder" />
      <PokemonCardLabel
        v-else-if="data"
        v-for="{ type } of data?.types"
        :key="type.url"
        :type="type.name"
      />
    </div>
  </Card>
</template>

<style scoped lang="postcss">
.pokemon-card {
  @apply py-5 flex items-center justify-evenly flex-col;
}

.pokemon-card--hover {
  @apply cursor-pointer transition-transform hover:scale-105;
}

.pokemon-card__image {
  @apply h-14 w-14;
}

.pokemon-card__content {
  @apply text-center font-bold pb-10 pt-5 sm:pt-0;
}

.pokemon-card__content h2 {
  @apply capitalize text-lg sm:text-xl;
}

.pokemon-card__content h3 {
  @apply mt-3 mb-8 block text-sm sm:text-base;
}

.pokemon-card__labels {
  @apply flex gap-x-2;
}

.pokemon-card__image__placeholder {
  @apply rounded-full h-full w-full;
}

.pokemon-card__content__placeholder {
  @apply flex flex-col items-center mt-1;
}

.pokemon-card__label__placeholder {
  @apply min-w-[6rem] h-6 rounded-full;
}

.pokemon-card--no--details .pokemon-card__content h2 {
  @apply pb-2;
}

.pokemon-card--no--details .pokemon-card__image {
  @apply h-32 w-32;
}

.pokemon-card--no--details .pokemon-card__image img {
  @apply mx-auto;
}
</style>
