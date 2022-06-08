import type { Numerishi } from '@/types';

export function sleep(ms: Numerishi) {
  return new Promise((resolve) => {
    setTimeout(resolve, Number(ms));
  });
}
