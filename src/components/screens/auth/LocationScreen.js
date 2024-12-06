import React, {useEffect, useState, useCallback} from 'react';
import {
  Alert,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Linking,
  AppState,
} from 'react-native';
import {
  ButtonComponent,
  LoadingComponent,
  RowComponent,
  SectionComponent,
  Space,
  TextComponent,
} from '../../atoms';
import {LocationMarkerWhite} from '../../../assets/images';
import {fontFamilies} from '../../../constants/fontFamilies';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import GoongService from '../../../services/goongServices';
import {appColors} from '../../../constants/colors';
import {useDispatch} from 'react-redux';
import {setLocation} from '../../../store/userSlice.js';
import {requestLocationPermission} from '../../../hooks/onCheckPermissions.js';

const SplashScreenPng = require('../../../assets/images/SplashScreen.png');
const LocationScreen = () => {
  const {navigate} = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocationTitle] = useState('');
  const [appState, setAppState] = useState(AppState.currentState); // Theo dõi trạng thái ứng dụng
  const [hasBackgroundPermission, setHasBackgroundPermission] = useState(false);
  const [permissionRequested, setPermissionRequested] = useState(false); // Theo dõi trạng thái yêu cầu quyền
  const dispatch = useDispatch();

  // Lấy vị trí hiện tại
  const currentLocation = async () => {
    if (permissionRequested) return; // Nếu quyền đã được xử lý, không yêu cầu lại
    setPermissionRequested(true);

    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      setLocationTitle(
        'Không thể lấy vị trí của bạn, vui lòng thử lại sau hoặc kiểm tra lại quyền truy cập vị trí.',
      );
      Alert.alert(
        'Quyền truy cập vị trí bị từ chối',
        'Vui lòng cấp quyền truy cập vị trí để sử dụng ứng dụng.',
        [
          {
            text: 'Hủy',
            onPress: () => setPermissionRequested(false), // Reset trạng thái
            style: 'cancel',
          },
          {
            text: 'Cài đặt',
            onPress: async () => {
              setPermissionRequested(false); // Reset trạng thái khi chuyển đến Settings
              await Linking.openSettings();
            },
          },
        ],
      );
      return;
    }
    setHasBackgroundPermission(true);
    setIsLoading(true);
    Geolocation.getCurrentPosition(
      async position => {
        try {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          // const lat = 10.951501;
          // const lng = 106.822311;
          const res = await GoongService.getCurrentLocation(lat, lng);
          if (res?.results?.[0]?.formatted_address) {
            const address = res.results[0].formatted_address;
            setLocationTitle(address);
            dispatch(setLocation({address, geometry: `${lat},${lng}`}));
          } else {
            throw new Error('Không tìm thấy địa chỉ phù hợp từ API.');
          }
        } catch (error) {
          Alert.alert('Lỗi', `Không thể lấy địa chỉ: ${error.message}`);
        } finally {
          setIsLoading(false);
        }
      },
      error => {
        setIsLoading(false);
        setLocationTitle(
          'Không thể lấy vị trí của bạn, vui lòng thử lại sau hoặc kiểm tra lại quyền truy cập vị trí.',
        );
        setHasBackgroundPermission(false);
        console.log('errrrrrr', error);
        Alert.alert(
          'Lỗi vị trí',
          'Ứng dụng của chúng tôi chỉ có thể lấy vị trí ở VietNam',
          [{text: 'Đã hiểu'}],
        );
      },
      {enableHighAccuracy: true, timeout: 30000, maximumAge: 10000},
    );
  };

  // Xử lý trạng thái của ứng dụng (AppState)
  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        setPermissionRequested(false); // Reset trạng thái khi quay lại foreground
        currentLocation(); // Cập nhật lại vị trí
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => subscription.remove();
  }, [appState]);

  // Gọi cập nhật vị trí khi màn hình được focus (trường hợp dùng navigation)
  useFocusEffect(
    useCallback(() => {
      currentLocation(); // Gọi ngay khi component được mount
    }, []), // Không cần phụ thuộc vào isFocused
  );

  return (
    <>
      <StatusBar backgroundColor={appColors.primary} barStyle="light-content" />
      <ImageBackground
        source={SplashScreenPng}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        imageStyle={{flex: 1}}
      >
        <SectionComponent styles={[styles.container]}>
          <RowComponent>
            <TextComponent text={<LocationMarkerWhite />} />
            <TextComponent
              text={location}
              font={fontFamilies.medium}
              size={16}
              styles={[styles.text]}
            />
          </RowComponent>
          <Space height={15} />
          <ButtonComponent
            type={hasBackgroundPermission ? 'white' : 'gray'}
            title="Xác nhận"
            isDisable={!hasBackgroundPermission}
            onPress={() => navigate('Login')}
            textStyle={{fontFamily: fontFamilies.bold}}
          />
        </SectionComponent>
      </ImageBackground>

      <LoadingComponent visible={isLoading} isTransparent={true} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: '10%',
    paddingHorizontal: 30,
    width: '100%',
  },
  text: {
    color: 'white',
    marginHorizontal: 24,
    marginLeft: 10,
  },
});

export default LocationScreen;
