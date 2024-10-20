import React, {useState, useEffect, useRef} from 'react';
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
import {format, set} from 'date-fns';
import orderServices from '../../services/Order/orderServices';
import toast from '../../utils/toast';

const formatDate = date => {
  return date ? format(date, 'dd/MM/yyyy') : '';
};

const OrderDetails = ({items, onRefresh}) => {
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
  } = items;

  const [showDetails, setShowDetails] = useState(true);
  const [currentStep, setCurrentStep] = useState(2); // Thêm state currentStep
  const [isShowReasonModal, setIsShowReasonModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [reason, setReason] = useState('');
  const timeoutRef = useRef(null);

  // Clear timeout khi component unmount (khi component bị xóa khỏi DOM)
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  const onShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const onRejectOrder = async (orderId, reason) => {
    try {
      console.log('orderId', orderId);
      console.log('reason', reason);
      await orderServices.updateStatusOrder({
        orderId,
        status: 'CANCELED',
        reason,
      });
      setIsShowReasonModal(false);
      setRejectModal(true);
    } catch (error) {
      console.error('Failed to reject order:', error);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    console.log('orderId', orderId);
    console.log('status', status);

    try {
      switch (status) {
        case 'PENDING':
          await orderServices.updateStatusOrder({orderId, status: 'ACCEPTED'});
          setCurrentStep(2);
          break;
        case 'ACCEPTED':
          await orderServices.updateStatusOrder({
            orderId,
            status: 'DELIVERING',
          });
          setCurrentStep(3);
          onRefresh();
          break;
        case 'DELIVERING':
          await orderServices.updateStatusOrder({orderId, status: 'DELIVERED'});
          setCurrentStep(4);
          setTimeout(() => {
            onRefresh();
          }, 1000);
          break;
        case 'CANCELED':
          setIsShowReasonModal(true);
          break;
        default:
          console.log('Unknown status:', status);
          break;
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  return (
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
              <TextComponent size={12} text={`${distance} km`} />
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
            type === ORDERTYPE.Food || type === ORDERTYPE.AnotherShop ? 0 : 10,
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
      <OrderComponent type={type} items={items} />

      {/* Progress bar */}
      <ProgressBarComponent status={currentStep} />

      {/* Submit, cancel button */}
      {currentStep === 4 ? (
        <ButtonComponent
          title="Đơn hàng đã hoàn thành"
          textStyle={{fontFamily: fontFamilies.bold}}
          type="gray"
        />
      ) : (
        <>
          <Space height={10} />
          <ButtonComponent
            title={progressButtonTitle(currentStep)}
            onPress={() => handleStatusChange(id, status)}
            textStyle={{fontFamily: fontFamilies.bold}}
            type="primary"
          />
          <Space height={10} />
          <ButtonComponent
            title={'Hủy đơn'}
            textStyle={{fontFamily: fontFamilies.bold}}
            type="outline"
            onPress={() => handleStatusChange(id, 'CANCELED')}
          />
        </>
      )}

      <ModalComponent
        visible={isShowReasonModal}
        shipperCancel={true}
        shipperCancelReason={setReason}
        title={'Hủy đơn'}
        descripttion={'Vui lòng nhập lý do muốn hủy đơn'}
        okTitle={'Gửi'}
        cancelTitle={'Hủy'}
        onCancel={() => setIsShowReasonModal(false)}
        onOk={() => onRejectOrder(id, reason)}
      />

      <ModalComponent
        visible={rejectModal}
        title={'Đơn hàng đã bị hủy'}
        descripttion={`Bạn vừa hủy đơn hàng này. Bạn còn 2 lần hủy đơn trong ngày hôm nay nhé!`}
        descripttionStyle={{textAlign: 'center'}}
        okTitle={'Đóng'}
        onOk={() => {
          setRejectModal(false);
          onRefresh();
        }}
      />

      <ModalComponent
        visible={false}
        title={'Bạn không thể hủy đơn!'}
        descripttion={`Bạn đã hết lượt hủy đơn trong ngày. Vui lòng liên hệ đến admin để được hỗ trợ`}
        descripttionStyle={{textAlign: 'center'}}
      />

      <ModalComponent
        visible={false}
        title={'Số điểm của bạn đang dưới 200.000'}
        descripttion={`Số điểm hiện tại của bạn đang thấp hơn 200.000. Vui lòng nạp thêm điểm để có thể hoạt động không gặp vấn đề gì.`}
        descripttionStyle={{textAlign: 'center'}}
        okTitle={'Đóng'}
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
