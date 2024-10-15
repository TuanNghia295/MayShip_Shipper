import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {RowComponent, Space, TextComponent} from '../atoms';
import {appColors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {buttonStyles} from '../../styles/atoms/buttonStyles';
import {ORDERTYPE} from '../../constants/orderType';

const OrderInfoToComponent = ({type}) => {
  const handleCheckOrderTitleType = type => {
    switch (type) {
      case ORDERTYPE.Food:
        return 'Thông tin điểm giao hàng';
      case ORDERTYPE.Transportation:
        return 'Thông tin điểm trả khách';
      case ORDERTYPE.Delivery:
        return 'Thông tin địa điểm giao hàng';
      case ORDERTYPE.AnotherShop:
        return 'Thông tin địa điểm giao hàng';
      default:
        return 'Thông tin địa điểm giao hàng';
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
        }}
        alignItems="center"
        justify="center">
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
          // onPress={() => onCallClient(clientPhone)}
        >
          <TextComponent
            text={'Gọi'}
            color={appColors.white}
            font={fontFamilies.bold}
          />
        </TouchableOpacity>
      </RowComponent>
      <RowComponent>
        <TextComponent text="• Trần Thị A" />
        <Space width={12} height={10} />
        <TextComponent text="|" color={appColors.gray4} />
        <Space width={12} />
        <TextComponent text="09123456789" />
      </RowComponent>
      <RowComponent>
        <TextComponent text="• 1791/14 đường Bùi Hữu Nghĩa, phường Tân Hạnh ,Tp Biên Hòa, Đồng Nai" />
      </RowComponent>
    </>
  );
};

const styles = StyleSheet.create({});

export default OrderInfoToComponent;
