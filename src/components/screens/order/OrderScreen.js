import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {OrderDetails} from '../../templates';

const OrderScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <OrderDetails />
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
