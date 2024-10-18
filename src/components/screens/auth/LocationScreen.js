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
import Geolocation from '@react-native-community/geolocation';
import GoongService from '../../../services/goongServices';
import useUserStore from '../../../store/store';
import {StatusBar} from 'react-native';
import {appColors} from '../../../constants/colors';
import onCheckLocationPermissions from '../../../hooks/onCheckLocationPermissions';

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
          console.log('res', res.results[0].formatted_address);
          setLocation(res.results[0].formatted_address);
          // Cập nhật vị trí shipper tới BE/ truyền lat,long cách nhau dấu phẩy
          const saveLocation = useUserStore.getState().setLocation;
          // saveLocation(res.results[0].formatted_address);
          saveLocation({
            address: res.results[0].formatted_address,
            geometry: `${lat},${lng}`,
          });
          console.log('saveLocation', useUserStore.getState().location);
        },
        error => {
          setIsLoading(false);
          Alert.alert(
            'Có lỗi khi lấy vị trí. Vui lòng kiểm tra lại quyền truy cập vị trí',
            error.message,
          );
        },
        {enableHighAccuracy: true, timeout: 150000, maximumAge: 100000},
      );
    } catch (error) {
      console.log('❌❌❌❌', error);
    }
  };

  //  Cập nhật vị trí mỗi khi trang này được focus
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(appColors.primary);
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
    bottom: '10%',
    paddingHorizontal: 30,
    width: '100%',
  },
  text: {
    color: 'white',
    fontFamily: fontFamilies.regular,
    marginHorizontal: 24,
    marginLeft: 10,
  },
});

export default LocationScreen;
