import axiosBase from 'axios';
import * as Constant from '../constant';


export default axiosBase.create({
  baseURL: Constant.API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  responseType: 'json'
});
