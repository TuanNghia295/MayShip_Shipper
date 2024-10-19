export const progressButtonTitle = step => {
  switch (step) {
    case 'PENDDING':
      return 'Đã nhận đơn';
    case 'ACCEPTED':
      return 'Đã lấy đơn hàng';
    case 'DELIVERING':
      return 'Đã giao thành công';
    case 'DELIVERED':
      return 'Đơn đã hoàn thành';
    case 'CANCELED':
      return 'Đơn hàng đã bị hủy';
    default:
      return 'Đã lấy đơn hàng';
  }
};
// 403: Tài khoản của bạn đã bị khóa. Vui lòng liên hệ đến admin để được mở lại tài khoản.
// 401: Sai tài khoản mật khẩu
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

export const modalMessages = {
  blockLogin: {
    title: 'Không đăng nhập được',
    descripttion:
      'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ đến admin để được mở lại tài khoản.',
  },
  cancelOrder: {
    title: 'Hủy đơn hàng',
    descripttion: 'Bạn có chắc chắn muốn hủy đơn hàng này không?',
    okTitle: 'Hủy',
    cancelTitle: 'Không',
  },
  cancelOrderSuccess: {
    title: 'Hủy đơn hàng',
    descripttion: 'Hủy đơn hàng thành công',
    okTitle: 'Đóng',
  },
  cancelOrderFail: {
    title: 'Hủy đơn hàng',
    descripttion: 'Hủy đơn hàng thất bại',
    okTitle: 'Đóng',
  },
  cancelOrderReason: {
    title: 'Lý do hủy đơn hàng',
    descripttion: 'Vui lòng nhập lý do hủy đơn hàng',
  },
  cancelOrderReasonSuccess: {
    title: 'Hủy đơn hàng',
    descripttion: 'Hủy đơn hàng thành công',
  },
  cancelOrderReasonFail: {
    title: 'Hủy đơn hàng',
    descripttion: 'Hủy đơn hàng thất bại',
  },
};
