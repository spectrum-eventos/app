import Vue from 'vue';

import listApi from '../../api/list';

export const getAllLists = async ({ commit }, page) => {
  try {
    const { data } = await listApi.getAll(page);
    const { records, pagination } = data;
    commit('SET_LISTS', records);
    return pagination;
  } catch (err) {
    Vue.$log.error(err);
    throw err;
  }
};

export const getList = async (_, id) => listApi.get(id);

export const createList = async (_, list) => {
  try {
    await listApi.create(list);
  } catch (err) {
    Vue.$log.error(err);
    throw err;
  }
};

export const updateList = async (_, { id, list }) => {
  try {
    await listApi.update(id, list);
  } catch (err) {
    Vue.$log.error(err);
    throw err;
  }
};

export const deleteList = async (_, id) => {
  try {
    const { data } = await listApi.delete(id);
    return data;
  } catch (err) {
    Vue.$log.error(err);
    throw err;
  }
};

export const approveList = async (_, id) => {
  try {
    const { data } = await listApi.approve(id);
    return data;
  } catch (err) {
    Vue.$log.error(err);
    throw err;
  }
};

export const rejectList = async (_, id) => {
  try {
    const { data } = await listApi.reject(id);
    return data;
  } catch (err) {
    Vue.$log.error(err);
    throw err;
  }
};
