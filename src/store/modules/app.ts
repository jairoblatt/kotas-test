import { defineStore } from 'pinia';
import { store } from '..';
import type { Nullable, ProgressBarExpose } from '@/types';

export interface AppState {
  progressBar: Nullable<ProgressBarExpose>;
  networkThrottling: boolean;
}

const useAppStore = defineStore('app', {
  state: (): AppState => ({
    progressBar: null,
    networkThrottling: false,
  }),

  getters: {
    getProgressBar: ({ progressBar }) => progressBar,
    getNetworkThrottling: ({ networkThrottling }) => networkThrottling,
  },

  actions: {
    setProgressBarRef(progressBar: Nullable<ProgressBarExpose>) {
      this.progressBar = progressBar;
    },

    setNetworkThrottling(networkThrottling: boolean) {
      this.networkThrottling = networkThrottling;
    },
  },
});

function useAppStoreWithout() {
  return useAppStore(store);
}

export { useAppStore, useAppStoreWithout };
