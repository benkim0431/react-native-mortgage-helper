import axios from 'axios';

const baseURL = __DEV__
  ? 'http://localhost:5500/hown/public'
  : 'http://localhost:5500/hown/public';

const client = axios.create({
  baseURL,
});

export default client;
