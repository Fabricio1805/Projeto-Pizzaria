import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://localhost:3001'
  baseURL: "http://10.0.0.7:3001",
});

export {api};
