//  hàm xử lý số thành đơn vị tiền tệ
export const toPrice = price => {
  return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') || 10;
};
