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
  updateStatusOrder: async ({orderId, status, reason = ''}) => {
    try {
      // Kiểm tra tính hợp lệ của orderId và status
      if (typeof orderId !== 'number') {
        throw new Error('orderId must be a number');
      }

      const validStatuses = Object.values(orderStatus);
      if (!validStatuses.includes(status)) {
        throw new Error(
          `status must be one of the following values: ${validStatuses.join(
            ', ',
          )}`,
        );
      }

      // Gửi yêu cầu cập nhật trạng thái đơn hàng
      const url = `/api/delivers/order/status/${orderId}/${status}`;
      const data = status === orderStatus.CANCELED ? {reason} : {};

      const response = await AxiosClient.patch(url, data);

      return response.data;
    } catch (error) {
      console.error(
        'Error during update order:',
        JSON.stringify(error.response?.data || error.message),
      );
      throw error.response?.data || error.message;
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
