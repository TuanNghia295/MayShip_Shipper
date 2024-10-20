import React, {useCallback, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {OrderDetails} from '../../templates';
import orderServices from '../../../services/Order/orderServices';
import {useFocusEffect} from '@react-navigation/native';

const OrderScreen = () => {
  const [data, setData] = useState([]); // Lấy danh sách đơn hàng hiện tại
  const getData = async () => {
    const res = await orderServices.getCurrentOrders();
    console.log('order asdas', JSON.stringify(res));
    setData(res);
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {data.map((item, index) => {
          return (
            <OrderDetails key={item.id} items={item} onRefresh={getData} />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 20,
  },
});

export default OrderScreen;
