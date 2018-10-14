import Vue from 'vue';

import presenceApi from '../../api/presence';

export const getAllPresences = async ({ commit }, page) => {
  try {
    const { data } = await presenceApi.getAll(page);
    const { records, pagination } = data;
    commit('SET_PRESENCES', records);
    return pagination;
  } catch (err) {
    Vue.$log.error(err);
    throw err;
  }
};

export const getPresence = async (_, id) => {
  try {
    const { data } = await presenceApi.get(id);
    return data;
  } catch (err) {
    Vue.$log.error(err);
    throw err;
  }
};

export const createPresence = async (_, presence) => presenceApi.create(presence);

export const updatePresence = async (_, { id, presence }) => {
  try {
    await presenceApi.update(id, presence);
  } catch (err) {
    Vue.$log.error(err);
    throw err;
  }
};

export const deletePresence = async (_, id) => {
  try {
    const { data } = await presenceApi.delete(id);
    return data;
  } catch (err) {
    Vue.$log.error(err);
    throw err;
  }
};

export const approvePresence = async (_, id) => {
  try {
    const { data } = await presenceApi.approve(id);
    return data;
  } catch (err) {
    Vue.$log.error(err);
    throw err;
  }
};

export const rejectPresence = async (_, id) => {
  try {
    const { data } = await presenceApi.reject(id);
    return data;
  } catch (err) {
    Vue.$log.error(err);
    throw err;
  }
};
