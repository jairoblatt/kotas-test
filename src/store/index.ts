import { createPinia } from "pinia";
import { useAppStoreWithout, useAppStore } from "./modules/app";
import type { App } from "vue";

export const store = createPinia();

export function setupPinia(app: App) {
  return app.use(store);
}

export { useAppStoreWithout, useAppStore };
