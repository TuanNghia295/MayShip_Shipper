import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppRouter from './src/navigation/AppRouter';
import {appColors} from './src/constants/colors';
import messaging from '@react-native-firebase/messaging';

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
    const token = await messaging().getToken();
    console.log('token', token);
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
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
