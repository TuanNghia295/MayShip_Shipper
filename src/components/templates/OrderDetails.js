import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  ButtonComponent,
  LineComponent,
  RowComponent,
  SectionComponent,
  Space,
  TextComponent,
} from '../atoms';
import {orderStyle} from '../../styles/templates/orderStyle';
import {
  AnotherShop,
  ArrowDown,
  ArrowUp,
  Cash,
  Delivery,
  Food,
  LocationMarker,
  MapLocation,
  Transportation,
} from '../../assets/images';
import {fontFamilies} from '../../constants/fontFamilies';
import {appColors} from '../../constants/colors';
import {
  ModalComponent,
  OrderComponent,
  ProgressBarComponent,
} from '../organisms';
import {progressButtonTitle} from '../../constants/messages/messages';
import {
  checkOrderTypeIcon,
  checkOrderTypeTitle,
  ORDERTYPE,
} from '../../constants/orderType';
import {toPrice} from '../../hooks/toPrice';

const OrderDetails = () => {
  const [showDetails, setShowDetails] = useState(true);
  const onShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const [type, setType] = useState(ORDERTYPE.AnotherShop);

  return (
    <SectionComponent styles={[orderStyle.container]}>
      {/* Header và map */}
      <RowComponent justify="space-between" styles={{flexWrap: 'wrap'}}>
        <RowComponent
          styles={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
          {checkOrderTypeIcon(type)}
          <RowComponent
            flexDirection="column"
            alignItems="flex-start"
            styles={{marginLeft: 15, flex: 1}}>
            <TextComponent
              text={checkOrderTypeTitle(type)}
              font={fontFamilies.medium}
              size={16}
            />
            <RowComponent>
              <LocationMarker fill="#29C6F2" />
              <TextComponent size={12} text={`12.5 km`} />
            </RowComponent>
          </RowComponent>
        </RowComponent>

        <RowComponent styles={{marginTop: 10}}>
          <TouchableOpacity style={[styles.mapBtn]}>
            <RowComponent alignItems="center" justify="center">
              <MapLocation />
              <TextComponent
                styles={{marginLeft: 5, marginTop: 5}}
                text={'Bản đồ'}
                font={fontFamilies.bold}
                color={appColors.white}
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
                size={14}
              />
              <TextComponent
                text={`${toPrice(1000)}đ`}
                font={fontFamilies.bold}
              />
            </RowComponent>

            <RowComponent>
              <TextComponent text={'Thu nhập:'} flex={1} />
              <TextComponent
                text={`${toPrice(10000)}đ`}
                font={fontFamilies.bold}
              />
            </RowComponent>

            <RowComponent>
              <TextComponent text={'Dịch vụ:'} flex={1} />
              <TextComponent
                text={`${toPrice(100000)}đ`}
                font={fontFamilies.bold}
              />
            </RowComponent>

            <RowComponent>
              <TextComponent text={'Phí ship:'} flex={1} />
              <TextComponent
                text={`${toPrice(1000000)}đ`}
                font={fontFamilies.bold}
              />
            </RowComponent>

            <RowComponent>
              <TextComponent text={'Voucher app:'} flex={1} />
              <TextComponent
                text={`${toPrice(10000000)}đ`}
                font={fontFamilies.bold}
              />
            </RowComponent>

            <RowComponent>
              <TextComponent text={'Voucher shop:'} flex={1} />
              <TextComponent
                text={`${toPrice(100000000)}đ`}
                font={fontFamilies.bold}
              />
            </RowComponent>
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
          }}>
          <RowComponent>
            <TextComponent
              font={fontFamilies.medium}
              styles={{marginTop: 4}}
              text="Thanh toán cho shop"
            />
          </RowComponent>
          <RowComponent styles={{flex: 1, marginTop: 4}} justify="flex-end">
            <TextComponent
              text="25.000.000 đ"
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
            type === ORDERTYPE.Food || type === ORDERTYPE.AnotherShop ? 0 : 10,
          borderTopWidth: 1,
        }}>
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
            text={`25.000.000 đ`}
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
        alignItems="flex-start">
        <TextComponent
          text={`Chi tiết đơn hàng`}
          size={16}
          title={true}
          font={fontFamilies.medium}
        />
        <Space height={5} />
        <RowComponent>
          <TextComponent text={'Mã đơn hàng: '} font={fontFamilies.medium} />
          <TextComponent text={'29052002'} font={fontFamilies.medium} />
        </RowComponent>
        <RowComponent>
          <TextComponent text={'Ngày: '} />
          <TextComponent text={'29/05/2021'} />
        </RowComponent>
      </RowComponent>

      {/* Thông tin */}
      <OrderComponent type={type} />

      {/* Progress bar */}
      <ProgressBarComponent status={2} />

      <ModalComponent
        visible={false}
        shipperCancel={true}
        title={'Hủy đơn'}
        descripttion={'Vui lòng nhập lý do muốn hủy đơn'}
        okTitle={'Gửi'}
      />
    </SectionComponent>
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
    backgroundColor: appColors.primary,
    marginRight: -15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OrderDetails;
