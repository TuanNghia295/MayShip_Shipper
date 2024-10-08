import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {HomeScreen} from '../components/screens';
import OrderScreen from '../components/screens/order/OrderScreen';
import ProfileScreen from '../components/screens/profile/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {appColors} from '../constants/colors';
const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Trang chủ') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Đơn hàng') {
            iconName = focused ? 'clipboard-list' : 'clipboard-list';
          } else if (route.name === 'Cá nhân') {
            iconName = focused ? 'user-alt' : 'user-alt';
          }
          return (
            <FontAwesome5
              name={iconName}
              size={20}
              color={focused ? appColors.primary : appColors.grey}
            />
          );
        },
        tabBarActiveTintColor: appColors.black1,
      })}>
      <Tab.Screen name="Trang chủ" component={HomeScreen} />
      <Tab.Screen name="Đơn hàng" component={OrderScreen} />
      <Tab.Screen name="Cá nhân" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default TabNavigator;
