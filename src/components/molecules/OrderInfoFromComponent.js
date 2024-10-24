import React from 'react';
import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ButtonComponent, RowComponent, Space, TextComponent} from '../atoms';
import {appColors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {buttonStyles} from '../../styles/atoms/buttonStyles';
import {ORDERTYPE} from '../../constants/orderType';
import {Link} from 'iconsax-react-native';
import {orderStatus} from '../../services/Order/orderServices';

const OrderInfoFromComponent = ({type, info}) => {
  const {
    status,
    addressFrom, // địa chỉ đi (hiển thị)
    store, // trong storer có user. trong user lấy phone là sdt của shop
  } = info;

  console.log('😘😘😘😘', type);

  const handleCheckOrderTitleType = type => {
    switch (type) {
      case ORDERTYPE.Food:
        return 'Thông tin shop';
      case ORDERTYPE.Transportation:
        return 'Thông tin điểm đón khách';
      case ORDERTYPE.Delivery:
        return 'Thông tin điểm lấy hàng';
      case ORDERTYPE.AnotherShop:
        return 'Thông tin shop';
      default:
        return 'Thông tin shop';
    }
  };

  return (
    <>
      <RowComponent
        styles={{
          marginTop: 5,
          borderTopWidth: 1,
          borderColor: appColors.gray1,
          paddingTop: 10,
          // backgroundColor: 'red',
          alignItems: 'center',
        }}
        alignItems="flex-start"
      >
        <TextComponent
          flex={1}
          text={handleCheckOrderTitleType(type)}
          title={true}
          size={16}
          font={fontFamilies.medium}
        />
        {/* Gọi điện */}
        <ButtonComponent
          // style={[buttonStyles.shortPrimary]}
          type={
            status === orderStatus.CANCELED || status === orderStatus.DELIVERED
              ? 'shortGray'
              : 'shortPrimary'
          }
          title="Gọi"
          isDisable={
            status === orderStatus.CANCELED || status === orderStatus.DELIVERED
              ? true
              : false
          }
          textStyle={{fontWeight: 'bold'}}
          onPress={() => Linking.openURL(`tel:${store?.user?.phone}`)}
        />
      </RowComponent>
      <RowComponent alignItems="center" styles={{flexWrap: 'wrap'}}>
        <TextComponent text={`• ${store?.name}`} styles={[styles.infoItem]} />
        <Space width={12} height={10} />
        <TextComponent text={`${store?.user?.phone}`} />
      </RowComponent>

      {/* Địa chỉ */}
      <RowComponent alignItems="center" styles={{flexWrap: 'wrap'}}>
        <TextComponent
          text={`• ${addressFrom}`}
          styles={{
            alignItems: 'center',
            paddingRight: 4,
          }}
        />
      </RowComponent>
    </>
  );
};

const styles = StyleSheet.create({
  infoItem: {
    borderColor: appColors.gray4,
    borderRightWidth: 1,
    alignItems: 'center',
    paddingRight: 4,
  },
});

export default OrderInfoFromComponent;
