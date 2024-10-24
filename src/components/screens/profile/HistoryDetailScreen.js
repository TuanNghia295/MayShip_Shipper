import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  Space,
  TextComponent,
} from '../../atoms';
import {orderStyle} from '../../../styles/templates/orderStyle';
import {
  checkOrderTypeIcon,
  checkOrderTypeTitle,
  ORDERTYPE,
} from '../../../constants/orderType';
import {fontFamilies} from '../../../constants/fontFamilies';
import {
  ArrowDown,
  ArrowUp,
  LocationMarker,
  MapLocationBlack,
} from '../../../assets/images';
import {appColors} from '../../../constants/colors';
import {toPrice} from '../../../hooks/toPrice';
import {
  ModalComponent,
  OrderComponent,
  ProgressBarComponent,
} from '../../organisms';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import orderServices from '../../../services/Order/orderServices';
import {format} from 'date-fns';

const formatDate = date => {
  return date ? format(date, 'dd/MM/yyyy') : '';
};

const HistoryDetailScreen = () => {
  const route = useRoute();
  const {info} = route.params;
  const [data, setData] = useState([]); // thông tin chi tiết đơn hàng

  // Lấy thông tin chi tiết đơn hàng
  const getData = async () => {
    const res = await orderServices.getOrderDetail({orderId: info});
    console.log('order asdas', JSON.stringify(res));
    setData(res);
  };
  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  const [showDetails, setShowDetails] = useState(true);
  const onShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const {
    id,
    type,
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
  } = data;

  return (
    <ScrollView>
      <SectionComponent styles={[orderStyle.container]}>
        {/* Header và map */}
        <RowComponent justify="space-between" styles={{flexWrap: 'wrap'}}>
          <RowComponent
            styles={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}
          >
            {checkOrderTypeIcon(type)}
            <RowComponent
              flexDirection="column"
              alignItems="flex-start"
              styles={{marginLeft: 15, flex: 1}}
            >
              <TextComponent
                text={checkOrderTypeTitle(type)}
                font={fontFamilies.medium}
                size={16}
              />
              <RowComponent>
                <LocationMarker fill="#29C6F2" />
                <TextComponent size={12} text={`${distance ?? 0} km`} />
              </RowComponent>
            </RowComponent>
          </RowComponent>

          <RowComponent styles={{marginTop: 10}}>
            <TouchableOpacity style={[styles.mapBtn]} disabled>
              <RowComponent alignItems="center" justify="center">
                <MapLocationBlack />
                <TextComponent
                  styles={{marginLeft: 5, marginTop: 5}}
                  text={'Bản đồ'}
                  font={fontFamilies.bold}
                  color={appColors.black1}
                  size={16}
                />
              </RowComponent>
            </TouchableOpacity>
          </RowComponent>
        </RowComponent>

        {/* header details */}
        {showDetails ? (
          <SectionComponent styles={[styles.headerDetails]}>
            <RowComponent flexDirection="column" alignItems="flex-start">
              <RowComponent>
                <TextComponent
                  text={
                    type === ORDERTYPE.Delivery ? 'Tiền thu hộ:' : 'Tiền hàng:'
                  }
                  flex={1}
                />
                <TextComponent
                  text={`${toPrice(totalProduct)} đ`}
                  font={fontFamilies.bold}
                />
              </RowComponent>

              <RowComponent>
                <TextComponent text={'Phí ship:'} flex={1} />
                <TextComponent
                  text={`${toPrice(totalDelivery)} đ`}
                  font={fontFamilies.bold}
                />
              </RowComponent>

              <RowComponent>
                <TextComponent text={'Thu nhập:'} flex={1} />
                <TextComponent
                  text={`${toPrice(incomeDeliver)} đ`}
                  font={fontFamilies.bold}
                />
              </RowComponent>

              <RowComponent>
                <TextComponent text={'Chiết khấu thu nhập:'} flex={1} />
                <TextComponent
                  text={`${toPrice(totalDelivery - incomeDeliver)} đ`}
                  font={fontFamilies.bold}
                />
              </RowComponent>

              <RowComponent>
                <TextComponent text={'Dịch vụ:'} flex={1} />
                <TextComponent
                  text={`${toPrice(userServiceFee)} đ`}
                  font={fontFamilies.bold}
                />
              </RowComponent>

              {voucher ? (
                <>
                  {voucher.type === 'ADMIN' ? (
                    <RowComponent>
                      <TextComponent text={'Voucher app:'} flex={1} />
                      <TextComponent
                        text={`${toPrice(voucher.value)} đ`}
                        font={fontFamilies.bold}
                      />
                    </RowComponent>
                  ) : null}

                  {voucher.type === 'STORE' ? (
                    <RowComponent>
                      <TextComponent text={'Voucher shop:'} flex={1} />
                      <TextComponent
                        text={`${toPrice(voucher.value)} đ`}
                        font={fontFamilies.bold}
                      />
                    </RowComponent>
                  ) : null}
                </>
              ) : null}
            </RowComponent>
          </SectionComponent>
        ) : null}

        {/* On off xem chi tiết */}
        <ButtonComponent
          title="Xem chi tiết"
          type="empty"
          textStyle={{fontFamily: fontFamilies.medium, fontSize: 16}}
          icon={showDetails ? <ArrowUp /> : <ArrowDown />}
          iconFlex="right"
          onPress={() => onShowDetails()}
        />

        {/* thanh toán cho shop (Đơn đồ ăn và giao hàng cho shop) */}
        {(type === ORDERTYPE.Food || type === ORDERTYPE.AnotherShop) && (
          <RowComponent
            styles={{
              marginTop: 5,
              borderTopWidth: 1,
              borderColor: appColors.gray1,
              paddingTop: 10,
            }}
          >
            <RowComponent>
              <TextComponent
                font={fontFamilies.medium}
                styles={{marginTop: 4}}
                text="Thanh toán cho shop"
              />
            </RowComponent>
            <RowComponent styles={{flex: 1, marginTop: 4}} justify="flex-end">
              <TextComponent
                text={`${toPrice(payforShop)} đ`}
                size={14}
                font={fontFamilies.medium}
              />
            </RowComponent>
          </RowComponent>
        )}
        {/* thu tiền mặt của khách */}
        <RowComponent
          styles={{
            borderColor:
              type === ORDERTYPE.Food || type === ORDERTYPE.AnotherShop
                ? appColors.white
                : appColors.gray1,
            paddingTop:
              type === ORDERTYPE.Food || type === ORDERTYPE.AnotherShop
                ? 0
                : 10,
            borderTopWidth: 1,
          }}
        >
          <RowComponent>
            <TextComponent
              font={fontFamilies.medium}
              styles={{
                marginTop: 4,
              }}
              text={`Thu tiền mặt của khách  `}
            />
          </RowComponent>
          <RowComponent styles={{flex: 1, marginTop: 4}} justify="flex-end">
            <TextComponent
              text={`${toPrice(total)} đ`}
              size={14}
              font={fontFamilies.medium}
            />
          </RowComponent>
        </RowComponent>

        {/* Chi tiết đơn hàng */}
        <RowComponent
          styles={{
            marginTop: 5,
            borderTopWidth: 1,
            borderColor: appColors.gray1,
            paddingTop: 10,
          }}
          flexDirection="column"
          alignItems="flex-start"
        >
          <TextComponent
            text={`Chi tiết đơn hàng`}
            size={16}
            title={true}
            font={fontFamilies.medium}
          />
          <Space height={5} />
          <RowComponent>
            <TextComponent text={'Mã đơn hàng: '} font={fontFamilies.medium} />
            <TextComponent text={code} font={fontFamilies.medium} />
          </RowComponent>
          <RowComponent>
            <TextComponent text={'Ngày: '} />
            <TextComponent text={formatDate(createdAt)} />
          </RowComponent>
        </RowComponent>

        {/* Thông tin */}
        <OrderComponent type={type} items={data || []} />

        {/* Progress bar */}
        {status === 'CANCELED' ? (
          <>
            <RowComponent flexDirection="column" alignItems="flex-start">
              <Space height={10} />
              <TextComponent
                text={'Lý do đơn bị hủy'}
                title={true}
                size={16}
                font={fontFamilies.medium}
              />
              <InputComponent
                flexible={true}
                value={data.ReasonDeliverCancelOrder?.reason || ''}
              />
            </RowComponent>
            <ButtonComponent
              title="Đơn hàng đã bị hủy"
              isDisable
              textStyle={{fontFamily: fontFamilies.bold}}
              type="gray"
            />
          </>
        ) : (
          <>
            <ProgressBarComponent status={4} />
            <ButtonComponent
              isDisable
              title="Đơn hàng đã hoàn thành"
              textStyle={{fontFamily: fontFamilies.bold}}
              type="gray"
            />
          </>
        )}
      </SectionComponent>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerDetails: {
    marginTop: 0,
    display: 'flex',
  },
  mapBtn: {
    display: 'flex',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: appColors.gray1,
    marginRight: -15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HistoryDetailScreen;
