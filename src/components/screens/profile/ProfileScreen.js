import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Linking,
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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {stopRefreshTokenTimer} from '../auth/TokenTimer';
import ShipperServices from '../../../services/Shipper/shipperServices';
import {toPrice} from '../../../hooks/toPrice';
import {useDispatch} from 'react-redux';
import {setUserInfo} from '../../../store/userSlice.js';
import {socketDisconnect} from '../../../services/socketServices.js';
import toast from '../../../utils/toast.js';
import ModalComponent from '../../organisms/ModalComponent.js';
import {Ship} from 'iconsax-react-native';
import {END_POINTS} from '../../../constants/endpoints.js';

const {width: screenWidth} = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [actived, setActived] = useState(false);
  const [data, setData] = useState({}); // Thông tin shipper
  const [isConfirmDeleteModal, setIsConfirmDeleteModal] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const toggleSwitch = async () => {
    try {
      const newState = !actived;
      setActived(newState);
      await ShipperServices.updateShipper({
        activated: newState,
      });
      toast('success', 'Cập nhật trạng thái hoạt động thành công');
    } catch (error) {
      console.log('Lỗi khi cập nhật trạng thái hoạt động:', error);
      toast('error', 'Lỗi khi cập nhật trạng thái hoạt động');
      if (error.errorCode === 'D006') {
        setActived(false);
      }
    }
  };

  // Đăng xuất
  const onLogOut = async () => {
    try {
      stopRefreshTokenTimer();
      // Xóa thông tin token khỏi AsyncStorage
      await ShipperServices.logoutShipper();
      await AsyncStorage.removeItem('shipper_token');
      await AsyncStorage.removeItem('shipper_refresh_token');
      await AsyncStorage.removeItem('expires');
      await AsyncStorage.removeItem('isLogin');
      socketDisconnect();
      dispatch(setUserInfo({}));
      navigation.navigate('Location');
    } catch (error) {
      console.log('Lỗi khi đăng xuất:', error);
      toast('error', 'Lỗi khi đăng xuất');
    }
  };

  const handleGetInfo = async () => {
    try {
      setIsModalOpen(true);
      const res = await ShipperServices.infoShipper();
      console.log('res', res);
      setData(res);
      setActived(res.activated);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 500);
    } catch (error) {
      console.log('Lỗi khi lấy thông tin shipper:', error);
      toast('error', 'Lỗi khi lấy thông tin shipper');
      setIsModalOpen(false);
    }
  };

  const onDeleteAccount = async () => {
    try {
      const res = await ShipperServices.deleteShipper();
      console.log('ré', res);
      setSuccessDelete(true);
    } catch (error) {
      toast('error', 'Xóa tài khoản bị lỗi, vui lòng thử lại sau');
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleGetInfo();
    }, []),
  );

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
    incomeInDay,
    status,
  } = data ?? {};

  const imageUrl = avatar
    ? END_POINTS + 'api/images/' + avatar
    : 'https://randomuser.me/api/portraits/men/76.jpg';
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        {/* Header, contact info */}
        <SectionComponent styles={[styles.container]}>
          {/* Avatar, Tên  */}
          <RowComponent
            justify="flex-start"
            alignItems="center"
            styles={{paddingBottom: 10, flexWrap: 'wrap'}}
          >
            <Avatar
              size={76}
              rounded
              source={{
                uri: imageUrl,
              }}
              containerStyle={styles.avatar}
            />

            <RowComponent
              flexDirection="column"
              alignItems="flex-start"
              justify="flex-start"
              styles={{paddingHorizontal: 25, flex: 1}}
            >
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
              styles={[styles.income]}
            >
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
              styles={[styles.income]}
            >
              <TextComponent
                text={toPrice(incomeInDay) ?? '100.000.000'}
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
                thumbColor={actived ? appColors.primary : appColors.gray1}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={actived}
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
                onPress={() => Linking.openURL('tel:0969415864')}
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
                onPress={() =>
                  navigation.navigate('EditProfile', {
                    shipperInfo: data,
                  })
                }
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
                onPress={() => setIsConfirmDeleteModal(true)}
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

      <ModalComponent
        visible={successDelete}
        title={'Tài khoản đã bị xóa'}
        descripttion={'Tài khoản của bạn đã bị xóa'}
        okTitle={'Quay về trang đăng nhập'}
        onOk={() => {
          onLogOut();
        }}
      />

      <ModalComponent
        visible={isConfirmDeleteModal}
        title={'Bạn muốn xóa tài khoản ?'}
        descripttion={
          'Tài khoản sẽ bị xóa. Bạn chắc chắn muốn xóa tài khoản chứ !'
        }
        descripttionStyle={{textAlign: 'center'}}
        okTitle={'Đồng ý'}
        outlineTitle={'Từ chối'}
        onCancel={() => setIsConfirmDeleteModal(false)}
        inlineBtn={true}
        onOk={onDeleteAccount}
      />
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
