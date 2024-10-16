import {AxiosClient} from '../../apis/AxiosClient';

export const orderStatus = {
  PENDING: 'PENDING', // Chờ xác nhận
  ACCEPTED: 'ACCEPTED', // Chờ lấy hàng
  DELIVERING: 'DELIVERING', // Đang giao hàng
  DELIVERED: 'DELIVERED', // Đã giao hàng
  CANCELED: 'CANCELED', // Đã hủy
};

const orderServices = {
  // Lấy danh sách đơn hàng
  getOrders: async data => {
    try {
      return await AxiosClient.get('/api/orders', {params: data});
    } catch (error) {
      console.error('Error during get order:', JSON.stringify(error.data));
      throw error.data;
    }
  },

  // Cập nhật trạng thái đơn hàng
  updateStatusOrder: async data => {
    try {
      return await AxiosClient.patch(`/api/orders/status`, data);
    } catch (error) {
      console.error('Error during update order:', JSON.stringify(error.data));
      throw error.data;
    }
  },
};

export default orderServices;
