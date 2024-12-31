import React, {useCallback} from 'react';
import {ActivityIndicator, ImageBackground, Platform, StatusBar, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-svg';
import {TextComponent} from '../atoms';
import {appColors} from '../../constants/colors';
import {useFocusEffect} from '@react-navigation/native';
import {END_POINTS} from '../../constants/endpoints';

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
      source={{uri: `${END_POINTS}api/images/${encodeURIComponent('assets/images/splash-screen.png')}`}}
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
