import {AnotherShop, Delivery, Food, Transportation} from '../assets/images';

export const ORDERTYPE = {
  Food: 'FOOD',
  Delivery: 'DELIVERY',
  Transportation: 'TRANSPORTATION',
  AnotherShop: 'ANOTHER_SHOP',
};

export const checkOrderTypeTitle = type => {
  switch (type) {
    case ORDERTYPE.Transportation:
      return 'Xe ôm';
    case ORDERTYPE.Food:
      return 'Giao đồ ăn';
    case ORDERTYPE.Delivery:
      return 'Giao hàng hóa';
    case ORDERTYPE.AnotherShop:
      return 'Giao hàng cho shop';
    default:
      return 'Giao hàng hóa';
  }
};

export const checkOrderTypeIcon = type => {
  switch (type) {
    case ORDERTYPE.Food:
      return <Food />;
    case ORDERTYPE.Delivery:
      return <Delivery />;
    case ORDERTYPE.AnotherShop:
      return <AnotherShop />;
    case ORDERTYPE.Transportation:
      return <Transportation />;
    default:
      return <Delivery />;
  }
};

export const handleCheckHeaderInfoType = type => {
  switch (type) {
    case ORDERTYPE.Food:
      return 'Thanh toán cho shop: ';
    case ORDERTYPE.Transportation:
      return null;
    case ORDERTYPE.Delivery:
      return null;
    case ORDERTYPE.AnotherShop:
      return 'Thanh toán cho shop: ';
    default:
      return 'Thanh toán cho shop: ';
  }
};

export const handleCheckOrderToTitleType = type => {
  switch (type) {
    case ORDERTYPE.Food:
      return 'Địa chỉ giao hàng';
    case ORDERTYPE.Transportation:
      return 'Địa chỉ trả khách';
    case ORDERTYPE.Delivery:
      return 'Địa chỉ giao hàng';
    case ORDERTYPE.AnotherShop:
      return 'Địa chỉ giao hàng';
    default:
      return 'Thông tin điểm giao hàng';
  }
};

export const handleCheckOrderFromTitleType = type => {
  switch (type) {
    case ORDERTYPE.Food:
      return 'Địa chỉ shop';
    case ORDERTYPE.Transportation:
      return 'Địa chỉ đón khách';
    case ORDERTYPE.Delivery:
      return 'Địa chỉ lấy hàng';
    case ORDERTYPE.AnotherShop:
      return 'Địa chỉ shop';
    default:
      return 'Thông tin shop';
  }
};
