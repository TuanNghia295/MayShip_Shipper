import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {Text} from 'react-native-svg';
import {TextComponent} from '../atoms';
import {appColors} from '../../constants/colors';
import {useFocusEffect} from '@react-navigation/native';

const SplashScreen = () => {
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS === 'android') {
        StatusBar.setBarStyle('light-content');
        StatusBar.setBackgroundColor(appColors.primary);
      }
    }),
  );

  return (
    <ImageBackground
      source={require('../../assets/images/SplashScreen.png')}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      imageStyle={{flex: 1}}
    ></ImageBackground>
  );
};

const styles = StyleSheet.create({});

export default SplashScreen;
