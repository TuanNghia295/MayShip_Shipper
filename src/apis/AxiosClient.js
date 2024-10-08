import axios from 'axios';
import {END_POINTS} from '../constants/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import queryString from 'query-string';

const baseUrl = END_POINTS;

export const AxiosClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});

// interceptors: Người can thiệp
// ở đây axiosClient sẽ can thiệp vào request và response
AxiosClient.interceptors.request.use(
  async function (config) {
    try {
      const token = await AsyncStorage.getItem('shipper_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.log('Error request', error);
      return Promise.reject(error);
    }
  },
  function (error) {
    return Promise.reject(error);
  },
);

AxiosClient.interceptors.response.use(
  function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    if (response.data && response.status === 200) {
      return response.data;
    }
    throw new Error('Something went wrong with the response');
  },
  function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger
    console.log(`error api ${JSON.stringify(error)}`, error);
    return Promise.reject(error);
  },
);