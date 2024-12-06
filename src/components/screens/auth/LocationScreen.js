import {useEffect, useCallback, useState} from 'react';
import {
  Alert,
  ImageBackground,
  Platform,
  StyleSheet,
  StatusBar,
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
import {useDispatch, useSelector} from 'react-redux';
import {setLocation} from '../../../store/userSlice.js';
import {
  requestBackgroundLocationPermission,
  requestLocationPermission,
} from '../../../hooks/onCheckPermissions.js';

const platForm = Platform.OS === 'ios' ? 'ios' : 'android';
const LocationScreen = () => {
  const {navigate} = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocationTitle] = useState('');
  const [hasBackgroundPermission, setHasBackgroundPermission] = useState(false); // Thêm state để lưu trữ trạng thái quyền vị trí nền
  const dispatch = useDispatch();
  const locationSelector = useSelector(state => state.location);

  // Lấy vị trí hiện tại
  const currentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    const hasBackgroundPermission = await requestBackgroundLocationPermission();
    if (!hasPermission || !hasBackgroundPermission) {
      return;
    } else {
      setHasBackgroundPermission(true);
    }
    setIsLoading(true);
    Geolocation.getCurrentPosition(
      async position => {
        try {
          const {latitude: lat, longitude: lng} = position.coords;
          console.log('lat,long', lat, lng);
          const res = await GoongService.getCurrentLocation(lat, lng);
          if (res?.results?.[0]?.formatted_address) {
            const address = res.results[0].formatted_address;
            console.log('Địa chỉ:', address);
            setLocationTitle(address);
            dispatch(
              setLocation({
                address,
                geometry: `${lat},${lng}`,
              }),
            );
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
        setLocation('Không thể lấy vị trí của bạn');
        setHasBackgroundPermission(false);
        Alert.alert(
          'Lỗi vị trí',
          'Ứng dụng của chúng tôi chỉ có thể lấy vị trí ở VietNam',
          [{text: 'Đã hiểu'}],
        );
      },
      {enableHighAccuracy: true, timeout: 300000, maximumAge: 10000},
    );
  };

  //  Cập nhật vị trí mỗi khi trang này được focus
  useFocusEffect(
    useCallback(() => {
      currentLocation();
    }, []),
  );

  return (
    <>
      <StatusBar backgroundColor={appColors.primary} barStyle="light-content" />
      <ImageBackground
        source={require('../../../assets/images/SplashScreen.png')}
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
            type={hasBackgroundPermission === true ? 'white' : 'gray'}
            title="Xác nhận"
            isDisable={!hasBackgroundPermission} // Sử dụng giá trị của hasBackgroundPermission
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
