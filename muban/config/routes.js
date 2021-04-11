export default [
  {
    path: '/login',
    component: 'login/index',
    hideInMenu: true,
    headerRender: false,
    footerRender: false,
    menuRender: false,
    menuHeaderRender: false,
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: 'index',
    name: '首页',
    icon: 'home',
    access: 'abc',
  },
];
