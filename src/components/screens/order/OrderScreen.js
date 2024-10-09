import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {TextComponent} from '../../atoms';
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
