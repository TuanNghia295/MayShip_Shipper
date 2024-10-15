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
import {checkOrderTypeTitle, ORDERTYPE} from '../../constants/orderType';

const OrderDetails = () => {
  const [showDetails, setShowDetails] = useState(true);
  const onShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const [type, setType] = useState(ORDERTYPE.Food);

  const handleCheckType = type => {
    switch (type) {
      case ORDERTYPE.Transportation:
        return <Transportation />;
      case ORDERTYPE.Food:
        return <Food />;
      case ORDERTYPE.Delivery:
        return <Delivery />;
      case ORDERTYPE.AnotherShop:
        return <AnotherShop />;
      default:
        return <Food />;
    }
  };

  return (
    <SectionComponent styles={[orderStyle.container]}>
      {/* Header và map */}
      <RowComponent justify="space-evenly">
        <RowComponent styles={{flex: 1}}>
          {handleCheckType(type)}
          <RowComponent
            flexDirection="column"
            alignItems="flex-start"
            styles={{marginLeft: 15, marginTop: 10}}>
            <TextComponent
              text={checkOrderTypeTitle(type)}
              font={fontFamilies.medium}
              size={16}
            />
            <RowComponent>
              <LocationMarker fill="#29C6F2" />
              <TextComponent text={`12.5 km`} />
            </RowComponent>
          </RowComponent>
        </RowComponent>
        <RowComponent>
          <TouchableOpacity
            style={{
              display: 'flex',
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              backgroundColor: appColors.primary,
              marginRight: -15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <RowComponent alignItems="center" justify="center">
              <MapLocation />
              <TextComponent
                styles={{marginLeft: 5}}
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
      {showDetails && (
        <SectionComponent styles={{marginTop: 0}}>
          <RowComponent justify="flex-start">
            <RowComponent>
              <TextComponent
                text={
                  type === ORDERTYPE.Delivery ? 'Tiền thu hộ: ' : 'Tiền hàng: '
                }
                size={14}
              />
              <TextComponent text={'1000.000đ'} font={fontFamilies.medium} />
            </RowComponent>
            <Space width={10} />
            <RowComponent>
              <TextComponent text={'Phí ship: '} size={14} />
              <TextComponent text={'1000.000đ'} font={fontFamilies.medium} />
            </RowComponent>
          </RowComponent>

          <RowComponent justify="flex-start">
            <RowComponent>
              <TextComponent text={'Thu nhập: '} size={14} />
              <TextComponent text={'1000.000đ'} font={fontFamilies.medium} />
            </RowComponent>
            <Space width={15} />

            <RowComponent>
              <TextComponent text={'Voucher: '} size={14} />
              <TextComponent text={'1000.000đ'} font={fontFamilies.medium} />
            </RowComponent>
          </RowComponent>

          <RowComponent justify="flex-start">
            <RowComponent>
              <TextComponent text={'Dịch vụ: '} size={14} />
              <TextComponent text={'1000.000đ'} font={fontFamilies.medium} />
            </RowComponent>
          </RowComponent>
        </SectionComponent>
      )}

      {/* On off xem chi tiết */}
      <RowComponent justify="center">
        <ButtonComponent
          title="Xem chi tiết"
          type="empty"
          textStyle={{fontFamily: fontFamilies.bold, fontSize: 16}}
          icon={showDetails ? <ArrowUp /> : <ArrowDown />}
          iconFlex="right"
          onPress={() => onShowDetails()}
        />
      </RowComponent>

      {/* thanh toán bằng tiền mặt */}
      <RowComponent
        styles={{
          marginTop: 5,
          borderTopWidth: 1,
          borderColor: appColors.gray1,
          paddingTop: 10,
        }}>
        <RowComponent>
          <TextComponent text={`Thanh toán bằng tiền mặt  `} />
          <Cash />
        </RowComponent>
        <RowComponent styles={{flex: 1}} justify="flex-end">
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

      {/* <ModalComponent
        visible={true}
        shipperCancel={true}
        title={'Bạn vẫn muốn hủy đơn ?'}
        descripttion={'Vui lòng nhập lý do hủy đơn'}
      /> */}
    </SectionComponent>
  );
};

const styles = StyleSheet.create({});

export default OrderDetails;
