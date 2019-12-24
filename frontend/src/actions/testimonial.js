import { GET_TESTIMONIALS } from './types';
import axios from '../api/axiosStrapi';

export const getTestimonials = () => async dispatch => {
  try {
    const res = await axios.get('/testimonials');

    dispatch({
      type: GET_TESTIMONIALS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};
