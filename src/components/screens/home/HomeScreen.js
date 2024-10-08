import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ButtonComponent, TextComponent} from '../../atoms';
import {globalStyles} from '../../../styles/global/GlobalStyles';

const HomeScreen = () => {
  return (
    <View style={globalStyles.container}>
      <ButtonComponent type="shortPrimary" title="Nội dung" />
      <ButtonComponent type="shortOutline" title="Nội dung" />
      <ButtonComponent type="shortGray" title="Nội dung" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
