import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

// Function to request location permission for Android and iOS
const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    // Android: Use PermissionsAndroid to request location permission
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
  } else {
    // iOS: Use react-native-permissions to request location permission
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

const requestNotificationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the notification');
    } else {
      console.log('Notification permission denied');
    }
  } catch (error) {
    Alert.alert(
      'Quyền truy cập thông báo bị từ chối',
      'Vui lòng cấp quyền truy cập thông báo để sử dụng ứng dụng.',
    );
    console.log('errrer notfi', error);
  }
};

export {requestLocationPermission, requestNotificationPermission};
