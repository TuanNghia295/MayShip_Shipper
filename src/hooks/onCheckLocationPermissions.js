import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

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

const onCheckLocationPermissions = async () => {
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

export default onCheckLocationPermissions;
