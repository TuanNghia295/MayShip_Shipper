import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LocationScreen, LoginScreen} from '../components/screens';
import TabNavigator from './TabNavigator';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Location">
      <Stack.Screen name="Location" component={LocationScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
