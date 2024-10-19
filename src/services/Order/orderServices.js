import {AxiosClient} from '../../apis/AxiosClient';

export const orderStatus = {
  PENDING: 'PENDING', // Chờ xác nhận
  ACCEPTED: 'ACCEPTED', // Chờ lấy hàng
  DELIVERING: 'DELIVERING', // Đang giao hàng
  DELIVERED: 'DELIVERED', // Đã giao hàng
  CANCELED: 'CANCELED', // Đã hủy
};

const orderServices = {
  // Lấy danh sách đơn hàng có thể nhận
  getOrders: async () => {
    try {
      return await AxiosClient.get('/api/delivers/my-orders');
    } catch (error) {
      console.error('Error during get order:', JSON.stringify(error.data));
      throw error.data;
    }
  },

  // Lấy danh sách đơn hàng hiện tại
  getCurrentOrders: async () => {
    try {
      return await AxiosClient.get('/api/delivers/list-orders');
    } catch (error) {
      console.error(
        'Error during get current order:',
        JSON.stringify(error.data),
      );
      throw error.data;
    }
  },

  // Cập nhật trạng thái đơn hàng
  updateStatusOrder: async data => {
    try {
      return await AxiosClient.patch(`/api/delivers/order/status/`, data);
    } catch (error) {
      console.error('Error during update order:', JSON.stringify(error.data));
      throw error.data;
    }
  },

  // Chấp nhận đơn hàng
  acceptOrder: async data => {
    try {
      return await AxiosClient.patch(`/api/delivers/order/take/`, data);
    } catch (error) {
      console.error('Error during accept order:', JSON.stringify(error.data));
      throw error.data;
    }
  },
};

export default orderServices;
