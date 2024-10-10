import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {TextComponent} from '../../atoms';
import {globalStyles} from '../../../styles/global/GlobalStyles';
import {CurrentOrder} from '../../templates';
import {ContainerComponent} from '../../molecules';
import {ORDERTYPE} from '../../../constants/orderType';

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <CurrentOrder type={ORDERTYPE.Delivery} />
        <CurrentOrder type={ORDERTYPE.Food} />
        <CurrentOrder type={ORDERTYPE.Transportation} />
        <CurrentOrder type={ORDERTYPE.AnotherShop} />
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
