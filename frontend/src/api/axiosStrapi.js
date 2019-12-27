import axios from 'axios';

const baseURL = '157.245.14.110:1337';

export default axios.create({
  baseURL: `${baseURL}`
});
