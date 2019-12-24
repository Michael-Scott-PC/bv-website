import { GET_BRIAN, GET_REALTORS, GET_BRIAN_HEADSHOT } from '../actions/types';

const initialState = {
  brian: [],
  brian_headshot_url: '',
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
    case GET_BRIAN_HEADSHOT:
      return {
        ...state,
        brian_headshot_url: payload,
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
