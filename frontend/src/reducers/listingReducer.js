import {
  GET_ALL_LISTINGS,
  GET_LISTING,
  GET_FEATURED_LISTINGS,
  GET_LISTINGS_COUNT
} from '../actions/types';

const initialState = {
  featuredListings: [],
  listing: {},
  allListings: [],
  listingsCount: null,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FEATURED_LISTINGS:
      return {
        ...state,
        featuredListings: payload,
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
    case GET_LISTINGS_COUNT:
      return {
        ...state,
        listingsCount: payload,
        loading: false
      };
    default:
      return state;
  }
}
