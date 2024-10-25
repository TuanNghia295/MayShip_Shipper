import React, {useState} from 'react';
import {
  Alert,
  Platform,
  ScrollView,
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
import {ArrowDown2, ArrowRight2} from 'iconsax-react-native';
import {appColors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format} from 'date-fns';
import {toPrice} from '../../../hooks/toPrice';
import {
  checkOrderTypeIcon,
  checkOrderTypeTitle,
  handleCheckHeaderInfoType,
  ORDERTYPE,
} from '../../../constants/orderType';
import {LocationMarker} from '../../../assets/images';
import orderServices from '../../../services/Order/orderServices';
import {useNavigation} from '@react-navigation/native';

const ReportScreen = () => {
  const {navigate} = useNavigation();
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startDateDisplay, setStartDateDisplay] = useState('');
  const [endDateDisplay, setEndDateDisplay] = useState('');
  const [type, setType] = useState(ORDERTYPE.AnotherShop); // loại đơn
  const [data, setData] = useState([]);
  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const handleStartDateConfirm = date => {
    setStartDate(date);
    setStartDateDisplay(format(date, 'dd/MM/yyyy'));
    hideStartDatePicker();
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleEndDateConfirm = date => {
    setEndDate(date);
    setEndDateDisplay(format(date, 'dd/MM/yyyy'));
    hideEndDatePicker();
  };

  console.log('startDate', startDate);
  console.log('endDate', endDate);

  const onFilterOrder = async (from, to) => {
    if (!to) {
      to = new Date(); // Sử dụng ngày hiện tại nếu endDate không được chọn
    }
    if (!(from instanceof Date) || isNaN(from)) {
      Alert.alert('Vui lòng nhập ngày bắt đầu');
      return;
    }
    try {
      const res = await orderServices.reportOrders({from, to});
      console.log('res', res);
      setData(res);
    } catch (error) {
      console.log('Error during get report orders:', JSON.stringify(error));
      if (error.statusCode === 422) {
        Alert.alert('Vui lòng nhập ngày bắt đầu');
      } else {
        Alert.alert('Đã xảy ra lỗi', error.message || 'Không thể lấy dữ liệu');
      }
    }
  };

  const {orderCount, totalIncome, orders} = data;

  return (
    <SectionComponent
      styles={{
        backgroundColor: appColors.white,
        marginTop: 0,
      }}
    >
      <SectionComponent styles={[styles.startEnd]}>
        <RowComponent flexDirection="row">
          <RowComponent
            flexDirection="column"
            alignItems="flex-start"
            styles={{flex: 1}}
          >
            <TextComponent text={'Ngày bắt đầu'} font={fontFamilies.medium} />
            <TouchableOpacity onPress={showStartDatePicker}>
              <InputComponent
                placeHolder={'DD/MM/YYYY'}
                value={startDateDisplay}
                disbaled={true}
                suffix={<ArrowDown2 color={appColors.gray3} />}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isStartDatePickerVisible}
              mode="date"
              onConfirm={handleStartDateConfirm}
              onCancel={hideStartDatePicker}
            />
          </RowComponent>

          <Space width={10} />

          <RowComponent
            flexDirection="column"
            alignItems="flex-start"
            styles={{flex: 1}}
          >
            <TextComponent text={'Ngày kết thúc'} font={fontFamilies.medium} />
            <TouchableOpacity onPress={showEndDatePicker}>
              <InputComponent
                placeHolder={'DD/MM/YYYY'}
                value={endDateDisplay}
                disbaled={true}
                suffix={<ArrowDown2 color={appColors.gray3} />}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isEndDatePickerVisible}
              mode="date"
              onConfirm={handleEndDateConfirm}
              onCancel={hideEndDatePicker}
            />
          </RowComponent>
        </RowComponent>
        <RowComponent>
          <ButtonComponent
            type="primary"
            title="Lọc"
            onPress={() => onFilterOrder(startDate, endDate)}
          />
        </RowComponent>
      </SectionComponent>

      <ScrollView contentContainerStyle={[styles.list]}>
        {/* Tổng số đơn */}
        <RowComponent alignItems="flex-start">
          <TextComponent text={'Tổng số đơn: '} />
          <TextComponent text={orderCount ?? 0} font={fontFamilies.bold} />
          <TextComponent text={'đơn'} font={fontFamilies.bold} />
        </RowComponent>

        {/* Doanh thu */}
        <RowComponent alignItems="flex-start">
          <TextComponent text={'Doanh thu của shipper: '} />
          <TextComponent text={toPrice(totalIncome)} font={fontFamilies.bold} />
        </RowComponent>

        {/* List item */}
        <View>
          {orders?.map((order, index) => {
            const {id, type, status, payforShop, incomeDeliver} = order;
            return (
              <SectionComponent styles={[styles.listItem]} key={id}>
                {/* Loại đơn và trạng thái đơn hàng */}
                <RowComponent>
                  {checkOrderTypeIcon(type)}
                  <RowComponent
                    flexDirection="column"
                    styles={{marginLeft: 15, marginTop: 12}}
                    alignItems="flex-start"
                  >
                    <TextComponent
                      font={fontFamilies.medium}
                      size={16}
                      text={checkOrderTypeTitle(type)}
                    />
                    <RowComponent alignItems="flex-start">
                      <TextComponent
                        text={
                          status === 'DELIVERED'
                            ? `Đơn hàng đã hoàn thành`
                            : `Đơn hàng bị hủy`
                        }
                        size={14}
                        color={
                          status === 'DELIVERED'
                            ? appColors.green
                            : appColors.red
                        }
                        font={fontFamilies.medium}
                      />
                    </RowComponent>
                  </RowComponent>
                </RowComponent>

                {/* Giá trị và thu nhập */}
                <RowComponent flexDirection="column" alignItems="flex-start">
                  <RowComponent>
                    {(type === ORDERTYPE.AnotherShop ||
                      type === ORDERTYPE.Food) && (
                      <>
                        <TextComponent text={handleCheckHeaderInfoType(type)} />
                        <TextComponent
                          text={toPrice(payforShop)}
                          font={fontFamilies.medium}
                        />
                        <TextComponent text={'đ'} />
                      </>
                    )}
                  </RowComponent>

                  <RowComponent>
                    <TextComponent text={'Thu nhập: '} />
                    <TextComponent
                      text={toPrice(incomeDeliver)}
                      font={fontFamilies.medium}
                    />
                    <TextComponent text={'đ'} />
                  </RowComponent>
                </RowComponent>

                {/* Xem chi tiết */}
                <ButtonComponent
                  type="empty"
                  title="Xem chi tiết"
                  textStyle={{
                    color: appColors.primary,
                    fontFamily: fontFamilies.medium,
                  }}
                  icon={
                    <ArrowRight2
                      size={Platform.OS === 'ios' ? 14 : 16}
                      color={appColors.primary}
                    />
                  }
                  iconFlex="right"
                  onPress={() =>
                    navigate('HistoryDetail', {
                      info: id,
                    })
                  }
                />
                <Space height={15} />
              </SectionComponent>
            );
          })}
        </View>
      </ScrollView>
    </SectionComponent>
  );
};

const styles = StyleSheet.create({
  startEnd: {
    paddingHorizontal: 24,
    backgroundColor: appColors.white,
    paddingBottom: 10,
  },
  list: {
    paddingHorizontal: 24,
    backgroundColor: appColors.background,
    paddingTop: 10,
    paddingBottom: 200,
  },
  listItem: {
    backgroundColor: appColors.white,
    paddingHorizontal: 15,
    paddingTop: 10,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    minHeight: 150,
    borderColor: appColors.gray1,
  },
});

export default ReportScreen;
