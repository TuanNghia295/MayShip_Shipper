import React, {useState} from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  Space,
  TextComponent,
} from '../../atoms';
import {appColors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';

const LoginScreen = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const onChangePhone = value => {
    setPhone(value);
  };

  const onChangePassword = value => {
    setPassword(value);
  };
  return (
    <>
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
            <InputComponent
              value={phone}
              allowClear={true}
              placeHolder={'Nhập số điện thoại'}
              onChange={onChangePhone}
            />

            {/* Mật khẩu */}
            <TextComponent text={'Mật khẩu'} font={fontFamilies.medium} />
            <InputComponent
              value={password}
              placeHolder={'Nhập mật khẩu'}
              isPassWord={true}
              onChange={onChangePassword}
            />
          </RowComponent>
          <SectionComponent
            styles={{
              width: '100%',
              paddingHorizontal: 20,
            }}>
            <ButtonComponent type="primary" title="Đăng nhập" />
          </SectionComponent>

          <Space height={50} />
          <SectionComponent
            styles={{
              width: '100%',
              paddingHorizontal: 20,
              justifyContent: 'center',
              texAlign: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <TextComponent
                text={'Đăng ký tài khoản mới'}
                color={appColors.primary}
              />
            </TouchableOpacity>
          </SectionComponent>
        </KeyboardAvoidingView>
      </SectionComponent>
    </>
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
