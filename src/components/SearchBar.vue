<script setup lang="ts">
import X from "@/assets/svg/x.svg?component";
import Search from "@/assets/svg/search.svg?component";

interface Props {
  modelValue: string;
  debounce?: number;
}

interface Emits {
  (event: "update:modelValue", payload: string): void;
}

const emits = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  debounce: 250,
});

let timeout = 0;
const model = computed({
  get: () => props.modelValue,
  set: (payload: string) => {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      emits("update:modelValue", payload);
    }, props.debounce);
  },
});

function onClick() {
  emits("update:modelValue", "");
}
</script>
<template>
  <div class="search-bar">
    <input v-bind="$attrs" v-model.trim="model" />

    <div class="search-bar__action">
      <transition name="fade" mode="out-in">
        <X
          v-if="model"
          height="29"
          width="29"
          class="search-bar__action__clear"
          @click.self="onClick"
        />
        <Search v-else height="19" width="19" />
      </transition>
    </div>
  </div>
</template>
<style scoped lang="postcss">
.search-bar {
  @apply relative;
}

.search-bar input {
  @apply bg-white rounded-full py-3.5 pr-12 pl-8 w-full;
  @apply border border-gray-200;
}

.search-bar__action {
  @apply absolute top-1/2 right-8 -translate-y-1/2;
}

.search-bar__action__clear {
  @apply hover:bg-gray-100 p-1.5 cursor-pointer transition-colors rounded-full;
}
</style>
