import { POST_CONTACT, ERROR_POST_CONTACT } from '../actions/types';

const initialState = {
  contact: {},
  sent: false,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case POST_CONTACT:
      return {
        ...state,
        contact: payload,
        sent: true
      };
    case ERROR_POST_CONTACT:
      return {
        ...state,
        error: payload,
        sent: false
      };
    default:
      return state;
  }
}
