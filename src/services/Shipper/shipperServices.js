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
      return await AxiosClient.patch('/api/delivers', data);
    } catch (error) {
      console.log('Error during updateShipper: ', error);
    }
  },
};

export default ShipperServices;
