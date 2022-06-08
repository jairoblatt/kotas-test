<template>
  <span class="k-skeleton"></span>
</template>

<style scoped lang="postcss">
.k-skeleton {
  @apply relative inline-block overflow-hidden;

  background-color: rgba(0, 0, 0, 0.056);
}

.k-skeleton::after {
  @apply absolute inset-0 -translate-x-full;

  background: linear-gradient(
    90deg,
    rgba(22, 21, 26, 0) 0%,
    rgba(1, 5, 17, 0.053) 44%,
    rgba(1, 5, 17, 0.052) 60%,
    rgba(22, 21, 26, 0) 100%
  );
  animation: shimmer 1.1s infinite ease-in-out;
  content: " ";
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
