import {AxiosClient} from '../../apis/AxiosClient';

export const loginServices = async data => {
  try {
    return await AxiosClient.post('/api/delivers/login', data);
  } catch (error) {
    // console.error('Error during login:', error.data);
    throw error.data;
  }
};
