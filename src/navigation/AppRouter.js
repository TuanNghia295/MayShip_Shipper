import React, {useEffect, useState} from 'react';
import SplashScreen from '../components/screens/SplashScreen';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppRouter = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isShowSplash, setIsShowSplash] = useState(true);

  // Kiểm tra đăng nhập
  const checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem('shipper_token');
      setIsLogin(!!token);
    } catch (error) {
      console.error('Failed to fetch the token from storage', error);
      setIsLogin(false);
    }
  };

  useEffect(() => {
    checkLogin();
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return isShowSplash ? (
    <SplashScreen />
  ) : isLogin ? (
    <MainNavigator />
  ) : (
    <AuthNavigator />
  );
};

export default AppRouter;
