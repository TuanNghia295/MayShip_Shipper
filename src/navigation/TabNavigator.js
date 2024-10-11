import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {HomeScreen} from '../components/screens';
import OrderScreen from '../components/screens/order/OrderScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {appColors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';
import ProfileStack from './ProfileStack';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
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
        headerStyle: {
          backgroundColor: appColors.background,
        },
        headerTitleStyle: {
          fontSize: 36,
          fontFamily: fontFamilies.bold,
        },
      })}>
      <Tab.Screen
        name="Trang chủ"
        component={HomeScreen}
        options={{title: 'Danh sách đơn hàng', tabBarLabel: 'Trang chủ'}}
      />
      <Tab.Screen
        name="Đơn hàng"
        component={OrderScreen}
        options={{title: 'Đơn hàng hiện tại', tabBarLabel: 'Đơn hàng'}}
      />
      <Tab.Screen
        name="Cá nhân"
        component={ProfileStack}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default TabNavigator;
