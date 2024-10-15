import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  Space,
  TextComponent,
} from '../../atoms';
import {appColors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Avatar} from '@rneui/base';
import {
  CardAdd,
  LocationMarker,
  MailFilled,
  Timer,
} from '../../../assets/images';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const {navigate} = useNavigation();
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const onLogOut = () => {
    AsyncStorage.removeItem('shipper_token');
    navigate('Login');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* Header, contact info */}
      <SectionComponent styles={[styles.container]}>
        {/* Avatar, Tên và điểm */}
        <RowComponent
          justify="flex-start"
          alignItems="center"
          styles={{paddingBottom: 10}}>
          <Avatar
            size={76}
            rounded
            source={{uri: 'https://randomuser.me/api/portraits/men/76.jpg'}}
            containerStyle={styles.avatar}
          />

          <RowComponent
            flexDirection="column"
            alignItems="flex-start"
            justify="flex-start"
            styles={{paddingHorizontal: 25}}>
            <Space height={15} />
            <TextComponent
              text={'Phạm Thị Thuý Phương'}
              title={true}
              font={fontFamilies.medium}
              size={20}
            />
            <Space height={10} />

            <RowComponent>
              <TextComponent text={'Điểm: '} font={fontFamilies.regular} />
              <TextComponent text={'30.000'} font={fontFamilies.medium} />
            </RowComponent>
          </RowComponent>
        </RowComponent>

        {/* Contact info */}
        <SectionComponent styles={{paddingBottom: 20}}>
          <RowComponent>
            <LocationMarker width={20} height={20} />
            <Space width={10} />
            <TextComponent
              text={
                '158 An Dương Vương, phường An Lạc, Quận Bình Tân, TP. Hồ Chí Minh'
              }
              styles={{maxWidth: '80%'}}
            />
          </RowComponent>
          <Space height={10} />
          <RowComponent styles={{paddingLeft: 5}}>
            <FontAwesome6 name="phone" size={16} color={appColors.primary} />
            <Space width={10} />
            <TextComponent text={'+84684795672'} styles={{maxWidth: '100%'}} />
          </RowComponent>

          <Space height={10} />
          <RowComponent styles={{paddingLeft: 5}}>
            <MailFilled width={20} height={20} />
            <Space width={10} />
            <TextComponent
              text={'Hiện chưa có email'}
              styles={{maxWidth: '100%'}}
            />
          </RowComponent>
        </SectionComponent>
      </SectionComponent>

      {/* Options */}
      <SectionComponent styles={[styles.options]}>
        {/* Count orders, income */}
        <RowComponent styles={{display: 'flex'}} justify="center">
          <RowComponent
            flexDirection="column"
            alignItems="center"
            justify="center"
            styles={[styles.income]}>
            <TextComponent
              text={10}
              title={true}
              size={24}
              font={fontFamilies.bold}
            />
            <Space height={10} />
            <TextComponent
              styles={[styles.textInCome1]}
              text={'Số đơn đã nhận trong ngày'}
              title={true}
              font={fontFamilies.regular}
              size={Platform.OS === 'ios' ? 16 : 16}
            />
          </RowComponent>

          <Space width={10} />
          <RowComponent
            flexDirection="column"
            alignItems="center"
            justify="center"
            styles={[styles.income]}>
            <TextComponent
              text={'100.000.000'}
              title={true}
              size={24}
              font={fontFamilies.bold}
            />
            <Space height={10} />
            <TextComponent
              styles={styles.textInCome2}
              text={`Thu nhập trong ngày`}
              title={true}
              font={fontFamilies.regular}
              size={Platform.OS === 'ios' ? 16 : 16}
            />
          </RowComponent>
        </RowComponent>

        {/* Options */}
        <SectionComponent>
          <RowComponent alignItems="flex-start">
            <RowComponent styles={{flex: 1, textAlign: 'center'}}>
              <Timer width={20} height={20} />
              <Space width={10} />
              <TextComponent
                text={'Trạng thái hoạt động'}
                flex={1}
                title={true}
                size={Platform.OS === 'ios' ? 16 : 14}
              />
            </RowComponent>
            <Switch
              trackColor={{false: appColors.gray3, true: appColors.primary}}
              thumbColor={isEnabled ? appColors.primary : appColors.gray1}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </RowComponent>

          <Space height={15} />

          <RowComponent alignItems="flex-start">
            <CardAdd />
            <Space width={10} />
            <TextComponent
              title={true}
              text={'Nạp điểm'}
              size={Platform.OS === 'ios' ? 16 : 14}
            />
          </RowComponent>

          <Space height={15} />

          <RowComponent alignItems="flex-start">
            <CardAdd />
            <Space width={10} />
            <TextComponent
              text={'Chỉnh sửa thông tin'}
              title={true}
              size={Platform.OS === 'ios' ? 16 : 14}
              onPress={() => navigate('EditProfile', {screen: 'EditProfile'})}
            />
          </RowComponent>

          <Space height={15} />

          <RowComponent alignItems="flex-start">
            <CardAdd />
            <Space width={10} />
            <TextComponent
              text={'Xóa tài khoản'}
              title={true}
              size={Platform.OS === 'ios' ? 16 : 14}
            />
          </RowComponent>
        </SectionComponent>
      </SectionComponent>

      {/* Button logout */}
      <Space height={100} />
      <ButtonComponent
        type="primary"
        onPress={() => onLogOut()}
        title="Đăng xuất"
      />
      <Space height={30} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
    bottom: 0,
    marginTop: 0,
    paddingVertical: 20,
    paddingHorizontal: 24,
    // paddingBottom: 20,
  },
  options: {
    flex: 1,
    backgroundColor: appColors.gray2,
    bottom: 0,
    marginTop: 0,
    paddingHorizontal: 24,
    paddingVertical: 20,
    height: 'auto',
  },
  income: {
    flex: 1,
    backgroundColor: appColors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: appColors.gray1,
    padding: 10,
    minWidth: 158,
    minHeight: 130,
  },
  textInCome1: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  textInCome2: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center',
    marginHorizontal: 40,
  },
  avatar: {
    width: 76,
    height: 76,
  },
});

export default ProfileScreen;
