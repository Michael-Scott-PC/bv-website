import {
  CREATE_USER,
  ERROR_CREATE_USER,
  LOGIN_USER,
  ERROR_LOGIN,
  LOGOUT,
  GOOGLE_SIGN_IN,
  AUTH_ERROR,
  USER_LOADED
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  user: {},
  googleUser: {},
  confirmed: false,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        confirmed: true,
        loading: false,
        user: payload
      };
    case CREATE_USER:
    case LOGIN_USER:
      localStorage.setItem('token', payload.jwt);
      return {
        ...state,
        user: payload,
        confirmed: payload.user.confirmed,
        loading: false
      };
    case GOOGLE_SIGN_IN:
      return {
        ...state,
        googleUser: payload
      };
    case ERROR_CREATE_USER:
    case ERROR_LOGIN:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case LOGOUT:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        token: null,
        user: {},
        googleUser: {},
        confirmed: false,
        loading: false
      };
    default:
      return state;
  }
}
