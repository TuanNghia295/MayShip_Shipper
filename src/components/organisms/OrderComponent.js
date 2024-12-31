import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {ButtonComponent, InputComponent, RowComponent, SectionComponent, Space, TextComponent} from '../atoms';
import {fontFamilies} from '../../constants/fontFamilies';
import {appColors} from '../../constants/colors';
import {ArrowDown, ArrowUp} from '../../assets/images';
import {END_POINTS} from '../../constants/endpoints';
import {toPrice} from '../../hooks/toPrice';
import {OrderInfoFromComponent} from '../molecules';
import OrderInfoToComponent from '../molecules/OrderInfoToComponent';
import {ORDERTYPE} from '../../constants/orderType';

const OrderComponent = ({type, items}) => {
  const [isShowListItems, setIsShowListItems] = useState(true);

  const {
    id,
    orderDetails = [], // Đảm bảo luôn là một mảng
    note,
  } = items;

  return (
    <ScrollView contentContainerStyle={{padding: 10}}>
      {/* Thông tin chi tiết shop */}
      <OrderInfoFromComponent type={type ?? 'FOOD'} info={items} />

      {/* Thông tin đơn hàng */}
      {orderDetails.map(detail => {
        const {id, product, extras = [], quantity, total} = detail;

        return (
          <SectionComponent key={id} styles={styles.orderSection}>
            <RowComponent styles={styles.orderHeader}>
              <TextComponent flex={1} text="Thông tin đơn hàng" title={true} size={16} font={fontFamilies.medium} />
              <ButtonComponent onPress={() => setIsShowListItems(!isShowListItems)} icon={isShowListItems ? <ArrowUp /> : <ArrowDown />} iconFlex="right" type="empty" />
            </RowComponent>

            {/* Hiển thị ghi chú nếu có */}
            {type === ORDERTYPE.Delivery && isShowListItems && <InputComponent value={note} disabled={true} flexible={true} />}

            {/* Chi tiết sản phẩm */}
            {type !== ORDERTYPE.Delivery && isShowListItems && (
              <SectionComponent styles={styles.productSection}>
                <RowComponent styles={styles.productRow}>
                  {/* Ảnh món */}
                  <Image
                    source={{
                      uri: `${END_POINTS}api/images/${product?.image}`,
                    }}
                    style={styles.productImage}
                  />

                  <Space width={15} />

                  {/* Tên món, topping và giá tiền */}
                  <View style={styles.productDetails}>
                    {/* Tên món và topping */}
                    <TextComponent text={product?.name} font={fontFamilies.medium} />
                    {extras.map(extraItem => {
                      const {quantity, extra} = extraItem;
                      return (
                        <RowComponent key={extra.id} flexDirection="row">
                          <TextComponent color={appColors.gray4} text={extra.name} />
                          <Space width={5} />
                          <TextComponent text={`x${quantity}`} color={appColors.gray4} />
                        </RowComponent>
                      );
                    })}

                    {/* Giá tiền */}
                    <TextComponent font={fontFamilies.medium} text={`${toPrice(total)} đ`} />
                  </View>

                  {/* Số lượng */}
                  <TextComponent text={`x${quantity}`} styles={styles.quantityText} />
                </RowComponent>
              </SectionComponent>
            )}
          </SectionComponent>
        );
      })}

      {/* Thông tin khách hàng */}
      <OrderInfoToComponent type={type ?? 'FOOD'} info={items} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  orderSection: {
    paddingVertical: 10,
  },
  orderHeader: {
    alignItems: 'center',
    flex: 1,
    marginTop: 5,
    borderTopWidth: 1,
    borderColor: appColors.gray1,
    paddingTop: 10,
    marginBottom: 10,
  },
  productSection: {
    padding: 10,
  },
  productRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  quantityText: {
    marginLeft: 10,
    textAlign: 'right',
    flex: 1,
  },
});

export default OrderComponent;
