import React, {useState} from 'react';
import {
  Image,
  ImageBase,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  Space,
  TextComponent,
} from '../atoms';
import {fontFamilies} from '../../constants/fontFamilies';
import {appColors} from '../../constants/colors';
import {buttonStyles} from '../../styles/atoms/buttonStyles';
import {ArrowDown, ArrowUp, ItemsTest} from '../../assets/images';
import {SvgUri} from 'react-native-svg';
import {OrderInfoFromComponent} from '../molecules';
import OrderInfoToComponent from '../molecules/OrderInfoToComponent';
import {ORDERTYPE} from '../../constants/orderType';
import {END_POINTS} from '../../constants/endpoints';
import {toPrice} from '../../hooks/toPrice';

const OrderComponent = ({type, items}) => {
  const onCallClient = clientPhone => {};
  const [isShowListItems, setIsShowListItems] = useState(true);

  const {
    id,
    code,
    status,
    distance,
    totalDelivery, // phí ship
    totalProduct, //tiền hàng, thu hộ
    userServiceFee, // Phí dịch vụ
    total, // thu tiền mặt của khách
    incomeDeliver, // thu nhập của shipper
    payforShop, // Thanh toán cho shop,
    addressFrom, // địa chỉ đi (hiển thị)
    addressTo, // địa chỉ đến ( hiển thị)
    geometryFrom, // tọa độ đi
    geometryTo, // tọa độ đến
    note,
    user,
    store, // trong storer có user. trong user lấy phone là sdt của shop
    orderDetails,
    createdAt,
    voucher,
  } = items;

  const [details, setDetails] = useState(orderDetails);

  return (
    <>
      {/* Thông tin chi tiết shop */}
      <OrderInfoFromComponent type={type ?? 'FOOD'} info={items} />

      {type !== ORDERTYPE.Transportation && (
        <>
          {/* Thông tin đơn hàng */}
          {details.map((detail, index) => {
            const {createdAt, id, option, product, extras, quantity, total} =
              detail;
            console.log('product', product?.image);
            console.log('pr', `${END_POINTS}/api/images/${product?.image}`);

            return (
              <SectionComponent key={id}>
                <RowComponent
                  styles={[styles.shopInfo]}
                  alignItems="flex-start"
                >
                  <TextComponent
                    flex={1}
                    text={`Thông tin đơn hàng`}
                    title={true}
                    size={16}
                    font={fontFamilies.medium}
                  />
                  <ButtonComponent
                    onPress={() => setIsShowListItems(!isShowListItems)}
                    icon={isShowListItems ? <ArrowUp /> : <ArrowDown />}
                    iconFlex="right"
                    type="empty"
                  />
                </RowComponent>
                {/* Type === DELIVERY */}
                {type === ORDERTYPE.Delivery && isShowListItems && (
                  <InputComponent
                    value={note}
                    disbaled={true}
                    flexible={true}
                  />
                )}

                {type !== ORDERTYPE.Delivery && isShowListItems && (
                  <>
                    <RowComponent
                      styles={{
                        flex: 1,
                        height: 90,
                        padding: 10,
                      }}
                    >
                      {/* Ảnh món */}
                      <RowComponent alignItems="flex-start">
                        <Image
                          source={{
                            uri: `${END_POINTS}/api/images/${product?.image}`,
                          }}
                          style={{width: 80, height: 80, borderRadius: 8}}
                        />
                      </RowComponent>
                      <Space width={15} />

                      {/* Tên món, topping và giá tiền */}
                      <RowComponent
                        flexDirection="column"
                        alignItems="flex-start"
                      >
                        {/* Tên, topping */}
                        <RowComponent styles={{}}>
                          <RowComponent
                            flexDirection="column"
                            alignItems="flex-start"
                          >
                            <TextComponent
                              text={product?.name}
                              font={fontFamilies.medium}
                            />
                            {extras?.map((extraItem, index) => {
                              const {quantity, extra} = extraItem;
                              console.log('extra', extra);
                              return (
                                <RowComponent key={extra.id}>
                                  <TextComponent
                                    color={appColors.gray4}
                                    text={extra.name}
                                  />
                                  <Space width={5} />
                                  <TextComponent
                                    text={`x${quantity}`}
                                    color={appColors.gray4}
                                  />
                                </RowComponent>
                              );
                            })}
                          </RowComponent>
                        </RowComponent>

                        {/* Giá tiền */}
                        <RowComponent justify="flex-start">
                          <TextComponent
                            font={fontFamilies.medium}
                            text={`${toPrice(total)} đ`}
                          />
                        </RowComponent>
                      </RowComponent>

                      {/* Số lượng */}
                      <RowComponent
                        styles={{
                          flex: 1,
                          marginLeft: 10,
                          marginBottom: 50,
                        }}
                        justify="flex-end"
                      >
                        <Space width={4} />
                        <TextComponent
                          text={`x${quantity}`}
                          styles={{textAlign: 'right'}}
                          flex={1}
                        />
                      </RowComponent>
                    </RowComponent>
                  </>
                )}
              </SectionComponent>
            );
          })}
        </>
      )}

      <OrderInfoToComponent type={type ?? 'FOOD'} info={items} />
    </>
  );
};

const styles = StyleSheet.create({
  shopInfo: {
    alignItems: 'center',
    flex: 1,
    marginTop: 5,
    borderTopWidth: 1,
    borderColor: appColors.gray1,
    paddingTop: 10,
  },
});

export default OrderComponent;
