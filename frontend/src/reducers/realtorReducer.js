import { GET_BRIAN, GET_REALTORS } from '../actions/types';

const initialState = {
  brian: [],
  realtors: [],
  loading: true,
  errors: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BRIAN:
      return {
        ...state,
        brian: payload,
        loading: false
      };
    case GET_REALTORS:
      return {
        ...state,
        realtors: payload,
        loading: false
      };
    default:
      return state;
  }
}
