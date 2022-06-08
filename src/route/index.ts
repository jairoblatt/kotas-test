import { createRouter, createWebHistory } from 'vue-router';
import { useAppStoreWithout } from '@/store';
import { NETWORK_THROTTLING_DELAY } from '@/constants';
import { sleep } from '@/shared';
import type { App } from 'vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/index.vue'),
  },
  {
    path: '/details/:name',
    name: 'details',
    component: () => import('@/pages/details.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

const appStore = useAppStoreWithout();

router.beforeEach(async () => {
  appStore.getProgressBar?.start();
  if (appStore.getNetworkThrottling) {
    await sleep(NETWORK_THROTTLING_DELAY);
  }
});

router.afterEach(() => {
  appStore.getProgressBar?.finish();
});

export function setupRoute(app: App) {
  app.use(router);
}
