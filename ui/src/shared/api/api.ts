import axios from 'axios';
import { baseURL, TIMEOUT } from './config/apiConfig';

export const $api = axios.create({
  baseURL,
  timeout: TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
});
