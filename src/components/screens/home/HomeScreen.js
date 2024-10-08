import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextComponent} from '../../atoms';
import {globalStyles} from '../../../styles/global/GlobalStyles';
import {CurrentOrder} from '../../templates';

const HomeScreen = () => {
  return (
    <View style={globalStyles.container}>
      <CurrentOrder />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
