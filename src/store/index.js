import Vue from 'vue';
import Vuex from 'vuex';

import event from './event';
import list from './list';
import presence from './presence';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      event,
      list,
      presence,
    },
  });

  return Store;
}
