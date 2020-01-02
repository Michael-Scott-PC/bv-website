import axios from '../api/axiosStrapi';

import { GET_BRIAN, GET_REALTORS } from './types';

// Get a specific realtor
export const getBrianInfo = () => async dispatch => {
  try {
    const res = await axios.get(`/realtors/5dfeebd0288f8159fcb1c6a8`);

    dispatch({
      type: GET_BRIAN,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

// Get all realtors
export const getRealtors = () => async dispatch => {
  try {
    const res = await axios.get('/realtors');

    dispatch({
      type: GET_REALTORS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};
