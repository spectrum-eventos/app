import axios from 'axios';
import VueAxios from 'vue-axios';

export default ({ Vue }) => {
  Vue.use(VueAxios, axios);
  Vue.axios.defaults.baseURL = process.env.BASE_URL;
  Vue.prototype.$axios = axios;
};
