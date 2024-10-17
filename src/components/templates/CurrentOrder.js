import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {orderStyle} from '../../styles/templates/orderStyle';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  Space,
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
import orderServices from '../../services/Order/orderServices';
import {useNavigation} from '@react-navigation/native';
import {ModalComponent} from '../organisms';
const CurrentOrder = ({type, items}) => {
  const {navigate} = useNavigation();

  // const {distance} = items;

  const [data, setData] = useState([]); // Lấy danh sách đơn hàng
  const [countReject, setCountReject] = useState(4); // Số lần từ chối đơn hàng
  const [isShowModal, setIsShowModal] = useState(false); // Hiển thị modal khi từ chối đơn hàng
  useEffect(() => {
    const getData = async () => {
      const res = await orderServices.getOrders();
      console.log('data', res.data);
    };
    getData();
  }, []);

  const handleAcceptOrder = async orderId => {
    try {
      // const res = await orderServices.updateStatusOrder({orderId});
      // console.log('res', res);
      navigate('Đơn hàng');
    } catch (error) {
      console.log('error', error);
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

      {/* Thông tin đơn hàng */}
      {/* {type === 'DELIVERY' && (
        <RowComponent
          flexDirection="column"
          alignItems="flex-start"
          styles={{
            marginTop: 5,
            borderTopWidth: 1,
            borderColor: appColors.gray1,
            paddingTop: 10,
          }}>
          <TextComponent
            title={true}
            size={16}
            font={fontFamilies.medium}
            text={'Thông tin đơn hàng'}
            styles={{marginBottom: 5}}
          />

          <RowComponent>
            <InputComponent
              disbaled={true}
              value={
                'Mua dùm 2 kí thịt heo, 2 chai nước ngọt, 3 lạng ức gà, 1 hộp bánh mì,  người ta gọi tao là lộc phụ hồ'
              }
              flexible={true}
            />
          </RowComponent>
        </RowComponent>
      )} */}

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
          // onPress={() => handleAcceptOrder(orderId)}
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
