import axios from 'axios';
import { setAlert } from './alert';

import {
ADD_ENTRY_SUCCESS,
END_ENTRY_SUCCESS,
EDIT_ENTRY_SUCCESS,
GET_RECENT_ENTRIES,
GET_ENTRY_ERROR,
ADD_ENTRY_ERROR,
DELETE_ENTRY,
ENTRY_ERROR }
from './types';


//Get current open entries for loggdin user
export const getRecentEntries = (limit) => async dispatch => {
  try {
    const res = await axios.get(`/api/entries/me/open/${limit}`);

    dispatch({
      type: GET_RECENT_ENTRIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ENTRY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get all entries for loggdin user
export const getAllEntries = (limit) => async dispatch => {
  try {
    const res = await axios.get(`/api/entries/me/${limit}`);

    dispatch({
      type: GET_RECENT_ENTRIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ENTRY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


export const addEntry = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post(`/api/entries`, formData, config);
    dispatch({
      type: ADD_ENTRY_SUCCESS,
      payload: res.data
    });

  } catch (err) {
    dispatch({
    type: ADD_ENTRY_ERROR,
    payload: { msg: err.response.statusText, status: err.response.status }
  });
}}

//Delete account

export const deleteEntry = entry_id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
    try {
      const res = await axios.delete(`api/entries/delete/${entry_id}`, config);
      console.log(res);
      dispatch({
        type: DELETE_ENTRY,
        payload: res.data._id
      });
      dispatch(setAlert('Entry Deleted', 'danger'));
    } catch (err) {
      dispatch({
        type: ENTRY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};

//Edit an Entry

export const editEntry = (entry_id, formData, end) => async dispatch => {

  console.log(formData);
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post(`/api/entries/edit/${entry_id}`, formData, config);
    if (end) {
      console.log(end);
    dispatch({
      type: END_ENTRY_SUCCESS,
      payload: res.data
    });
  } else {
      dispatch({
        type: EDIT_ENTRY_SUCCESS,
        payload: res.data
      });
    }
  } catch (err) {
    dispatch({
    type: ENTRY_ERROR,
    payload: { msg: err.response.statusText, status: err.response.status }
  });
}}
