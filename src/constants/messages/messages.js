export const progressButtonTitle = step => {
  switch (step) {
    case 1:
      return 'Đã nhận đơn';
    case 2:
      return 'Đã lấy đơn hàng';
    case 3:
      return 'Đã giao thành công';
    case 4:
      return 'Đơn đã hoàn thành';
    case 5:
      return 'Đơn hàng đã bị hủy';
    default:
      return 'Đã lấy đơn hàng';
  }
};

export const progressBarTitle = {
  step1: 'Đã đặt',
  step2: 'Đã nhận đơn',
  step3: 'Đã lấy đơn hàng',
  step4: 'Hoàn thành đơn',
};

export const cancelMessages = {
  cancelFood: 'Khách vừa hủy đơn giao đồ ăn.',
  cancelBike: 'Khách vừa hủy cuốc xe',
  cancelDelivery: 'Khách vừa hủy đơn giao hàng',
};
