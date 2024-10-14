import React, {useEffect, useState} from 'react';
import SplashScreen from '../components/screens/SplashScreen';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';

const AppRouter = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isShowSplash, setIsShowSplash] = useState(true);

  //   get set token from local storage
  //   const [getToken, setToken] = useAsyncStorage('shipper_token');

  //   Kiểm tra đăng nhập
  const checkLogin = async () => {
    // Giả sử kiểm tra token từ local storage
    // const token = await getToken();
    // setIsLogin(!!token);
    setIsLogin(false); // Thay đổi giá trị này để kiểm tra điều hướng
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
