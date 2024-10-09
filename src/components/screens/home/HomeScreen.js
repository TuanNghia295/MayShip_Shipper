import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {TextComponent} from '../../atoms';
import {globalStyles} from '../../../styles/global/GlobalStyles';
import {CurrentOrder} from '../../templates';
import {ContainerComponent} from '../../molecules';
import {orderType} from '../../../constants/orderType';

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <CurrentOrder type={orderType.Delivery} />
        <CurrentOrder type={orderType.Food} />
        <CurrentOrder type={orderType.Transportation} />
        <CurrentOrder type={orderType.AnotherShop} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 20,
  },
});

export default HomeScreen;
