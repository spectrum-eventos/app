import VueAuth from '@websanova/vue-auth';

const auth = require('@websanova/vue-auth/drivers/auth/devise.js');
const http = require('@websanova/vue-auth/drivers/http/axios.1.x.js');
const routerDriver = require('@websanova/vue-auth/drivers/router/vue-router.2.x.js');

const registerData = { url: 'auth/admin/', redirect: '/' };
const loginData = { url: 'auth/admin/sign_in', redirect: '/' };
const logoutData = { url: 'auth/admin/sign_out', redirect: '/login' };
const notFoundRedirect = { path: '/' };
const authRedirect = { path: '/login' };
const refreshData = { url: '/auth/admin/validate_token', method: 'GET', enabled: true };
const fetchData = { url: '/auth/admin/validate_token', method: 'GET', enabled: true };

export default ({ Vue, router }) => {
  Vue.router = router;

  Vue.use(VueAuth, {
    auth,
    http,
    router: routerDriver,
    registerData,
    loginData,
    logoutData,
    notFoundRedirect,
    authRedirect,
    refreshData,
    fetchData,
    rolesVar: 'role',
  });
};
