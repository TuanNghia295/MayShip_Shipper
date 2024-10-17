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
            iconName = 'home';
          } else if (route.name === 'Đơn hàng') {
            iconName = 'clipboard-list';
          } else if (route.name === 'Cá nhân') {
            iconName = 'user-alt';
          }
          return (
            <FontAwesome5
              name={iconName}
              size={20}
              color={focused ? appColors.primary : appColors.grayTab}
            />
          );
        },
        tabBarActiveTintColor: appColors.black1, // Set active tab label color to black
        tabBarInactiveTintColor: appColors.grayTab,
        headerStyle: {
          backgroundColor: appColors.background,
        },
        headerTitleStyle: {
          fontSize: 36,
          fontFamily: fontFamilies.bold,
        },
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        },
        tabBarLabelStyle: {
          fontFamily: fontFamilies.medium,
          fontSize: 14,
        },
      })}
      initialRouteName="Trang chủ">
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
