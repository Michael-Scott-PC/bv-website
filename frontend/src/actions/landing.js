import axios from "../api/axiosStrapi";
import { GET_LANDING_IMG } from "./types";

export const getLandingImage = () => async dispatch => {
  try {
    const res = await axios.get("/landings");
    console.log(res);
    dispatch({
      type: GET_LANDING_IMG,
      payload: res.data[0]
    });
  } catch (error) {
    console.log(error);
  }
};
