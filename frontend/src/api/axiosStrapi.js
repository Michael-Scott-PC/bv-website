import axios from 'axios';

const apiURL = 'https://homessoldbybrian.com';

export default axios.create({
  baseURL: `${apiURL}`
});
