import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppRouter from './src/navigation/AppRouter';
import {appColors} from './src/constants/colors';

const App = () => {
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
