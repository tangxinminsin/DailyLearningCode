import { defineConfig } from 'umi';
import routes from './routes';
import cssModules from './cssModules';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  define: {
    ACTIVE_PROFILE: process.env.ACTIVE_PROFILE || 'prod',
  },
  base: '/tianwen-market/',
  publicPath: '/tianwen-market/',
  routes,
  ...cssModules,
  antd: {
    dark: true,
  },
  layout: {
    name: '天问营销平台',
  },
  hash: false,
  request: false,
  dva: false,
  locale: false,
  test: false,
  helmet: false,
});
