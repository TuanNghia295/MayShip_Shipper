import React, {useState} from 'react';
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
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
import {useNavigation} from '@react-navigation/native';
import {startRefreshTokenTimer} from './TokenTimer';

const platForm = Platform.OS == 'ios' ? 'ios' : 'android';
const LoginScreen = () => {
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

  //  Xử lý đăng nhập
  const onSubmit = async data => {
    try {
      setIsLoading(true);
      console.log('data', data);
      const res = await loginServices.login(data);
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
        setIsLoading(false);
        navigate('Main');
      } else {
        setIsLoading(false);
        Alert.alert('Đăng nhập không thành công');
      }
    } catch (error) {
      console.log('error login ❌❌', error);
      setIsLoading(false);
      if (error.statusCode === 401) {
        setDescripttion(
          'Bạn đã nhập sai tài khoản hoặc mật khẩu. Vui lòng kiểm tra lại thông tin đăng nhập.',
        );
      } else if (error.statusCode === 403) {
        setDescripttion(
          'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ đến admin để được mở lại tài khoản.',
        );
      }
      setIsShowModal(true);
    }
  };

  const handleRegisterPress = () => {
    Linking.openURL(`tel:`);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: appColors.white}}>
      <ImageBackground
        source={require('../../../assets/images/SplashScreen.png')}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        imageStyle={{flex: 1}}></ImageBackground>
      <SectionComponent styles={[styles.container]}>
        <KeyboardAvoidingView>
          {/* Đăng nhập */}
          <RowComponent
            flexDirection="column"
            alignItems="flex-start"
            justify="flex-start"
            styles={{padding: 25, paddingBottom: 0}}>
            <Space height={15} />
            <TextComponent text={'Đăng nhập'} title={true} size={24} />
            <Space height={15} />

            {/* Số điện thoại */}
            <TextComponent text={'Số điện thoại'} font={fontFamilies.medium} />
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
                    <TextComponent text={errors.password.message} color="red" />
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
          <SectionComponent
            styles={{
              width: '100%',
              paddingHorizontal: 20,
              justifyContent: 'center',
              texAlign: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={handleRegisterPress}>
              <TextComponent
                text={'Đăng ký tài khoản mới'}
                color={appColors.primary}
              />
            </TouchableOpacity>
          </SectionComponent>
        </KeyboardAvoidingView>
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
          paddingHorizontal: 10,
        }}
        onOk={() => setIsShowModal(false)}
      />

      <LoadingComponent visible={isLoading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
    bottom: 0,
    marginTop: 0,
  },
});

export default LoginScreen;
