import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:1337'
    : '157.245.14.110:1337';

export default axios.create({
  baseURL: `${baseURL}`
});
