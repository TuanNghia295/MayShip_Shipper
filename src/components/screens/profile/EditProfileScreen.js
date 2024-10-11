import React, {useState} from 'react';
import {Platform, SafeAreaView, StyleSheet, View} from 'react-native';
import {
  ButtonComponent,
  InputComponent,
  RadioButtonComponent,
  RowComponent,
  SectionComponent,
  Space,
  TextComponent,
} from '../../atoms';
import {fontFamilies} from '../../../constants/fontFamilies';
import {KeyboardAvoidingView} from 'react-native';

const EditProfileScreen = () => {
  const [selectedGender, setSelectedGender] = useState('Nữ');
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <SectionComponent styles={[styles.container]}>
          {/* Họ và tên */}
          <RowComponent
            flexDirection="column"
            alignItems="flex-start"
            justify="center">
            <TextComponent
              text={'Điền họ và tên'}
              font={fontFamilies.bold}
              required={true}
            />
            <InputComponent placeHolder={'Nhập họ và tên'} allowClear={true} />
          </RowComponent>

          {/* Password */}
          <RowComponent
            flexDirection="column"
            alignItems="flex-start"
            justify="center">
            <TextComponent
              text={'Thay đổi mật khẩu'}
              font={fontFamilies.bold}
              required={true}
            />
            <InputComponent
              placeHolder={'Nhập họ mật khẩu mới'}
              isPassWord={true}
            />
          </RowComponent>

          {/* Email */}
          <RowComponent
            flexDirection="column"
            alignItems="flex-start"
            justify="center">
            <TextComponent
              text={'Điền email'}
              font={fontFamilies.bold}
              required={true}
            />
            <InputComponent
              placeHolder={'Vui lòng điền email'}
              allowClear={true}
            />
          </RowComponent>

          {/* Birthday */}
          <RowComponent
            flexDirection="column"
            alignItems="flex-start"
            justify="center">
            <TextComponent
              text={'Ngày sinh'}
              font={fontFamilies.bold}
              required={true}
            />
            <InputComponent
              placeHolder={'ngày - tháng - năm sinh'}
              calendar={true}
            />
          </RowComponent>

          {/* Sex */}
          <RowComponent
            flexDirection="column"
            alignItems="flex-start"
            justify="center">
            <TextComponent
              text={'Giới tính'}
              font={fontFamilies.bold}
              required={true}
            />
            <Space height={5} />
            <RadioButtonComponent
              options={['Nữ', 'Nam', 'Giới tính khác']}
              selectedOption={selectedGender}
              onSelect={setSelectedGender}
            />
          </RowComponent>

          <Space height={20} />
          <ButtonComponent title="Xác nhận" type="primary" />
        </SectionComponent>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

export default EditProfileScreen;
