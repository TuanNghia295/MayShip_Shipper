import React, {useCallback, useState} from 'react';
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ButtonComponent,
  InputComponent,
  LoadingComponent,
  RowComponent,
  SectionComponent,
  Space,
  TextComponent,
} from '../../atoms';
import {appColors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {ModalComponent} from '../../organisms';
import {Controller, useForm} from 'react-hook-form';
import {regexPattern} from '../../../constants/regex';
import {loginServices} from '../../../services/Login/loginServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {startRefreshTokenTimer} from './TokenTimer';
import {useDispatch, useSelector} from 'react-redux';
import ShipperServices from '../../../services/Shipper/shipperServices';
import {StatusBar} from 'react-native';
import {setUserInfo} from '../../../store/userSlice.js';

const platForm = Platform.OS == 'ios' ? 'ios' : 'android';
const LoginScreen = () => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(appColors.primary);
    }, []),
  );

  const {
    control,
    handleSubmit,
    formState: {errors},
    trigger,
  } = useForm();
  const {navigate} = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [descripttion, setDescripttion] = useState('');

  const dispatch = useDispatch();
  const shipperLocation = useSelector(state => state.user.location);

  // Lấy vị trí hiện tại của Shipper và đẩy lên BE
  const handlePushLocation = async () => {
    try {
      const res = await ShipperServices.updateShipper({
        location: shipperLocation,
      });
      console.log('Update Shipper Info 🥷', res);

      // Chỉ lưu thông tin shipper sau khi cập nhật thành công
      dispatch(setUserInfo(res));
    } catch (error) {
      console.log('error when update location of shipper to server', error);
    }
  };

  // Xử lý trả về thông báo dựa theo lỗi
  const handleReturnMessage = error => {
    switch (error.statusCode) {
      case 401:
        return setDescripttion(
          'Bạn đã nhập sai tài khoản hoặc mật khẩu. Vui lòng kiểm tra lại thông tin đăng nhập.',
        );
      case 403:
        return setDescripttion(
          'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ đến admin để được mở lại tài khoản.',
        );
      case 422:
        return setDescripttion('Mật khẩu tối thiểu 6 ký tự');
      default:
        return setDescripttion('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  //  Xử lý đăng nhập
  const onSubmit = async data => {
    try {
      setIsLoading(true);
      console.log('data', data);

      // Lấy fcmToken từ AsyncStorage
      const fcmToken = await AsyncStorage.getItem('fcmToken');

      // Gửi thông tin đăng nhập cùng với fcmToken
      const res = await loginServices.login({
        ...data,
        fcmToken,
      });

      console.log('res', res);
      const {accessToken, expires, refreshToken} = res;
      if (accessToken) {
        await AsyncStorage.setItem('shipper_token', accessToken);
        await AsyncStorage.setItem('shipper_refresh_token', refreshToken);
        await AsyncStorage.setItem('expires', expires.toString());

        // Bắt đầu timer để refresh token tự động trước khi hết hạn
        startRefreshTokenTimer(Number(expires), async () => {
          const newAccessToken = await loginServices.refreshToken();
          console.log('newAccessToken', newAccessToken);
          const newExpires = await AsyncStorage.getItem('expires');
          startRefreshTokenTimer(
            Number(newExpires),
            loginServices.refreshToken,
          );
        });

        // cập nhật vị trí shipper lên BE
        handlePushLocation();
        setIsLoading(false);
        navigate('Main');
      } else {
        setIsShowModal(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log('error login ❌❌', error);
      setIsLoading(false);
      handleReturnMessage(error);
      setIsShowModal(true);
    }
  };

  // Đăng ký tài khoản mới
  const handleRegisterPress = () => {
    Linking.openURL(`tel:0969415864`);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={require('../../../assets/images/SplashScreen.png')}
        style={{
          flex: 0.8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        imageStyle={{flex: 1}}></ImageBackground>
      <SectionComponent styles={[styles.container]}>
        <ScrollView>
          <KeyboardAvoidingView>
            {/* Đăng nhập */}
            <RowComponent
              flexDirection="column"
              alignItems="flex-start"
              justify="flex-start"
              styles={{padding: 25, paddingBottom: 0, marginTop: 15}}>
              <TextComponent text={'Đăng nhập'} title={true} size={24} />
              <Space height={15} />

              {/* Số điện thoại */}
              <TextComponent
                text={'Số điện thoại'}
                font={fontFamilies.medium}
              />
              <Controller
                control={control}
                name="phone"
                rules={{
                  required: 'Số điện thoại là bắt buộc',
                  pattern: {
                    value: regexPattern.phone,
                    message: 'Số điện thoại không hợp lệ',
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <>
                    <InputComponent
                      value={value}
                      allowClear={true}
                      placeHolder={'Nhập số điện thoại'}
                      onChange={e => {
                        onChange(e);
                        trigger('phone');
                      }}
                    />
                    {errors.phone && (
                      <TextComponent text={errors.phone.message} color="red" />
                    )}
                  </>
                )}
              />
              <Space height={5} />

              {/* Mật khẩu */}
              <TextComponent text={'Mật khẩu'} font={fontFamilies.medium} />
              <Controller
                control={control}
                name="password"
                rules={{required: 'Mật khẩu là bắt buộc'}}
                render={({field: {onChange, onBlur, value}}) => (
                  <>
                    <InputComponent
                      value={value}
                      placeHolder={'Nhập mật khẩu'}
                      isPassWord={true}
                      onChange={e => {
                        onChange(e);
                        trigger('password');
                      }}
                    />
                    {errors.password && (
                      <TextComponent
                        text={errors.password.message}
                        color="red"
                      />
                    )}
                  </>
                )}
              />
            </RowComponent>

            {/* Đăng nhập button */}
            <SectionComponent
              styles={{
                width: '100%',
                paddingHorizontal: 20,
              }}>
              <ButtonComponent
                type="primary"
                title="Đăng nhập"
                onPress={handleSubmit(onSubmit)}
              />
            </SectionComponent>

            {platForm === 'ios' ? <Space height={30} /> : <Space height={50} />}

            {/* Đăng kí */}
            <ButtonComponent
              type="empty"
              title="Đăng kí tài khoản mới"
              textStyle={{color: appColors.primary}}
              onPress={handleRegisterPress}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </SectionComponent>

      <ModalComponent
        visible={isShowModal}
        okTitle={'Đóng thông báo'}
        title={'Không đăng nhập được'}
        descripttion={
          descripttion ??
          'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ đến admin để được mở lại tài khoản.'
        }
        descripttionStyle={{
          textAlign: 'center',
          justifyContent: 'center',
        }}
        onOk={() => setIsShowModal(false)}
      />

      <LoadingComponent visible={isLoading} isTransparent={true} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
    marginTop: 0,
    position: 'static',
  },
});

export default LoginScreen;
