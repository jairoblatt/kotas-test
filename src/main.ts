/// <reference types="vite-svg-loader" />
import { createApp } from 'vue';
import App from './App.vue';
import { setupRoute } from './route';
import { setupPinia } from './store';
import { setupVueQuery } from '@/plugins';

import './assets/css/tailwind.css';
import './assets/css/transition.css';
import './assets/css/main.css';

const app = createApp(App);
setupRoute(app);
setupPinia(app);
setupVueQuery(app);
app.mount('#app');
