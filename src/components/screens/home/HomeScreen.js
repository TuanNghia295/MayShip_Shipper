import React, {useCallback, useEffect, useState} from 'react';
import {Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {CurrentOrder} from '../../templates';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {appColors} from '../../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import orderServices from '../../../services/Order/orderServices';
import {socketConnect, socketDisconnect, socketEmit, socketOn} from '../../../services/socketServices';
import {idSelector, setUserInfo} from '../../../store/userSlice.js';
import ModalComponent from '../../organisms/ModalComponent.js';
import ShipperServices from '../../../services/Shipper/shipperServices.js';
import {stopRefreshTokenTimer} from '../auth/TokenTimer.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import toast from '../../../utils/toast.js';

const platForm = Platform.OS === 'ios' ? 'ios' : 'android';
const HomeScreen = () => {
  useFocusEffect(
    useCallback(() => {
      if (platForm === 'android') {
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor(appColors.background);
      }
    }, []),
  );

  const [data, setData] = useState([]); // Lấy danh sách đơn hàng
  const id = useSelector(idSelector); // Lấy id từ Redux store
  const {navigate} = useNavigation();
  const [isShowModalCancelByUser, setIsShowModalCancelByUser] = useState(false);
  const [isShowModalNotEnoughPoint, setIsShowModalNotEnoughPoint] = useState(false);
  const [isShowModalAccountLocked, setIsShowModalAccountLocked] = useState(false);
  const dispatch = useDispatch();
  // Danh sách đơn hàng
  const getList = async () => {
    try {
      const res = await orderServices.getOrders();
      // console.log('order', JSON.stringify(res));
      setData(res);
    } catch (error) {
      if (error.statusCode === 401 && error.error === 'Unauthorized') {
        onLogOut();
      }
    }
  };

  // Lấy thông tin shipper
  const getShipperInfo = async () => {
    const res = await ShipperServices.infoShipper();
    console.log('shipper 😘😘😘', JSON.stringify(res));
    // check point
    if (res.point < 200000) {
      setIsShowModalNotEnoughPoint(true);
    }
  };

  // Đăng xuất
  const onLogOut = async () => {
    try {
      stopRefreshTokenTimer();
      // Xóa thông tin token khỏi AsyncStorage
      await ShipperServices.logoutShipper();
      await AsyncStorage.removeItem('shipper_token');
      await AsyncStorage.removeItem('shipper_refresh_token');
      await AsyncStorage.removeItem('expires');
      await AsyncStorage.removeItem('isLogin');
      socketDisconnect();
      dispatch(setUserInfo({}));
      navigate('Location');
    } catch (error) {
      console.log('Lỗi khi đăng xuất:', error);
      toast('error', 'Lỗi khi đăng xuất');
    }
  };

  useFocusEffect(
    useCallback(() => {
      getShipperInfo();
      getList();
    }, []),
  );

  console.log('❤️❤️❤️', id);

  useFocusEffect(
    useCallback(() => {
      if (id) {
        socketConnect();
        console.log('socket connected with id', id);
        socketEmit('join-room', {deliverId: id});
        socketOn('refresh-order', data => {
          console.log('dataa ❌❌❌❌❌', data);
          getList();
        });
        socketOn('order-cancel-by-user', data => {
          console.log('dataa ❌❌❌❌❌', data);
          setIsShowModalCancelByUser(true);
          getList();
        });
        socketOn('order-cancel-by-admin', data => {
          console.log('dataa ❌❌❌❌❌', data);
          setIsShowModalCancelByUser(true);
          getList();
        });
        socketOn('account-locked', data => {
          console.log('dataa 🔒🔒🔒', data);
          setIsShowModalAccountLocked(true);
        });
      }
    }, [id]),
  );

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {data.map(item => {
          return <CurrentOrder key={item.id} items={item} onRefresh={getList} />;
        })}
      </ScrollView>
      <ModalComponent
        visible={isShowModalNotEnoughPoint}
        title={'Không đủ điểm để nhận đơn'}
        descripttion={`Bạn không đủ điểm để nhận đơn hàng này. Bạn cần nạp thêm điểm để có thể nhận đơn`}
        descripttionStyle={{textAlign: 'center'}}
        okTitle={'Đóng'}
        onOk={() => setIsShowModalNotEnoughPoint(false)}
      />
      <ModalComponent
        visible={isShowModalCancelByUser}
        title={'Thông báo'}
        descripttion={`Đơn hàng đã bị hủy`}
        descripttionStyle={{textAlign: 'center'}}
        okTitle={'Đóng'}
        onOk={() => setIsShowModalCancelByUser(false)}
      />
      <ModalComponent
        visible={isShowModalAccountLocked}
        title={'Thông báo'}
        descripttion={`Tài khoản của bạn đã bị khóa bởi admin, vui lòng liên hệ admin để được hỗ trợ`}
        descripttionStyle={{textAlign: 'center'}}
        okTitle={'Đóng'}
        onOk={() => {
          setIsShowModalAccountLocked(false);
          onLogOut();
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 20,
  },
});

export default HomeScreen;
