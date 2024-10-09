import React from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import {Text} from 'react-native-svg';
import {TextComponent} from '../atoms';
import {appColors} from '../../constants/colors';

const SplashScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/SplashScreen.png')}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      imageStyle={{flex: 1}}></ImageBackground>
  );
};

const styles = StyleSheet.create({});

export default SplashScreen;
