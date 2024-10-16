import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import {AxiosClient} from '../../apis/AxiosClient';

export const oderServices = () => {
  // Lấy danh sách đơn hàng
  getOrders: async data => {
    try {
      return await AxiosClient.get('/api/orders', data);
    } catch (error) {
      console.error('Error during get order:', error.data);
      throw error.data;
    }
  };
};
