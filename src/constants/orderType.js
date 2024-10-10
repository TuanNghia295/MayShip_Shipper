export const ORDERTYPE = {
  Food: 'FOOD',
  Delivery: 'DELIVERY',
  Transportation: 'TRANSPORTATION',
  AnotherShop: 'ANOTHER_SHOP',
};

export const checkOrderTypeTitle = type => {
  switch (type) {
    case 'TRANSPORTATION':
      return 'Xe ôm';
    case 'FOOD':
      return 'Giao đồ ăn';
    case 'DELIVERY':
      return 'Giao hàng hóa';
    case 'ANOTHER_SHOP':
      return 'Giao hàng cho shop';
    default:
      return 'Giao hàng hóa';
  }
};
