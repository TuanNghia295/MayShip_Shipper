import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppRouter from './src/navigation/AppRouter';
import {appColors} from './src/constants/colors';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken = async () => {
    try {
      // Sau đó mới lấy token
      const token = await messaging().getToken();
      await AsyncStorage.setItem('fcmToken', token);
      console.log('FCM_TOKEN 🔑', token);
    } catch (error) {
      console.log('Failed to get token:', error);
    }
  };

  useEffect(() => {
    requestUserPermission();
    getToken();

    // Xử lý tin nhắn foreground
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={appColors.white} />
      <NavigationContainer>
        <AppRouter />
      </NavigationContainer>
    </>
  );
};

export default App;
