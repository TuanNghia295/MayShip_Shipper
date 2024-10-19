import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {orderStyle} from '../../styles/templates/orderStyle';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../atoms';
import {LocationMarker} from '../../assets/images';
import {appColors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {
  checkOrderTypeIcon,
  checkOrderTypeTitle,
  handleCheckHeaderInfoType,
  handleCheckOrderFromTitleType,
  handleCheckOrderToTitleType,
  ORDERTYPE,
} from '../../constants/orderType';
import {ModalComponent} from '../organisms';
import toast from '../../utils/toast'; // Đường dẫn tới file toast.js

import orderServices from '../../services/Order/orderServices';
import {toPrice} from '../../hooks/toPrice.js';

const CurrentOrder = ({items}) => {
  const {
    id,
    type,
    code,
    inComeDeliver, // Thu nhập
    payforShop, // Thanh toán cho shop
    status,
    distance,
    totalDelivery,
    totalProduct,
    total,
    serviceCost,
    addressFrom,
    addressTo,
    geometryFrom,
    geometryTo,
    note,
    createdAt,
    updatedAt,
    storeId,
    store,
    reasonDeliverCancelOrderId,
  } = items;

  const {navigate} = useNavigation();
  const [countReject, setCountReject] = useState(4); // Số lần từ chối đơn hàng
  const [isShowModal, setIsShowModal] = useState(false); // Hiển thị modal khi từ chối đơn hàng
  const [isShowModalNotEnoughPoint, setIsShowModalNotEnoughPoint] =
    useState(false);
  const handleAcceptOrder = async orderId => {
    try {
      const res = await orderServices.acceptOrder({orderId, type: 'ACCEPT'});
      console.log('res 😘', res);
      toast('success', 'Đơn hàng đã được chấp nhận!');
      console.log('id', orderId);

      navigate('Đơn hàng');
    } catch (error) {
      toast('error', 'Lỗi khi chấp nhận đơn hàng!', error.message);
    }
  };

  const handleRejectOrder = async orderId => {
    const res = await orderServices.acceptOrder({orderId, type: 'REJECT'});
    console.log('res reject 😘', res);
    if (countReject < 0) {
      setIsShowModalNotEnoughPoint(true);
    }
    setCountReject(prev => prev - 1);
    setIsShowModal(true);
  };

  return (
    <>
      <SectionComponent styles={[orderStyle.container]}>
        {/* Header */}
        <RowComponent>
          {checkOrderTypeIcon(type)}
          <RowComponent
            flexDirection="column"
            styles={{marginLeft: 15, marginTop: 12}}
            alignItems="flex-start"
          >
            <TextComponent
              font={fontFamilies.medium}
              size={16}
              text={checkOrderTypeTitle(type)}
            />
            <RowComponent alignItems="flex-start">
              <LocationMarker />
              <TextComponent text={`12.5 km`} size={14} />
            </RowComponent>
          </RowComponent>
        </RowComponent>

        {/* Gía trị đơn hàng và thu nhập */}
        <RowComponent>
          <TextComponent text={handleCheckHeaderInfoType(type)} />
          {(type === 'FOOD' || type === 'ANOTHER_SHOP') && (
            <TextComponent
              font={fontFamilies.bold}
              text={`${toPrice(payforShop)}đ`}
            />
          )}
        </RowComponent>
        <RowComponent>
          <TextComponent text={`Thu nhập: `} />
          <TextComponent
            font={fontFamilies.bold}
            text={`${toPrice(inComeDeliver)}đ`}
          />
        </RowComponent>

        {/* Body */}
        <RowComponent
          flexDirection="column"
          alignItems="flex-start"
          styles={{
            marginTop: 5,
            borderTopWidth: 1,
            borderColor: appColors.gray1,
          }}
        >
          <RowComponent
            flexDirection="column"
            alignItems="flex-start"
            styles={{marginTop: 10}}
          >
            <TextComponent
              title={true}
              size={16}
              font={fontFamilies.medium}
              text={handleCheckOrderFromTitleType(type)}
              styles={{marginBottom: 5}}
            />
            {/* Địa chỉ shop và tên shop */}
            {(type === ORDERTYPE.Food || type === ORDERTYPE.AnotherShop) && (
              <TextComponent
                styles={{paddingLeft: 10}}
                text={`• ${store?.address}`}
              />
            )}
            <TextComponent
              styles={{paddingLeft: 10}}
              text={`• ${addressFrom}`}
            />
          </RowComponent>

          <RowComponent
            flexDirection="column"
            alignItems="flex-start"
            styles={{marginTop: 10}}
          >
            <TextComponent
              title={true}
              size={16}
              font={fontFamilies.medium}
              text={handleCheckOrderToTitleType(type)}
              styles={{marginBottom: 5}}
            />
            <TextComponent styles={{paddingLeft: 10}} text={`• ${addressTo}`} />
          </RowComponent>
        </RowComponent>

        {/* Buttons */}
        <RowComponent
          alignItems="center"
          justify="center"
          styles={{
            marginTop: 5,
            borderTopWidth: 1,
            borderColor: appColors.gray1,
            paddingTop: 10,
          }}
        >
          <ButtonComponent
            type="shortOutline"
            title="Từ chối"
            textStyle={{fontFamily: fontFamilies.medium}}
            onPress={() => handleRejectOrder(id)}
          />
          <ButtonComponent
            type="shortPrimary"
            title="Chấp nhận"
            onPress={() => handleAcceptOrder(id)}
            textStyle={{fontFamily: fontFamilies.medium}}
          />
        </RowComponent>

        {/* Modal khi từ chối đơn hàng */}
        <ModalComponent
          visible={isShowModal}
          title={'Đơn hàng đã bị từ chối'}
          descripttion={`Bạn vừa từ chối đơn hàng này. Bạn còn ${countReject} lần hủy đơn trong ngày hôm nay nhé!`}
          descripttionStyle={{textAlign: 'center'}}
          onOk={() => setIsShowModal(false)}
        />

        <ModalComponent
          visible={isShowModalNotEnoughPoint}
          title={'Không đủ điểm để nhận đơn'}
          descripttion={`Bạn không đủ điểm để nhận đơn hàng này. Bạn cần nạp thêm điểm để có thể nhận đơn`}
          descripttionStyle={{textAlign: 'center'}}
          okTitle={'Đóng'}
        />
      </SectionComponent>
    </>
  );
};

const styles = StyleSheet.create({});

export default CurrentOrder;
