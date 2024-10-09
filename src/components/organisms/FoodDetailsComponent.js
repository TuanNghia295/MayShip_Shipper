import React, {useState} from 'react';
import {ImageBase, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ButtonComponent, RowComponent, Space, TextComponent} from '../atoms';
import {fontFamilies} from '../../constants/fontFamilies';
import {appColors} from '../../constants/colors';
import {buttonStyles} from '../../styles/atoms/buttonStyles';
import {ArrowDown, ArrowUp} from '../../assets/images';
import {SvgUri} from 'react-native-svg';
import {OrderInfoFromComponent} from '../molecules';
import OrderInfoToComponent from '../molecules/OrderInfoToComponent';

const FoodDetailsComponent = () => {
  const onCallClient = clientPhone => {};
  const [isShowListItems, setIsShowListItems] = useState(true);
  return (
    <>
      {/* Thông tin chi tiết shop */}
      <OrderInfoFromComponent type="DELIVERY" />

      {/* Thông tin đơn hàng */}
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
          text={`Thông tin đơn hàng`}
          title={true}
          font={fontFamilies.medium}
          styles={{flex: 1}}
        />
        <ButtonComponent
          onPress={() => setIsShowListItems(!isShowListItems)}
          icon={isShowListItems ? <ArrowUp /> : <ArrowDown />}
          iconFlex="right"
          type="empty"
        />
      </RowComponent>

      {/* Danh sách đơn hàng */}
      {isShowListItems && (
        <>
          <RowComponent
            styles={{
              flex: 1,
              height: 90,
              padding: 10,
            }}>
            {/* Ảnh món */}
            <RowComponent alignItems="flex-start">
              <TextComponent
                text={`60 x 60`}
                title={true}
                size={14}
                styles={{
                  height: 60,
                  width: 60,
                  backgroundColor: appColors.gray1,
                  borderRadius: 8,
                }}
              />
            </RowComponent>
            <Space width={15} />

            {/* Tên món, topping và giá tiền */}
            <RowComponent flexDirection="column" alignItems="flex-start">
              {/* Tên, topping */}
              <RowComponent styles={{}}>
                <RowComponent flexDirection="column" alignItems="flex-start">
                  <TextComponent
                    text={'Trà sữa oreo'}
                    font={fontFamilies.medium}
                  />
                  <RowComponent>
                    <TextComponent text={'Trân châu đen'} />
                    <Space width={5} />
                    <TextComponent text={'x1'} />
                  </RowComponent>
                </RowComponent>
              </RowComponent>

              {/* Giá tiền */}
              <RowComponent justify="flex-start">
                <TextComponent font={fontFamilies.bold} text={'2000.0000 đ'} />
              </RowComponent>
            </RowComponent>

            {/* Số lượng */}
            <RowComponent
              styles={{flex: 1, marginRight: 14, marginBottom: 50}}
              alignItems="center"
              justify="flex-end">
              <TextComponent text={'x1'} />
            </RowComponent>
          </RowComponent>
          {/* Danh sách đơn hàng ngày 10/10 xóa  */}
          <RowComponent
            styles={{
              flex: 1,
              height: 90,
              padding: 10,
            }}>
            {/* Ảnh món */}
            <RowComponent alignItems="flex-start">
              <TextComponent
                text={`60 x 60`}
                title={true}
                size={14}
                styles={{
                  height: 60,
                  width: 60,
                  backgroundColor: appColors.gray1,
                  borderRadius: 8,
                }}
              />
            </RowComponent>
            <Space width={15} />

            {/* Tên món, topping và giá tiền */}
            <RowComponent flexDirection="column" alignItems="flex-start">
              {/* Tên, topping */}
              <RowComponent styles={{}}>
                <RowComponent flexDirection="column" alignItems="flex-start">
                  <TextComponent
                    text={'Trà sữa oreo'}
                    font={fontFamilies.medium}
                  />
                  <RowComponent>
                    <TextComponent text={'Trân châu đen'} />
                    <Space width={5} />
                    <TextComponent text={'x1'} />
                  </RowComponent>
                </RowComponent>
              </RowComponent>

              {/* Giá tiền */}
              <RowComponent justify="flex-start">
                <TextComponent font={fontFamilies.bold} text={'2000.0000 đ'} />
              </RowComponent>
            </RowComponent>

            {/* Số lượng */}
            <RowComponent
              styles={{flex: 1, marginRight: 14, marginBottom: 50}}
              alignItems="center"
              justify="flex-end">
              <TextComponent text={'x1'} />
            </RowComponent>
          </RowComponent>
        </>
      )}

      <OrderInfoToComponent type={'DELIVERY'} />
    </>
  );
};

const styles = StyleSheet.create({});

export default FoodDetailsComponent;
