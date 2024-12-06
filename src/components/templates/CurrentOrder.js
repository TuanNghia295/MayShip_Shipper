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
import Ionicons from 'react-native-vector-icons/Ionicons';

const CurrentOrder = ({items, onRefresh}) => {
  const {
    id,
    type,
    code,
    incomeDeliver, // Thu nhập
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
  const [countReject, setCountReject] = useState(5); // Số lần từ chối đơn hàng
  const [isShowModal, setIsShowModal] = useState(false); // Hiển thị modal khi từ chối đơn hàng
  const [isShowModalNotEnoughPoint, setIsShowModalNotEnoughPoint] =
    useState(false);
  const [isOrderVisible, setIsOrderVisible] = useState(true); // Trạng thái hiển thị đơn hàng
  const [isShowRejectLimitModal, setIsShowRejectLimitModal] = useState(false); // Hiển thị modal khi hủy quá số lần cho phép

  const handleAcceptOrder = async orderId => {
    try {
      // const res = await orderServices.acceptOrder({orderId, type: 'ACCEPT'});
      // console.log('res 😘', res);
      toast('success', 'Đơn hàng đã được chấp nhận!');
      console.log('id', orderId);
      setIsOrderVisible(false); // Ẩn đơn hàng sau khi chấp nhận
      navigate('Đơn hàng', {order: items}); // Chuyển hướng đến OrderScreen và truyền dữ liệu đơn hàng
    } catch (error) {
      if (error.errorCode === 'D005') {
        setIsShowModalNotEnoughPoint(true);
      }
    }
  };

  const handleRejectOrder = async orderId => {
    try {
      // const res = await orderServices.acceptOrder({orderId, type: 'REJECT'});
      // console.log('res reject 😘', res);
      if (countReject <= 0) {
        setIsShowRejectLimitModal(true); // Hiển thị modal khi hủy quá số lần cho phép
      } else {
        setCountReject(countReject - 1);
        setIsShowModal(true);
        setIsOrderVisible(false); // Ẩn đơn hàng sau khi hủy
      }
    } catch (error) {
      toast('error', 'Đã có lỗi xảy ra!');
    }
  };

  const handleShowModal = () => {
    setIsShowModal(false);
    onRefresh();
  };

  return (
    <>
      {isOrderVisible && (
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
                <Ionicons
                  name="location-sharp"
                  color={appColors.primary}
                  size={20}
                />
                <TextComponent text={`${distance} km`} size={14} />
              </RowComponent>
            </RowComponent>
          </RowComponent>

          {/* Gía trị đơn hàng và thu nhập */}
          <RowComponent>
            {(type === 'FOOD' || type === 'ANOTHER_SHOP') && (
              <>
                <TextComponent text={handleCheckHeaderInfoType(type)} />
                <TextComponent
                  font={fontFamilies.bold}
                  text={`${toPrice(payforShop)}đ`}
                />
              </>
            )}
          </RowComponent>
          <RowComponent>
            <TextComponent text={`Thu nhập: `} />
            <TextComponent
              font={fontFamilies.bold}
              text={`${toPrice(incomeDeliver)}đ`}
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
              <TextComponent
                styles={{paddingLeft: 10}}
                text={`• ${addressTo}`}
              />
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
        </SectionComponent>
      )}

      {/* Modal khi từ chối đơn hàng */}
      <ModalComponent
        visible={isShowModal}
        title={'Đơn hàng đã bị từ chối'}
        descripttion={`Bạn vừa từ chối đơn hàng này. Bạn chỉ hủy được tối đa 5 đơn trong ngày hôm nay nhé!`}
        descripttionStyle={{textAlign: 'center'}}
        onOk={handleShowModal}
      />

      {/* Modal khi hủy quá số lần cho phép */}
      <ModalComponent
        visible={isShowRejectLimitModal}
        title={'Không thể hủy đơn hàng'}
        descripttion={`Bạn đã hủy quá số lần cho phép trong ngày. Vui lòng liên hệ với admin để được hỗ trợ.`}
        descripttionStyle={{textAlign: 'center'}}
        okTitle={'Đóng'}
        onOk={() => setIsShowRejectLimitModal(false)}
      />

      <ModalComponent
        visible={isShowModalNotEnoughPoint}
        title={'Không đủ điểm để nhận đơn'}
        descripttion={`Bạn không đủ điểm để nhận đơn hàng này. Bạn cần nạp thêm điểm để có thể nhận đơn`}
        descripttionStyle={{textAlign: 'center'}}
        okTitle={'Đóng'}
        onOk={() => setIsShowModalNotEnoughPoint(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default CurrentOrder;
