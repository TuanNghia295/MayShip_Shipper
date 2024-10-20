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
    const loginStatus = await AsyncStorage.getItem('isLogin');
    setIsLogin(loginStatus === 'true');
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
