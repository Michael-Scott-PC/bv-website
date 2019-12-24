import {
  GET_RECENT_LISTING,
  GET_ALL_LISTINGS,
  GET_LISTING
} from '../actions/types';

const initialState = {
  recentListing: {},
  listing: {},
  allListings: [],
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_RECENT_LISTING:
      return {
        ...state,
        recentListing: payload,
        loading: false
      };
    case GET_ALL_LISTINGS:
      return {
        ...state,
        allListings: payload,
        loading: false
      };
    case GET_LISTING:
      return {
        ...state,
        listing: payload,
        loading: false
      };
    default:
      return state;
  }
}
