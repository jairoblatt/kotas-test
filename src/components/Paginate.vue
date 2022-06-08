<script setup lang="ts">
import { sleep, useEventListener } from "@/shared";

interface Props {
  distance?: number;
  delay?: number;
  loading: boolean;
  disabled?: boolean;
}

interface Emits {
  (event: "paginate"): void;
}

const emits = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  delay: 1000,
  distance: 300,
});
const ready = ref(true);

const stopScroll = useEventListener(document, "scroll", infiniteScroll);
onBeforeUnmount(stopScroll);

async function infiniteScroll() {
  if (!props.disabled) {
    const documentElement = document.documentElement;
    const scroll = documentElement.clientHeight + documentElement.scrollTop;
    if (
      scroll >= documentElement.scrollHeight - props.distance &&
      ready.value
    ) {
      ready.value = false;
      emits("paginate");
      await sleep(props.delay);
      ready.value = true;
    }
  }
}
</script>

<template>
  <div v-show="loading" class="paginate-overlay"></div>
</template>
<style scoped lang="postcss">
.paginate-overlay {
  @apply w-full h-[20rem] transition-colors fixed bottom-0 left-2/4;
  @apply transform -translate-x-2/4;

  background: linear-gradient(
    0deg,
    rgba(199, 199, 199, 0.548) 0%,
    rgba(255, 255, 255, 0) 70%
  );
}
</style>
