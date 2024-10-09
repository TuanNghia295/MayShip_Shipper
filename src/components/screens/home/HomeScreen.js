import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {TextComponent} from '../../atoms';
import {globalStyles} from '../../../styles/global/GlobalStyles';
import {CurrentOrder} from '../../templates';
import {ContainerComponent} from '../../molecules';

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <CurrentOrder type={'Delivery'} />
        <CurrentOrder type={'Food'} />
        <CurrentOrder type={'Transportation'} />
        <CurrentOrder type={'AnotherShop'} />
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
