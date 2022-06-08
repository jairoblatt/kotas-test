import { sleep } from '@/shared';
import { useAppStoreWithout } from '@/store';
import { NETWORK_THROTTLING_DELAY } from '@/constants';
import axios from 'axios';

export const HTTPClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

const appStore = useAppStoreWithout();

HTTPClient.interceptors.request.use(async (request) => {
  if (appStore.getNetworkThrottling) {
    await sleep(NETWORK_THROTTLING_DELAY);
  }

  return request;
});
