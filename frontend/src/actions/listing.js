import axiosStrapi from '../api/axiosStrapi';
import {
  GET_FEATURED_LISTINGS,
  GET_ALL_LISTINGS,
  GET_LISTING,
  GET_LISTINGS_COUNT
} from './types';

// @route  GET /listings
// @desc   Get the most recent listing
// @access Public
// Brian and Valerie decided they would rather showcase featured listing(s) on the home
// page so this function will not be used at the moment. I'm going to keep it as it
// could still be useful for future functionality on the site.
// export const getRecentListing = () => async dispatch => {
//   try {
//     const res = await axiosStrapi.get(
//       '/listings?_sort=list_date:DESC&_limit=1'
//     );

//     dispatch({
//       type: GET_RECENT_LISTING,
//       payload: res.data[0]
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// @route GET /listings/count
// @desc Get count of all listings
// @access Public
// export const getCountOfListings = () => async dispatch => {
//   try {
//     console.log('line30');
//     const res = await axiosStrapi.get('/listings/count');
//     console.log(res);

//     dispatch({
//       type: GET_LISTINGS_COUNT,
//       payload: res.data
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// @route GET /listings
// @desc Get featured listing(s)
// @access Public
export const getFeaturedListings = () => async dispatch => {
  try {
    const res = await axiosStrapi.get('/listings?featured_eq=true');

    dispatch({
      type: GET_FEATURED_LISTINGS,
      payload: res.data
    });
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
    const resCount = await axiosStrapi.get('/listings/count');

    dispatch({
      type: GET_ALL_LISTINGS,
      payload: res.data
    });

    dispatch({
      type: GET_LISTINGS_COUNT,
      payload: resCount.data
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
