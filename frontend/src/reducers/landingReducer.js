import { GET_LANDING_IMG } from '../actions/types';

const initialState = {
  landing: '',
  description: '',
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LANDING_IMG:
      return {
        ...state,
        landing: payload,
        loading: false
      };
    default:
      return state;
  }
}
