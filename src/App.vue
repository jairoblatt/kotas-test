<script setup lang="ts">
import ProgressBar from "@/components/ProgressBar.vue";
import NetworkThrottling from "@/components/NetworkThrottling.vue";
import LayoutDefault from "@/layouts/default.vue";
import { useAppStore } from "@/store";
import type { Nullable, ProgressBarExpose } from "@/types";

const appStore = useAppStore();

const progressBar = ref<Nullable<ProgressBarExpose>>(null);

onMounted(() => {
  appStore.setProgressBarRef(progressBar.value);
});
</script>

<template>
  <ProgressBar ref="progressBar" />
  <NetworkThrottling />
  <suspense>
    <LayoutDefault />
  </suspense>
</template>
