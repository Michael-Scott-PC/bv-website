import axios from "../api/axiosStrapi";

import { GET_BRIAN, GET_REALTORS, GET_BRIAN_HEADSHOT } from "./types";

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
    const res = await axios.get("/realtors");

    dispatch({
      type: GET_REALTORS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

// Get Brian's headshot object
export const getHeadshot = () => async dispatch => {
  try {
    const res = await axios.get(
      `uploads/9ae3868c4a9d474daf79d3df5ce73993.jpeg`
    );

    // console.log(res);

    dispatch({
      type: GET_BRIAN_HEADSHOT,
      payload: res.config.url
    });
  } catch (error) {
    console.log(error);
  }
};
