import axios from 'axios';
import { setAlert } from './alert';

import {
GET_CATEGORIES,
GET_CATEGORIES_ERROR,
}
from './types';

//Get all entries for loggdin user
export const getAllCategoriesForEdit = () => async dispatch => {
  try {
    const res = await axios.get(`/api/categories`);
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_CATEGORIES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getAllCategories = async () => {
  try {
    const res = await axios.get(`/api/categories`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getMyCategories = async () => {
  try {
    const res = await axios.get(`/api/categories/me`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const editMyUserCategories = (category_id, formData) => async dispatch => {

  console.log(formData);

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post(`/api/categories/edit/${category_id}`, formData, config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}



export const newUserCategory = async (formData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post(`/api/categories/me`, formData, config);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
