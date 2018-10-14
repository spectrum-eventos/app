import VueLogger from 'vuejs-logger';

// leave the export, even if you don't use it
export default ({ Vue }) => {
  Vue.use(VueLogger, { logLevel: 'debug' });
};
