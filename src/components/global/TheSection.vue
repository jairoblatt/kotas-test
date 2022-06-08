<script setup lang="ts">
interface Props {
  small?: boolean;
}

defineProps<Props>();
</script>

<template>
  <section class="section" :class="{ 'section--small': small }">
    <slot />
  </section>
</template>
<style scoped lang="postcss">
.section {
  @apply flex flex-col gap-y-10 mx-auto px-3;
  @apply md:max-w-3xl xl:max-w-7xl pb-10;
}

.section--small {
  @apply px-1 xl:max-w-5xl;
}
</style>
