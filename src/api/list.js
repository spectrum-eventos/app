import Vue from 'vue';

export default {
  getAll: params => Vue.prototype.$axios.get('/lists', { params }),
  get: id => Vue.prototype.$axios.get(`/lists/${id}`),
  create: list => Vue.prototype.$axios.post('/lists', list),
  update: (id, list) => Vue.prototype.$axios.put(`/lists/${id}`, list),
  delete: id => Vue.prototype.$axios.delete(`/lists/${id}`),
};
