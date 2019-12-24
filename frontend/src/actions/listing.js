import axiosStrapi from '../api/axiosStrapi';
import { GET_RECENT_LISTING, GET_ALL_LISTINGS, GET_LISTING } from './types';

// @route  GET /listings
// @desc   Get the most recent listing
// @access Public
export const getRecentListing = () => async dispatch => {
  try {
    const res = await axiosStrapi.get(
      '/listings?_sort=list_date:DESC&_limit=1'
    );

    dispatch({
      type: GET_RECENT_LISTING,
      payload: res.data[0]
    });
    // console.log(res.data[0]);
  } catch (error) {
    console.log(error);
  }
};

// @route  GET /listings
// @desc   Get all listings
// @access Public
export const getAllListings = () => async dispatch => {
  try {
    const res = await axiosStrapi.get('/listings?publish_eq=true');

    dispatch({
      type: GET_ALL_LISTINGS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

//@route  GET listing/:id
//@desc   Get specific listing detail
//@access Public
export const getListing = id => async dispatch => {
  try {
    const res = await axiosStrapi.get(`listings/${id}`);

    dispatch({
      type: GET_LISTING,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};
