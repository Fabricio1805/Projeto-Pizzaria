import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://localhost:3001'
  baseURL: 'http://192.168.101.59:3333',
});

export {api};
