import axios from 'axios';

const apiConfig = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  headers: {
    Authorization: `Api-Key ${process.env.VUE_APP_TOKEN_API}`,
    'Content-Type': 'application/json',
  },
});

export default apiConfig;
