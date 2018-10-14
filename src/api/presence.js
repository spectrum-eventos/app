import Vue from 'vue';

export default {
  getAll: params => Vue.prototype.$axios.get('/presences', { params }),
  get: id => Vue.prototype.$axios.get(`/presences/${id}`),
  create: presence => Vue.prototype.$axios.post('/presences', presence),
  update: (id, presence) => Vue.prototype.$axios.put(`/presences/${id}`, presence),
  delete: id => Vue.prototype.$axios.delete(`/presences/${id}`),
};
