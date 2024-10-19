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
  // PENDING
  // ACCEPTED
  // DELIVERING
  // DELIVERED
  // CANCELED

  updateStatusOrder: async ({orderId, status, reason = ''}) => {
    try {
      if (status === orderStatus.CANCELED) {
        return await AxiosClient.patch(
          `/api/delivers/order/status/${orderId}/${status}`,
          {reason},
        );
      }
      return await AxiosClient.patch(
        `/api/delivers/order/status/${orderId}/${status}`,
      );
    } catch (error) {
      console.error('Error during update order:', JSON.stringify(error.data));
      throw error.data;
    }
  },

  // Chấp nhận đơn hàng
  acceptOrder: async ({orderId, type}) => {
    try {
      return await AxiosClient.patch(
        `/api/delivers/order/take/${orderId}/${type}`,
      );
    } catch (error) {
      console.log('Error during accept order:', JSON.stringify(error.data));
      throw error.data;
    }
  },
};

export default orderServices;
