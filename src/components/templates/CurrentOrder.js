import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
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
} from '../../constants/orderType';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ModalComponent} from '../organisms';
import toast from '../../utils/toast'; // Đường dẫn tới file toast.js
import {
  socketConnect,
  socketEmit,
  socketOn,
} from '../../services/socketServices';
import useUserStore from '../../store/store';

const CurrentOrder = ({type, items}) => {
  const {navigate} = useNavigation();

  const [data, setData] = useState([]); // Lấy danh sách đơn hàng
  const [countReject, setCountReject] = useState(4); // Số lần từ chối đơn hàng
  const [isShowModal, setIsShowModal] = useState(false); // Hiển thị modal khi từ chối đơn hàng

  const {id} = useUserStore();

  useEffect(() => {
    if (id) {
      socketConnect();
      console.log('first', id);
      socketEmit('join-room', {deliverId: id});
      socketOn('new-order', data => {
        console.log('dataa', data);
      });
    }
  }, [id]);

  const handleAcceptOrder = async orderId => {
    try {
      // const res = await orderServices.updateStatusOrder({orderId});
      toast('success', 'Đơn hàng đã được chấp nhận!');
      navigate('Đơn hàng');
    } catch (error) {
      toast('error', 'Lỗi khi chấp nhận đơn hàng!', error.message);
    }
  };

  const handleRejectOrder = () => {
    setCountReject(prev => prev - 1);
    setIsShowModal(true);
  };

  return (
    <SectionComponent styles={[orderStyle.container]}>
      {/* Header */}
      <RowComponent>
        {checkOrderTypeIcon(type)}
        <RowComponent
          flexDirection="column"
          styles={{marginLeft: 15, marginTop: 12}}
          alignItems="flex-start">
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
          <TextComponent font={fontFamilies.bold} text="215.0000đ" />
        )}
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
          onPress={handleRejectOrder}
        />
        <ButtonComponent
          type="shortPrimary"
          title="Chấp nhận"
          onPress={() => handleAcceptOrder()}
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
    </SectionComponent>
  );
};

const styles = StyleSheet.create({});

export default CurrentOrder;
