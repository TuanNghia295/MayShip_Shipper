import {useEffect, useCallback} from 'react';
import {
  ImageBackground,
  PermissionsAndroid,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../atoms';
import {LocationMarkerWhite} from '../../../assets/images';
import {fontFamilies} from '../../../constants/fontFamilies';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {useFocusEffect} from '@react-navigation/native';

const LocationScreen = () => {
  //Hàm yêu cầu quyền truy cập vị trí cho android và ios
  const AndroidRequestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
        Alert.alert(
          'Quyền truy cập vị trí bị từ chối',
          'Vui lòng cấp quyền truy cập vị trí để sử dụng ứng dụng.',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const checkAndRequestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (!hasPermission) {
        await AndroidRequestLocationPermission();
      }
    } else {
      // iOS: Sử dụng thư viện react-native-permissions để yêu cầu quyền truy cập vị trí
      const status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (status !== RESULTS.GRANTED) {
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (result !== RESULTS.GRANTED) {
          Alert.alert(
            'Quyền truy cập vị trí bị từ chối',
            'Vui lòng cấp quyền truy cập vị trí để sử dụng ứng dụng.',
          );
        }
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkAndRequestLocationPermission();
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
            <TextComponent
              text={<LocationMarkerWhite />}
              styles={{marginLeft: 10}}
            />
            <TextComponent
              text={
                '158 An Dương Vương, phường An Lạc, Quận Bình Tân, TP. Hồ Chí Minh'
              }
              size={16}
              styles={[styles.text]}
            />
          </RowComponent>
          <ButtonComponent
            type="white"
            title="Xác nhận"
            textStyle={{fontFamily: fontFamilies.bold}}
          />
        </SectionComponent>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 160,
    paddingHorizontal: 24,
  },
  text: {
    color: 'white',
    fontFamily: fontFamilies.bold,
    marginHorizontal: 24,
    marginLeft: 10,
  },
  rowItems: {
    alignItems: 'center',
    padding: 10,
  },
});

export default LocationScreen;
