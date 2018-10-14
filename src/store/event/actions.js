import Vue from 'vue';

import eventApi from '../../api/event';

export const getAllEvents = async ({ commit }, page) => {
  try {
    const { data } = await eventApi.getAll(page);
    const { records, pagination } = data;
    commit('SET_EVENTS', records);
    return pagination;
  } catch (err) {
    Vue.$log.error(err);
    throw err;
  }
};

export const getEvent = async (_, id) => {
  try {
    const { data } = await eventApi.get(id);
    return data;
  } catch (err) {
    Vue.$log.error(err);
    throw err;
  }
};

export const createEvent = async (_, event) => {
  try {
    await eventApi.create(event);
  } catch (err) {
    Vue.$log.error(err);
    throw err;
  }
};

export const updateEvent = async (_, { id, event }) => {
  try {
    await eventApi.update(id, event);
  } catch (err) {
    Vue.$log.error(err);
    throw err;
  }
};

export const deleteEvent = async (_, id) => {
  try {
    const { data } = await eventApi.delete(id);
    return data;
  } catch (err) {
    Vue.$log.error(err);
    throw err;
  }
};

export const approveEvent = async (_, id) => {
  try {
    const { data } = await eventApi.approve(id);
    return data;
  } catch (err) {
    Vue.$log.error(err);
    throw err;
  }
};

export const rejectEvent = async (_, id) => {
  try {
    const { data } = await eventApi.reject(id);
    return data;
  } catch (err) {
    Vue.$log.error(err);
    throw err;
  }
};
