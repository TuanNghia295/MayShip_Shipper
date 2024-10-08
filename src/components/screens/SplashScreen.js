import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-svg';
import {TextComponent} from '../atoms';

const SplashScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <TextComponent size={32} text={'This is SplashScreen'} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SplashScreen;
