import Vue from 'vue';

export default {
  getAll: params => Vue.prototype.$axios.get('/events', { params }),
  get: id => Vue.prototype.$axios.get(`/events/${id}`),
  create: event => Vue.prototype.$axios.post('/events', event),
  update: (id, event) => Vue.prototype.$axios.put(`/events/${id}`, event),
  delete: id => Vue.prototype.$axios.delete(`/events/${id}`),
};
