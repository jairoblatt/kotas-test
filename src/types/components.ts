import type { Fn } from ".";

export interface ProgressBarExpose {
  hide: Fn;
  fail: Fn;
  start: Fn;
  pause: Fn;
  finish: Fn;
  get: Fn<number>;
  set: (num: number) => void;
  increase: (num: number) => void;
  decrease: (num: number) => void;
}
