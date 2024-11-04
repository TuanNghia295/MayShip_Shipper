import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppRouter from './src/navigation/AppRouter';
import {appColors} from './src/constants/colors';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import store from './src/store/store';
import CodePush from 'react-native-code-push';

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
};

const App = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getToken();
    } else {
      console.log('Permission not granted');
    }
  }

  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      await AsyncStorage.setItem('fcmToken', token);
      console.log('FCM_TOKEN 🔑', token);
    } catch (error) {
      console.log('Failed to get token:', error);
    }
  };

  useEffect(() => {
    requestUserPermission();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      Toast.show({
        type: 'info',
        text1: 'Thông báo',
        text2: remoteMessage.notification?.body || 'You have a new message',
      });
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={appColors.white}
        />
        <AppRouter />
        <Toast />
      </NavigationContainer>
    </Provider>
  );
};

export default CodePush(codePushOptions)(App);
