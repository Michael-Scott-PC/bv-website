import {
  CREATE_USER,
  CREATE_GOOGLE_USER,
  ERROR_CREATE_USER,
  ERROR_CREATE_GOOGLE_USER,
  LOGIN_USER,
  ERROR_LOGIN,
  LOGOUT,
  GOOGLE_SIGN_IN,
  AUTH_ERROR,
  USER_LOADED
} from './types';
import axiosStrapi from '../api/axiosStrapi';

// import setAuthToken from '../utils/setAuthToken';

import { setAlert } from './alert';
import history from '../history';

// Load User
export const loadUser = () => async dispatch => {
  const token = localStorage.token;

  try {
    const res = await axiosStrapi.get('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register user
export const createUser = values => async dispatch => {
  try {
    const res = await axiosStrapi.post('/auth/local/register', values);

    dispatch({
      type: CREATE_USER,
      payload: res.data
    });
    dispatch(setAlert('You have successfully registered!', 'success'));
    dispatch(loadUser());

    // history.push('/');
  } catch (err) {
    console.log(err.response.data.error);
    console.log(err.response.data.message[0].messages[0].message);

    dispatch({
      type: ERROR_CREATE_USER,
      payload: {
        msg: err.response.data.message,
        error: err.response.error
      }
    });

    dispatch(
      setAlert(`${err.response.data.message[0].messages[0].message}`, 'danger')
    );
  }
};

export const createGoogleUser = values => async dispatch => {
  try {
    const res = await axiosStrapi.post('/google-users', values);

    // TODO check if the google user already exists,
    // right now it's just registering every time

    dispatch({
      type: CREATE_GOOGLE_USER,
      payload: res.data
    });

    dispatch(setAlert('You have successfully registered!', 'success'));

    history.push('/');
  } catch (err) {
    console.log(err.response.data.error);
    console.log(err.response.data.message);

    dispatch({
      type: ERROR_CREATE_GOOGLE_USER,
      payload: {
        msg: err.response.data.message,
        error: err.response.error
      }
    });

    dispatch(setAlert(`${err.response.data.message}`, 'danger'));
  }
};

export const loginUser = values => async dispatch => {
  try {
    const res = await axiosStrapi.post('/auth/local', values);

    dispatch({
      type: LOGIN_USER,
      payload: res.data
    });

    dispatch(setAlert('You have successfully logged in.', 'success'));
    dispatch(loadUser());
    // history.push('/');
  } catch (err) {
    console.log(err.response);
    console.log(err.response.data.message[0].messages[0].message);

    dispatch({
      type: ERROR_LOGIN,
      payload: {
        msg: err.response.data.message,
        error: err.response.error
      }
    });

    if (
      err.response.data.message[0].messages[0].message ===
      'Identifier or password invalid.'
    ) {
      dispatch(
        setAlert(
          'Your email and/or password appears to be incorrect. Please try again.',
          'danger'
        )
      );
    }
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });

  history.push('/');
};

export const googleSignIn = res => {
  return {
    type: GOOGLE_SIGN_IN,
    payload: res
  };
};
