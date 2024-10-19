import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  View,
} from 'react-native';
import {
  ButtonComponent,
  LoadingComponent,
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
  ChartOutlined,
  LocationMarker,
  MailFilled,
  Timer,
  UserEdit,
  UserRemove,
} from '../../../assets/images';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {stopRefreshTokenTimer} from '../auth/TokenTimer';
import ShipperServices from '../../../services/Shipper/shipperServices';
import {toPrice} from '../../../hooks/toPrice';
import useUserStore from '../../../store/store';
import {useDispatch} from 'react-redux';
import {setUserInfo} from '../../../store/userSlice.js';

const {width: screenWidth} = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  // Đăng xuất
  const onLogOut = async () => {
    try {
      stopRefreshTokenTimer();
      // Xóa thông tin token khỏi AsyncStorage
      await AsyncStorage.removeItem('shipper_token');
      await AsyncStorage.removeItem('shipper_refresh_token');
      await AsyncStorage.removeItem('expires');
      dispatch(setUserInfo({}));
      navigation.navigate('Location');
    } catch (error) {
      console.log('Lỗi khi đăng xuất:', error);
    }
  };

  const [data, setData] = useState({}); // Thông tin shipper
  const handleGetInfo = async () => {
    try {
      setIsModalOpen(true);
      const res = await ShipperServices.infoShipper();
      console.log('res', res);
      setData(res);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 500);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetInfo();
  }, []);

  // actived: tình trạng hoạt động của shipper
  // status: admin dùng để khóa tài khoản
  const {
    activated,
    avatar,
    dateOfBirth,
    fullName,
    gender,
    id,
    location,
    phone,
    point,
    email,
    income,
    status,
  } = data;
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        {/* Header, contact info */}
        <SectionComponent styles={[styles.container]}>
          {/* Avatar, Tên  */}
          <RowComponent
            justify="flex-start"
            alignItems="center"
            styles={{paddingBottom: 10, flexWrap: 'wrap'}}>
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
              styles={{paddingHorizontal: 25, flex: 1}}>
              <Space height={15} />
              <TextComponent
                text={fullName ?? 'Nguyễn Văn A'}
                title={true}
                font={fontFamilies.medium}
                size={20}
              />
              <Space height={10} />
            </RowComponent>
          </RowComponent>

          {/* Contact info */}
          <SectionComponent styles={{paddingBottom: 20}}>
            <RowComponent>
              <LocationMarker width={20} height={20} />
              <Space width={10} />
              <TextComponent
                text={
                  location?.address ??
                  '158 An Dương Vương, phường An Lạc, Quận Bình Tân, TP. Hồ Chí Minh'
                }
                styles={{width: screenWidth * 0.8}}
              />
            </RowComponent>
            <Space height={10} />
            <RowComponent styles={{paddingLeft: 5, flexWrap: 'wrap'}}>
              <FontAwesome6 name="phone" size={16} color={appColors.primary} />
              <Space width={10} />
              <TextComponent
                text={phone ?? '+000000000'}
                styles={{maxWidth: '100%'}}
              />
            </RowComponent>

            <Space height={10} />
            <RowComponent styles={{paddingLeft: 5, flexWrap: 'wrap'}}>
              <MailFilled width={20} height={20} />
              <Space width={10} />
              <TextComponent
                text={email ?? 'Hiện chưa có email'}
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
                text={toPrice(point) ?? '100.000.000'}
                title={true}
                size={24}
                font={fontFamilies.bold}
              />
              <Space height={10} />
              <TextComponent
                styles={[styles.textInCome1]}
                text={'Số điểm'}
                title={true}
                font={fontFamilies.regular}
                size={Platform.OS === 'ios' ? 14 : 16}
              />
              <TextComponent
                styles={[styles.textInCome1]}
                text={'đang có'}
                title={true}
                font={fontFamilies.regular}
                size={Platform.OS === 'ios' ? 14 : 16}
              />
            </RowComponent>

            <Space width={10} />
            <RowComponent
              flexDirection="column"
              alignItems="center"
              justify="center"
              styles={[styles.income]}>
              <TextComponent
                text={toPrice(income) ?? '100.000.000'}
                title={true}
                size={24}
                font={fontFamilies.bold}
              />
              <Space height={10} />
              <TextComponent
                styles={styles.textInCome2}
                text={`Thu nhập `}
                title={true}
                font={fontFamilies.regular}
                size={Platform.OS === 'ios' ? 14 : 16}
              />
              <TextComponent
                styles={styles.textInCome2}
                text={`trong ngày`}
                title={true}
                font={fontFamilies.regular}
                size={Platform.OS === 'ios' ? 14 : 16}
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
                  font={fontFamilies.medium}
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
              <ChartOutlined />
              <Space width={10} />
              <TextComponent
                title={true}
                font={fontFamilies.medium}
                text={'Thống kê'}
                size={Platform.OS === 'ios' ? 16 : 14}
                onPress={() => navigation.navigate('Report')}
              />
            </RowComponent>

            <Space height={15} />

            <RowComponent alignItems="flex-start">
              <CardAdd />
              <Space width={10} />
              <TextComponent
                title={true}
                font={fontFamilies.medium}
                text={'Nạp điểm'}
                size={Platform.OS === 'ios' ? 16 : 14}
              />
            </RowComponent>

            <Space height={15} />

            <RowComponent alignItems="flex-start">
              <UserEdit />
              <Space width={10} />
              <TextComponent
                text={'Chỉnh sửa thông tin'}
                title={true}
                font={fontFamilies.medium}
                size={Platform.OS === 'ios' ? 16 : 14}
                onPress={() => navigation.navigate('EditProfile')}
              />
            </RowComponent>

            <Space height={15} />

            <RowComponent alignItems="flex-start">
              <UserRemove />
              <Space width={10} />
              <TextComponent
                text={'Xóa tài khoản'}
                title={true}
                font={fontFamilies.medium}
                size={Platform.OS === 'ios' ? 16 : 14}
              />
            </RowComponent>
          </SectionComponent>
        </SectionComponent>

        {/* Button logout */}
        <Space height={100} />
        <SectionComponent styles={[styles.logOutBtn]}>
          <ButtonComponent
            type="primary"
            onPress={() => onLogOut()}
            title="Đăng xuất"
          />
        </SectionComponent>
        <Space height={30} />
        <LoadingComponent visible={isModalOpen} isTransparent={false} />
      </ScrollView>
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
    minWidth: 130,
    minHeight: 130,
  },
  textInCome1: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  textInCome2: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  avatar: {
    width: 76,
    height: 76,
  },
  logOutBtn: {
    marginHorizontal: 24,
  },
});

export default ProfileScreen;
