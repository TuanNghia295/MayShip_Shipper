import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import ProfileScreen from '../components/screens/profile/ProfileScreen';
import EditProfileScreen from '../components/screens/profile/EditProfileScreen';
import ReportScreen from '../components/screens/profile/ReportScreen';

const ProfileStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: 'Chỉnh sửa thông tin',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Report"
        component={ReportScreen}
        options={{
          title: 'Chỉnh sửa thông tin',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default ProfileStack;
