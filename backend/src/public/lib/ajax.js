import axios from 'axios';
import { API_PREFIX } from '../../config';
import { message } from 'antd';
import history from './history';


/**
 * 基于axios的ajax
 * @param {string} url
 * @param {string} method
 * @param {object} data
 */
export default function ajax(url, method = 'get', data= {}) {
  url = API_PREFIX + url;
  return axios({
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: true,
    method,
    url,
    [method === 'get' ? 'params' : 'data']: data
  })
  .then(response => response.data)
  .then(response => {
    if (response.status === 200) {
      return response.data;
    } else {
      message.error(response.message);
      // 重新登录处理
      if (response.status === 598) {
        history.push('/login');
      }
    }
  });
}