import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const showBackgroundLocationDisclosure = async () => {
  return new Promise(resolve => {
    Alert.alert(
      'Quyền truy cập vị trí nền',
      'Ứng dụng Speed Tài Xế cần quyền truy cập vị trí của bạn ngay cả khi ứng dụng không hoạt động để đảm bảo dịch vụ giao hàng chính xác và cập nhật thông tin đơn hàng.',
      [
        {text: 'Từ chối', onPress: () => resolve(false)},
        {text: 'Đồng ý', onPress: () => resolve(true)},
      ],
      {cancelable: false},
    );
  });
};

const requestBackgroundLocationPermission = async () => {
  const hasGrantedBefore = await AsyncStorage.getItem(
    'backgroundLocationGranted',
  );
  if (hasGrantedBefore === 'true') {
    return true; // Quyền đã được cấp trước đó
  }

  const userAgreed = await showBackgroundLocationDisclosure();
  if (!userAgreed)
    return Alert.alert(
      'Quyền vị trí nền bị từ chối',
      'Bạn cần cấp quyền vị trí nền để ứng dụng hoạt động đúng cách.',
    ); // Người dùng từ chối

  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Quyền vị trí nền đã được cấp');
        await AsyncStorage.setItem('backgroundLocationGranted', 'true');
        return true;
      } else {
        Alert.alert(
          'Quyền vị trí nền bị từ chối',
          'Bạn cần cấp quyền vị trí nền để ứng dụng hoạt động đúng cách.',
        );
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    const result = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
    if (result === RESULTS.GRANTED) {
      console.log('Quyền vị trí nền đã được cấp');
      await AsyncStorage.setItem('backgroundLocationGranted', 'true');
      return true;
    } else {
      Alert.alert(
        'Quyền vị trí nền bị từ chối',
        'Bạn cần cấp quyền vị trí nền để ứng dụng hoạt động đúng cách.',
      );
      return false;
    }
  }
};

// Function to request location permission for Android and iOS
const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Quyền vị trí được cấp');
        return true;
      } else {
        Alert.alert(
          'Quyền truy cập vị trí bị từ chối',
          'Vui lòng cấp quyền truy cập vị trí để sử dụng ứng dụng.',
        );
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    const status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if (status === RESULTS.GRANTED) {
      console.log('Quyền vị trí được cấp');
      return true;
    }
    const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if (result === RESULTS.GRANTED) {
      console.log('Quyền vị trí được cấp');
      return true;
    } else {
      Alert.alert(
        'Quyền truy cập vị trí bị từ chối',
        'Vui lòng cấp quyền truy cập vị trí để sử dụng ứng dụng.',
      );
      return false;
    }
  }
};

const requestNotificationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Quyền thông báo được cấp');
        return true;
      } else {
        Alert.alert(
          'Quyền truy cập thông báo bị từ chối',
          'Vui lòng cấp quyền truy cập thông báo để sử dụng ứng dụng.',
        );
        return false;
      }
    } catch (error) {
      console.error('Lỗi khi yêu cầu quyền thông báo:', error);
      return false;
    }
  } else {
    const status = await check(PERMISSIONS.IOS.NOTIFICATIONS);
    if (status === RESULTS.GRANTED) {
      console.log('Quyền thông báo được cấp');
      return true;
    }
    const result = await request(PERMISSIONS.IOS.NOTIFICATIONS);
    if (result === RESULTS.GRANTED) {
      console.log('Quyền thông báo được cấp');
      return true;
    } else {
      Alert.alert(
        'Quyền truy cập thông báo bị từ chối',
        'Vui lòng cấp quyền truy cập thông báo để sử dụng ứng dụng.',
      );
      return false;
    }
  }
};

export {
  requestLocationPermission,
  requestNotificationPermission,
  requestBackgroundLocationPermission,
};
