import axios from 'axios';

const baseURL = __DEV__
  ? 'http://hown-backend.onrender.com/hown'
  : 'http://hown-backend.onrender.com/hown';

const client = axios.create({
  baseURL,
});

export function applyToken(jwt) {
  //client.defaults.headers.Authorization = `Bearer ${jwt}`;
  client.defaults.headers.common['x-access-token'] = jwt;
}

export function clearToken() {
  // client.defaults.headers.Authorization = undefined;
  client.defaults.headers.common['x-access-token'] = undefined;
}

export default client;
