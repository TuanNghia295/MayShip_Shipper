import {AxiosClient} from '../../apis/AxiosClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginServices = {
  login: async data => {
    try {
      return await AxiosClient.post('/api/delivers/login', data);
    } catch (error) {
      // console.error('Error during login:', error.data);
      throw error.data;
    }
  },

  refreshToken: async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('shipper_refresh_token');
      const response = await AxiosClient.post('/api/delivers/refresh', {
        refreshToken: refreshToken,
      });
      console.log('response 😘', response);
      const {accessToken, refreshToken: newRefreshToken} = response.data;
      await AsyncStorage.setItem('shipper_token', accessToken);
      await AsyncStorage.setItem('shipper_refresh_token', newRefreshToken);
      return accessToken;
    } catch (error) {
      console.log('Error refreshing token', error);
      throw error;
    }
  },
};
