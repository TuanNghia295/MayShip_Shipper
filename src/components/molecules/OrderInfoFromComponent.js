import React from 'react';
import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {RowComponent, Space, TextComponent} from '../atoms';
import {appColors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {buttonStyles} from '../../styles/atoms/buttonStyles';
import {ORDERTYPE} from '../../constants/orderType';

const OrderInfoFromComponent = ({type}) => {
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
          flex: 1,
          marginTop: 5,
          borderTopWidth: 1,
          borderColor: appColors.gray1,
          paddingTop: 10,
          // backgroundColor: 'red',
          alignItems: 'center',
        }}
        alignItems="flex-start">
        <TextComponent
          flex={1}
          text={handleCheckOrderTitleType(type)}
          title={true}
          size={16}
          font={fontFamilies.medium}
        />
        {/* Gọi điện */}
        <TouchableOpacity
          style={[buttonStyles.shortPrimary]}
          // onPress={() => onCallClient(clientPhone)}
          onPress={() => Linking.openURL(`tel:0969415864`)}>
          <TextComponent
            text={'Gọi'}
            color={appColors.white}
            font={fontFamilies.bold}
          />
        </TouchableOpacity>
      </RowComponent>
      <RowComponent>
        <TextComponent text="• Trần Văn B" />
        <Space width={12} height={10} />
        <TextComponent text="|" color={appColors.gray4} />
        <Space width={12} height={10} />
        <TextComponent text="09123456789" />
      </RowComponent>
      <RowComponent>
        <TextComponent text="• 1791/14 đường Bùi Hữu Nghĩa, phường Tân Hạnh ,Tp Biên Hòa, Đồng Nai" />
      </RowComponent>
    </>
  );
};

const styles = StyleSheet.create({});

export default OrderInfoFromComponent;
