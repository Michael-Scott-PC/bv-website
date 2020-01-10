import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.Authentication = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.Authentication['Bearer'];
  }
};

export default setAuthToken;
