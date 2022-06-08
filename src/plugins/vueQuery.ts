import { VueQueryPlugin } from 'vue-query';
import type { VueQueryPluginOptions } from 'vue-query';
import type { App } from 'vue';

export function setupVueQuery(app: App) {
  const vueQueryPluginOptions: VueQueryPluginOptions = {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          cacheTime: Infinity,
          staleTime: Infinity,
          retryDelay: 1500,
          retry: 2,
          keepPreviousData: true,
          refetchOnMount: false,
          refetchOnWindowFocus: false,
        },
      },
    },
  };
  app.use(VueQueryPlugin, vueQueryPluginOptions);
}
