
const routes = [
  {
    path: '/login',
    meta: { auth: false },
    component: () => import('pages/login/index'),
  },
  {
    path: '/',
    meta: { auth: true },
    component: () => import('pages/home/index'),
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
