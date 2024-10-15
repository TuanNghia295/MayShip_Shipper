import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {orderStyle} from '../../styles/templates/orderStyle';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../atoms';
import {
  Delivery,
  Food,
  AnotherShop,
  LocationMarker,
  Transportation,
} from '../../assets/images';
import {appColors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {checkOrderTypeTitle, ORDERTYPE} from '../../constants/orderType';
const CurrentOrder = ({type, items}) => {
  const checkOrderType = type => {
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

  const handleCheckOrderFromTitleType = type => {
    switch (type) {
      case ORDERTYPE.Food:
        return 'Địa chỉ shop';
      case ORDERTYPE.Transportation:
        return 'Địa chỉ đón khách';
      case ORDERTYPE.Delivery:
        return 'Địa chỉ lấy hàng';
      case ORDERTYPE.AnotherShop:
        return 'Địa shop';
      default:
        return 'Thông tin shop';
    }
  };

  const handleCheckOrderToTitleType = type => {
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
        return 'Thông tin địa điểm giao hàng';
    }
  };

  // const {distance} = items;

  return (
    <SectionComponent styles={[orderStyle.container]}>
      {/* Header */}
      <RowComponent>
        {checkOrderType(type)}
        <RowComponent
          flexDirection="column"
          styles={{marginLeft: 15}}
          alignItems="flex-start">
          <TextComponent
            font={fontFamilies.medium}
            size={16}
            text={checkOrderTypeTitle(type)}
          />
          <RowComponent alignItems="flex-start">
            <LocationMarker />
            <TextComponent text={`12.5 km`} />
          </RowComponent>
        </RowComponent>
      </RowComponent>

      {/* Gía trị đơn hàng và thu nhập */}
      <RowComponent>
        <TextComponent text="Giá trị đơn hàng: " />
        <TextComponent font={fontFamilies.bold} text="215.0000đ" />
      </RowComponent>
      <RowComponent>
        <TextComponent text={`Thu nhập: `} />
        <TextComponent font={fontFamilies.bold} text="215.0000đ" />
      </RowComponent>

      {/* Body */}
      <RowComponent
        flexDirection="column"
        alignItems="flex-start"
        styles={{
          marginTop: 5,
          borderTopWidth: 1,
          borderColor: appColors.gray1,
        }}>
        <RowComponent
          flexDirection="column"
          alignItems="flex-start"
          styles={{marginTop: 10}}>
          <TextComponent
            title={true}
            size={16}
            font={fontFamilies.medium}
            text={handleCheckOrderFromTitleType(type)}
            styles={{marginBottom: 5}}
          />
          <TextComponent
            styles={{paddingLeft: 10}}
            text={`• C57B - KP5 - P.Bửu Long ,Tp Biên Hòa, Đồng Nai`}
          />
        </RowComponent>

        <RowComponent
          flexDirection="column"
          alignItems="flex-start"
          styles={{marginTop: 10}}>
          <TextComponent
            title={true}
            size={16}
            font={fontFamilies.medium}
            text={handleCheckOrderToTitleType(type)}
            styles={{marginBottom: 5}}
          />
          <TextComponent
            styles={{paddingLeft: 10}}
            text={`• C57B - KP5 - P.Bửu Long ,Tp Biên Hòa, Đồng Nai`}
          />
        </RowComponent>
      </RowComponent>

      {/* Thông tin đơn hàng */}
      {type === 'DELIVERY' && (
        <RowComponent
          flexDirection="column"
          alignItems="flex-start"
          styles={{
            marginTop: 5,
            borderTopWidth: 1,
            borderColor: appColors.gray1,
            paddingTop: 10,
          }}>
          <TextComponent
            title={true}
            font={fontFamilies.medium}
            text={'Thông tin đơn hàng'}
            styles={{marginBottom: 5}}
          />

          <RowComponent>
            <InputComponent
              disbaled={true}
              value={
                'Mua dùm 2 kí thịt heo, 2 chai nước ngọt, 3 lạng ức gà, 1 hộp bánh mì,  người ta gọi tao là lộc phụ hồ'
              }
              flexible={true}
            />
          </RowComponent>
        </RowComponent>
      )}

      {/* Buttons */}
      <RowComponent
        alignItems="center"
        justify="center"
        styles={{
          marginTop: 5,
          borderTopWidth: 1,
          borderColor: appColors.gray1,
          paddingTop: 10,
        }}>
        <ButtonComponent
          type="shortOutline"
          title="Từ chối"
          textStyle={{fontFamily: fontFamilies.medium}}
        />
        <ButtonComponent type="shortPrimary" title="Chấp nhận" />
      </RowComponent>
    </SectionComponent>
  );
};

const styles = StyleSheet.create({});

export default CurrentOrder;
