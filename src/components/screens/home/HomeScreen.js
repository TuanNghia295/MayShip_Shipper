import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {TextComponent} from '../../atoms';
import {globalStyles} from '../../../styles/global/GlobalStyles';
import {CurrentOrder} from '../../templates';
import {ContainerComponent} from '../../molecules';
import {ORDERTYPE} from '../../../constants/orderType';
import {useFocusEffect} from '@react-navigation/native';
import {appColors} from '../../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import orderServices from '../../../services/Order/orderServices';
import {
  socketConnect,
  socketEmit,
  socketOn,
} from '../../../services/socketServices';
import {idSelector} from '../../../store/userSlice.js';
import ModalComponent from '../../organisms/ModalComponent.js';
import ShipperServices from '../../../services/Shipper/shipperServices.js';

const HomeScreen = () => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(appColors.background);
    }, []),
  );

  const [data, setData] = useState([]); // Lấy danh sách đơn hàng
  const id = useSelector(idSelector); // Lấy id từ Redux store
  const [isShowModalNotEnoughPoint, setIsShowModalNotEnoughPoint] =
    useState(false);
  // Danh sách đơn hàng
  const getList = async () => {
    const res = await orderServices.getOrders();
    console.log('order', JSON.stringify(res));
    setData(res);
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

  useFocusEffect(
    useCallback(() => {
      getShipperInfo();
      getList();
    }, []),
  );

  useEffect(() => {
    if (id) {
      socketConnect();
      console.log('first', id);
      socketEmit('join-room', {deliverId: id});
      socketOn('refresh-order', data => {
        console.log('dataa ❌❌❌❌❌', data);
        getList();
      });
    }
  }, [id]);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {data.map(item => {
          return (
            <CurrentOrder key={item.id} items={item} onRefresh={getList} />
          );
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 20,
  },
});

export default HomeScreen;
