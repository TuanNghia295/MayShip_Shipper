import {useEffect, useCallback, useState} from 'react';
import {Alert, ImageBackground, Platform, StyleSheet} from 'react-native';
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
import onCheckLocationPermissions from '../../../hooks/onCheckLocationPermissions';
import Geolocation from '@react-native-community/geolocation';
import GoongService from '../../../services/goongServices';
import useUserStore from '../../../store/store';

const platForm = Platform.OS === 'ios' ? 'ios' : 'android';
const LocationScreen = () => {
  const {navigate} = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState('');
  // Lấy vị trí hiện tại
  const currentLocation = async () => {
    await onCheckLocationPermissions();
    try {
      setIsLoading(true);
      Geolocation.getCurrentPosition(
        async position => {
          setIsLoading(false);
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log('lat,long', lat, lng);
          const res = await GoongService.getCurrentLocation(lat, lng);
          // console.log('res', res.results[0].formatted_address);
          setLocation(res.results[0].formatted_address);
          // Cập nhật vị trí shipper tới BE/ truyền lat,long cách nhau dấu phẩy
          const saveLocation = useUserStore.getState().setLocation;
          saveLocation(res.results[0].formatted_address);
          saveLocation({
            address: res.results[0].formatted_address,
            geometry: `${lat},${lng}`,
          });
          // console.log('saveLocation', useUserStore.getState().location);
        },
        error => {
          setIsLoading(false);
          Alert.alert(
            'Có lỗi khi lấy vị trí. Vui lòng kiểm tra lại quyền truy cập vị trí',
            error.message,
          );
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } catch (error) {
      console.log('❌❌❌❌', error);
    }
  };

  //  Cập nhật vị trí mỗi khi trang này được focus
  useFocusEffect(
    useCallback(() => {
      currentLocation();
    }, []),
  );

  return (
    <>
      <ImageBackground
        source={require('../../../assets/images/SplashScreen.png')}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        imageStyle={{flex: 1}}>
        <SectionComponent styles={[styles.container]}>
          <RowComponent styles={[styles.rowItems]}>
            {platForm === 'ios' ? <Space width={100} /> : <Space width={40} />}
            <TextComponent
              text={<LocationMarkerWhite />}
              styles={{marginLeft: 10}}
            />
            <TextComponent text={location} size={16} styles={[styles.text]} />
          </RowComponent>
          <ButtonComponent
            type="white"
            title="Xác nhận"
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
    bottom: 160,
    paddingHorizontal: 24,
    width: '100%',
  },
  text: {
    color: 'white',
    fontFamily: fontFamilies.bold,
    marginHorizontal: 24,
    marginLeft: 10,
    width: '80%',
  },
  rowItems: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    textAlign: 'center',
  },
});

export default LocationScreen;
