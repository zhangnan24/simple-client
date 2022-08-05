import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/ControllerManagement' },
  ],
  fastRefresh: {},
  
  define: {
    API_URL: 'http://110.42.172.19:7001',
  },
});
