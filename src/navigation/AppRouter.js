import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import SplashScreen from '../components/screens/SplashScreen';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComponent from '../components/atoms/LoadingComponent';
import CodePush from 'react-native-code-push';
import {useDispatch} from 'react-redux';
import {setUserInfo} from '../store/userSlice.js';
import ShipperServices from '../services/Shipper/shipperServices.js';

const AppRouter = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [showModalLoading, setShowModalLoading] = useState(false);
  const [receivedBytes, setReceivedBytes] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);
  const [isUpdating, setIsUpdating] = useState(true);
  const dispatch = useDispatch();
  // Kiểm tra đăng nhập
  const checkLogin = async () => {
    const loginStatus = await AsyncStorage.getItem('isLogin');
    setIsLogin(loginStatus === 'true');
    console.log('loginStatus', loginStatus);
    if (loginStatus === 'true') {
      const res = await ShipperServices.infoShipper();
      dispatch(setUserInfo(res));
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const updateApp = () => {
    CodePush.sync(
      {updateDialog: false, installMode: CodePush.InstallMode.IMMEDIATE},
      status => {
        switch (status) {
          case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
            console.log('Checking for update');
            break;
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            console.log('Downloading package');
            setShowModalLoading(true);
            break;
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            console.log('Installing update');
            break;
          case CodePush.SyncStatus.UPDATE_INSTALLED:
            console.log('Update installed');
            Alert.alert('Ứng dụng đã được cập nhật', 'Bản cập nhật mới nhất đã được cài đặt thành công', [{text: 'Đồng ý', onPress: () => setIsUpdating(false)}]);
            setShowModalLoading(false);
            break;
          case CodePush.SyncStatus.UPDATE_IGNORED:
            console.log('Update ignored');
            setIsUpdating(false);
            break;
          case CodePush.SyncStatus.UPDATE_FAILED:
            console.log('Update failed');
            setShowModalLoading(false);
            setIsUpdating(false);
            break;
          default:
            console.log('Nothing new', status);
            setIsUpdating(false);
            break;
        }
      },
      ({receivedBytes, totalBytes}) => {
        setReceivedBytes(receivedBytes);
        setTotalBytes(totalBytes);
        console.log('receivedBytes: ' + receivedBytes + ' totalBytes: ' + totalBytes);
      },
    );
  };

  useEffect(() => {
    const init = async () => {
      try {
        const update = await CodePush.checkForUpdate();
        console.log('Thông tin về bản cập nhật mới nhất:', update);
        if (!update) {
          console.log('App is up to date');
          setIsUpdating(false);
          setTimeout(() => {
            setIsShowSplash(false);
          }, 1500);
        } else {
          if (update.isMandatory) {
            Alert.alert(
              'Thông báo',
              'Có một bản cập nhật mới, hãy cập nhật lên phiên bản mới nhất để sử dụng',
              [
                {
                  text: 'Cập nhật',
                  onPress: () => {
                    updateApp();
                  },
                },
              ],
              {cancelable: false},
            );
          } else {
            Alert.alert(
              'Thông báo',
              'Có một bản cập nhật mới, bạn có muốn cập nhật không?',
              [
                {
                  text: 'Không',
                  onPress: () => {
                    console.log('Người dùng không muốn cập nhật');
                    setIsUpdating(false);
                    setTimeout(() => {
                      setIsShowSplash(false);
                    }, 1500);
                  },
                  style: 'cancel',
                },
                {
                  text: 'Cập nhật',
                  onPress: () => {
                    updateApp();
                  },
                },
              ],
              {cancelable: false},
            );
          }
        }
      } catch (error) {
        console.log('Failed to check for update:', error);
        setIsUpdating(false);
        setTimeout(() => {
          setIsShowSplash(false);
        }, 1500);
      }
    };

    init();
  }, []);

  if (isUpdating) {
    return <LoadingComponent visible={showModalLoading} receivedBytes={receivedBytes} totalBytes={totalBytes} />;
  }

  return isShowSplash ? <SplashScreen /> : isLogin ? <MainNavigator /> : <AuthNavigator />;
};

export default AppRouter;
