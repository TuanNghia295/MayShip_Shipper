import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ButtonComponent, InputComponent, TextComponent} from '../../atoms';
import {globalStyles} from '../../../styles/global/GlobalStyles';

const HomeScreen = () => {
  return (
    <View style={globalStyles.container}>
      <TextComponent text={'Home Screen'} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
