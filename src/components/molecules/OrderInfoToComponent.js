import React from 'react';
import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {RowComponent, Space, TextComponent} from '../atoms';
import {appColors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {buttonStyles} from '../../styles/atoms/buttonStyles';
import {ORDERTYPE} from '../../constants/orderType';
import {Link} from 'iconsax-react-native';

const OrderInfoToComponent = ({type, info}) => {
  const {
    addressTo, // địa chỉ đến ( hiển thị)
    user,
  } = info;

  const handleCheckOrderTitleType = type => {
    switch (type) {
      case ORDERTYPE.Food:
        return 'Thông tin điểm giao hàng';
      case ORDERTYPE.Transportation:
        return 'Thông tin điểm trả khách';
      case ORDERTYPE.Delivery:
        return 'Thông tin điểm giao hàng';
      case ORDERTYPE.AnotherShop:
        return 'Thông tin điểm giao hàng';
      default:
        return 'Thông tin điểm giao hàng';
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
        alignItems="center"
        justify="center"
      >
        <TextComponent
          text={handleCheckOrderTitleType(type)}
          title={true}
          size={16}
          font={fontFamilies.medium}
          flex={1}
        />
        {/* Gọi điện */}
        <TouchableOpacity
          style={[buttonStyles.shortPrimary]}
          onPress={() => Linking.openURL(`tel:${user?.phone}`)}
        >
          <TextComponent
            text={'Gọi'}
            color={appColors.white}
            font={fontFamilies.bold}
          />
        </TouchableOpacity>
      </RowComponent>
      <RowComponent>
        <TextComponent text={`• ${user?.fullName}`} />
        <Space width={12} height={10} />
        <TextComponent text="|" color={appColors.gray4} />
        <Space width={12} />
        <TextComponent text={user?.phone} />
      </RowComponent>
      <RowComponent>
        <TextComponent text={`• ${addressTo}`} />
      </RowComponent>
    </>
  );
};

const styles = StyleSheet.create({});

export default OrderInfoToComponent;
