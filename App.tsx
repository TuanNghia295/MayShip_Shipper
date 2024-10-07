import React from 'react';
import {Alert, StatusBar, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppRouter from './src/navigation/AppRouter';
import {globalStyles} from './src/styles/global/GlobalStyles';
import {ButtonComponent, RowComponent} from './src/components/atoms';
import TextComponent from './src/components/atoms/TextComponent';
const App = () => {
  return (
    // <>
    //   <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
    //   <NavigationContainer>
    //     <AppRouter />
    //   </NavigationContainer>
    // </>
    <View style={globalStyles.container}></View>
  );
};

export default App;
