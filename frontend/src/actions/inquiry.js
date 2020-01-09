import axiosStrapi from '../api/axiosStrapi';
import { POST_INQUIRY } from './types';

export const createInquiry = values => async dispatch => {
  try {
    const res = await axiosStrapi.post('/inquiries', values);
    dispatch({
      type: POST_INQUIRY,
      payload: res.data
    });

    // dispatch(setAlert('Inquiry Received', 'success'));
  } catch (error) {
    console.log(error);
  }
};
