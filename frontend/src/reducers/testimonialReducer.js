import { GET_TESTIMONIALS } from '../actions/types';

const initialState = {
  testimonials: [],
  loading: true,
  errors: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TESTIMONIALS:
      return {
        ...state,
        testimonials: payload,
        loading: false
      };
    default:
      return state;
  }
}
