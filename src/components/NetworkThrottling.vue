<script setup lang="ts">
import { useAppStore } from "@/store";

const apStore = useAppStore();
</script>

<template>
  <button
    class="network-throttling"
    @click="apStore.setNetworkThrottling(!apStore.getNetworkThrottling)"
  >
    {{ apStore.getNetworkThrottling ? "Desativar" : "Ativar" }} conexão lenta
  </button>
</template>

<style scoped lang="postcss">
.network-throttling {
  @apply fixed bottom-20 md:bottom-10 right-5 z-50 text-white p-2 rounded-md;
  @apply min-w-[15rem] transition-transform hover:translate-y-1;

  background-color: #ff4757;
  box-shadow: 0 10px 20px -10px #ff4757;
}

.network-throttling:focus {
  @apply outline-none;

  box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #ff4757, 0 1px 2px 0 black;
}
</style>
