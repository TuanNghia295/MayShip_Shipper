import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LocationScreen, LoginScreen} from '../components/screens';
import TabNavigator from './TabNavigator';
import {StatusBar} from 'react-native';
import {appColors} from '../constants/colors';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={appColors.primary}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Location">
        <Stack.Screen name="Location" component={LocationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    </>
  );
};

export default AuthNavigator;
