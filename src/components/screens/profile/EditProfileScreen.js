import React, {useState} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
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
import {appColors} from '../../../constants/colors';
import {ModalComponent} from '../../organisms';
import {Controller, useForm} from 'react-hook-form';
import ShipperServices from '../../../services/Shipper/shipperServices';
import {useNavigation} from '@react-navigation/native';

const EditProfileScreen = () => {
  const {goBack} = useNavigation();
  const [selectedGender, setSelectedGender] = useState('FEMALE');
  const [isShowModal, setIsShowModal] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
    trigger,
  } = useForm();

  const genderOptions = [
    {label: 'Nữ', value: 'FEMALE'},
    {label: 'Nam', value: 'MALE'},
    {label: 'Giới tính khác', value: 'OTHER'},
  ];

  const onSubmit = async data => {
    console.log('Form Data:', data);
    try {
      const res = await ShipperServices.updateShipper({
        fullName: data.fullName,
        password: data.newPassword,
        email: data.email,
        // dateOfBirth: data.birthday,
        gender: data.gender,
      });
      console.log('res 😘', res);
      setIsShowModal(true);
    } catch (error) {
      console.log('Error during update info shipper', error);
    }
  };

  return (
    <ScrollView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <SectionComponent styles={[styles.container]}>
          {/* Họ và tên */}
          <RowComponent
            flexDirection="column"
            alignItems="flex-start"
            justify="center"
          >
            <TextComponent
              text={'Điền họ và tên'}
              font={fontFamilies.bold}
              required={true}
            />
            <Controller
              control={control}
              name="fullName"
              rules={{
                required: 'Họ và tên là bắt buộc',
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <InputComponent
                    value={value}
                    placeHolder={'Nhập họ và tên'}
                    allowClear={true}
                    onChange={e => {
                      onChange(e);
                      trigger('fullName');
                    }}
                  />
                  {errors.fullName && (
                    <TextComponent text={errors.fullName.message} color="red" />
                  )}
                </>
              )}
            />
          </RowComponent>

          {/* Password */}
          <RowComponent
            flexDirection="column"
            alignItems="flex-start"
            justify="center"
          >
            <TextComponent
              text={'Thay đổi mật khẩu'}
              font={fontFamilies.bold}
              required={true}
            />
            <Controller
              control={control}
              name="newPassword"
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <InputComponent
                    placeHolder={'Nhập mật khẩu mới'}
                    isPassWord={true}
                    value={value}
                    onChange={onChange}
                  />
                  <TextComponent
                    text={
                      'Nếu không muốn đổi mật khẩu mới thì vui lòng nhập lại mật khẩu cũ'
                    }
                    size={12}
                    color={appColors.red}
                  />
                  {errors.newPassword && (
                    <TextComponent
                      text={errors.newPassword.message}
                      color="red"
                    />
                  )}
                  <Space height={10} />
                </>
              )}
            />
          </RowComponent>

          {/* Email */}
          <RowComponent
            flexDirection="column"
            alignItems="flex-start"
            justify="center"
          >
            <TextComponent
              text={'Điền email'}
              font={fontFamilies.bold}
              required={false}
            />
            <Controller
              control={control}
              name="email"
              rules={{
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Email không hợp lệ',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <InputComponent
                    placeHolder={'Vui lòng điền email'}
                    allowClear={true}
                    value={value}
                    onChange={e => {
                      onChange(e);
                      trigger('email');
                    }}
                  />
                  {errors.email && (
                    <TextComponent text={errors.email.message} color="red" />
                  )}
                </>
              )}
            />
          </RowComponent>

          {/* Birthday */}
          <RowComponent
            flexDirection="column"
            alignItems="flex-start"
            justify="center"
          >
            <TextComponent
              text={'Ngày sinh'}
              font={fontFamilies.bold}
              required={false}
            />
            <Controller
              control={control}
              name="birthday"
              render={({field: {onChange, onBlur, value}}) => (
                <InputComponent
                  value={value}
                  placeHolder={'Ngày tháng năm sinh'}
                  calendar={true}
                  onChange={e => {
                    onChange(e);
                    trigger('birthday');
                  }}
                />
              )}
            />
          </RowComponent>

          {/* Sex */}
          <RowComponent
            flexDirection="column"
            alignItems="flex-start"
            justify="center"
          >
            <TextComponent
              text={'Giới tính'}
              font={fontFamilies.bold}
              required={false}
            />
            <Space height={10} />
            <Controller
              control={control}
              name="gender"
              defaultValue={selectedGender}
              render={({field: {onChange, value}}) => (
                <RadioButtonComponent
                  options={genderOptions}
                  selectedOption={selectedGender}
                  onSelect={selectedValue => {
                    console.log('Selected value:', selectedValue);
                    setSelectedGender(selectedValue);
                    onChange(selectedValue); // Cập nhật giá trị của React Hook Form
                  }}
                />
              )}
            />
          </RowComponent>

          <Space height={20} />
          <RowComponent>
            <ButtonComponent
              title="Xác nhận"
              type="primary"
              onPress={handleSubmit(onSubmit)}
            />
          </RowComponent>

          {/* Modal */}
          <ModalComponent
            visible={isShowModal}
            title={'Đã lưu'}
            descripttion={'Thông tin vừa nhập đã được lưu'}
            okTitle={'Quay về trang cá nhân'}
            onOk={() => goBack()}
          />
        </SectionComponent>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

export default EditProfileScreen;
