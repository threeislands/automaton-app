import axiosBase from 'axios';
import * as constant from '../constant';


export default axiosBase.create({
  baseURL:constant.API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  responseType: 'json'
});