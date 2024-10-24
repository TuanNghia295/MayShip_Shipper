import {AxiosClient} from '../../apis/AxiosClient';

const ShipperServices = {
  // Lấy thông tin shipper hiện tại
  infoShipper: async () => {
    try {
      return await AxiosClient.get('/api/delivers/info');
    } catch (error) {
      console.log('Error during get infoShipper: ', error);
    }
  },

  //Cập nhật thông tin shipper
  updateShipper: async data => {
    try {
      return await AxiosClient.patch('api/delivers/my', data);
    } catch (error) {
      console.log('Error during updateShipper: ', error);
    }
  },

  // Xóa tài khoản shipper
  deleteShipper: async () => {
    try {
      return await AxiosClient.patch('/api/delivers/delete/my');
    } catch (error) {
      console.log('Error during deleteShipper: ', error);
    }
  },
};

export default ShipperServices;
