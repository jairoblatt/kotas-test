<script lang="ts">
export default {
  name: "ProgressBar",
};
</script>
<script setup lang="ts">
import type { Nullable } from "../types";

const state = reactive({
  percent: 20,
  show: false,
  canSuccess: true,
  duration: 3000,
  height: "4px",
  color: "#4F46E5",
  failedColor: "#c80839",
  _timer: 0 as Nullable<number>,
  _cut: 0,
});

function start() {
  state.show = true;
  state.canSuccess = true;
  if (state._timer) {
    clearInterval(state._timer);
    state.percent = 0;
  }
  state._cut = 10000 / Math.floor(state.duration);
  state._timer = window.setInterval(() => {
    increase(state._cut * Math.random());
    state.percent > 95 && finish();
  }, 100);
}

function set(num: number) {
  state.show = true;
  state.canSuccess = true;
  state.percent = Math.floor(num);
}

function get() {
  return Math.floor(state.percent);
}

function increase(num: number) {
  state.percent = state.percent + Math.floor(num);
}

function decrease(num: number) {
  state.percent = state.percent - Math.floor(num);
}

function finish() {
  state.percent = 100;
  hide();
}

function pause() {
  clearInterval(state._timer!);
}

function hide() {
  clearInterval(state._timer!);
  state._timer = null;
  setTimeout(() => {
    state.show = false;
    setTimeout(() => {
      state.percent = 0;
    }, 200);
  }, 500);
}

function fail() {
  state.canSuccess = false;
}

defineExpose({
  fail,
  hide,
  increase,
  decrease,
  get,
  set,
  start,
  pause,
  finish,
});
</script>
<template>
  <div
    class="progress-bar"
    :style="{
      width: `${state.percent}%`,
      height: state.height,
      opacity: state.show ? 1 : 0,
      'background-color': state.canSuccess ? state.color : state.failedColor,
    }"
  ></div>
</template>
<style lang="postcss" scoped>
.progress-bar {
  @apply fixed inset-0 w-0 opacity-100;

  transition: width 0.2s, opacity 0.2s;
  z-index: 90;
  border-radius: 10px;
}
</style>
