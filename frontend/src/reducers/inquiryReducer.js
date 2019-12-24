import { POST_INQUIRY } from '../actions/types';

const initialState = {
  inquiry: {},
  sent: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case POST_INQUIRY:
      return {
        ...state,
        inquiry: payload,
        sent: true
      };
    default:
      return state;
  }
}
