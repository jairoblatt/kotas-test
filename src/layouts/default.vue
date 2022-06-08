<script setup lang="ts">
import TheNav from "@/components/TheNav.vue";
</script>

<template>
  <div class="layout__default">
    <TheNav />
    <main>
      <RouterView #default="{ Component }">
        <transition mode="out-in" name="zoom-fade">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
  </div>
</template>

<style lang="postcss" scoped>
.layout__default {
  @apply min-h-screen bg-white-light overflow-hidden;
}
</style>
