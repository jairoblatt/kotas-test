<script setup lang="ts">
import Kotas from "@/assets/svg/kotas.svg?component";
</script>
<template>
  <nav class="nav">
    <div class="nav__logo">
      <RouterLink custom :to="{ name: 'home' }" #default="{ navigate }">
        <Kotas @click="navigate" />
      </RouterLink>
    </div>
  </nav>
</template>
<style scoped lang="postcss">
.nav {
  @apply h-14 bg-white flex items-center md:justify-start;
  @apply box-shadow-sm justify-center px-3;
}

.nav__logo {
  @apply cursor-pointer;
}
</style>
