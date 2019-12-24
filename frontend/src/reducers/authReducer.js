import { CREATE_USER, ERROR_CREATE_USER, LOGIN_USER, ERROR_LOGIN, LOGOUT, GOOGLE_SIGN_IN } from '../actions/types';

const initialState = {
  jwt: null,
  user: {},
  googleUser: {},
  confirmed: false,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_USER:
    case LOGIN_USER:
      return {
        ...state,
        jwt: payload.jwt,
        user: payload,
        confirmed: payload.user.confirmed,
        loading: false
      };
    case GOOGLE_SIGN_IN:
      return {
        ...state,
        googleUser: payload
      }
    case ERROR_CREATE_USER:
    case ERROR_LOGIN:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case LOGOUT:
      return {
        jwt: null,
        user: {},
        googleUser: {},
        confirmed: false,
        loading: false
      }
    default:
      return state;
  }
}
