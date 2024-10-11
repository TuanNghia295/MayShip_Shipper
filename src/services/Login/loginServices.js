import {AxiosClient} from '../../apis/AxiosClient';

export const loginServices = async data => {
  try {
    return await AxiosClient.post('/api/v1/auth/deliver/login', data);
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};
