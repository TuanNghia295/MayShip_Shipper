import React, {useState} from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  Space,
  TextComponent,
} from '../../atoms';
import {ArrowDown2, ArrowRight, ArrowRight2} from 'iconsax-react-native';
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
import {Button} from '@rneui/base';

const ReportScreen = () => {
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [type, setType] = useState(ORDERTYPE.AnotherShop); // loại đơn

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const handleStartDateConfirm = date => {
    setStartDate(date);
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
    hideEndDatePicker();
  };

  const formatDate = date => {
    return date ? format(date, 'dd/MM/yyyy') : '';
  };

  console.log('startDate', formatDate(startDate));
  console.log('endDate', formatDate(endDate));

  const success = false;

  return (
    <SectionComponent
      styles={{
        backgroundColor: appColors.white,
        marginTop: 0,
      }}>
      <SectionComponent styles={[styles.startEnd]}>
        <RowComponent flexDirection="row">
          <RowComponent
            flexDirection="column"
            alignItems="flex-start"
            styles={{flex: 1}}>
            <TextComponent text={'Ngày bắt đầu'} font={fontFamilies.medium} />
            <TouchableOpacity onPress={showStartDatePicker}>
              <InputComponent
                placeHolder={'DD/MM/YYYY'}
                value={formatDate(startDate)}
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
            styles={{flex: 1}}>
            <TextComponent text={'Ngày kết thúc'} font={fontFamilies.medium} />
            <TouchableOpacity onPress={showEndDatePicker}>
              <InputComponent
                placeHolder={'DD/MM/YYYY'}
                value={formatDate(endDate)}
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
        <ButtonComponent type="primary" title="Lọc" />
      </SectionComponent>

      <SectionComponent styles={[styles.list]}>
        <SectionComponent>
          {/* Tổng số đơn */}
          <RowComponent alignItems="flex-start">
            <TextComponent text={'Tổng số đơn: '} />
            <TextComponent text={'100'} font={fontFamilies.bold} />
            <TextComponent text={'đơn'} font={fontFamilies.bold} />
          </RowComponent>

          {/* Doanh thu */}
          <RowComponent alignItems="flex-start">
            <TextComponent text={'Doanh thu của shipper: '} />
            <TextComponent text={toPrice(1000000)} font={fontFamilies.bold} />
          </RowComponent>

          {/* List item */}
          <SectionComponent styles={[styles.listItem]}>
            {/* Loại đơn và trạng thái đơn hàng */}
            <RowComponent>
              {checkOrderTypeIcon(type)}
              <RowComponent
                flexDirection="column"
                styles={{marginLeft: 15, marginTop: 12}}
                alignItems="flex-start">
                <TextComponent
                  font={fontFamilies.medium}
                  size={16}
                  text={checkOrderTypeTitle(type)}
                />
                <RowComponent alignItems="flex-start">
                  <TextComponent
                    text={
                      success ? `Đơn hàng đã hoàn thành` : `Đơn hàng bị hủy`
                    }
                    size={14}
                    color={success ? appColors.green : appColors.red}
                    font={fontFamilies.medium}
                  />
                </RowComponent>
              </RowComponent>
            </RowComponent>

            {/* Giá trị và thu nhập */}
            <RowComponent flexDirection="column" alignItems="flex-start">
              <RowComponent>
                <TextComponent text={handleCheckHeaderInfoType(type)} />
                <TextComponent
                  text={toPrice(2000000)}
                  font={fontFamilies.medium}
                />
                <TextComponent text={'đ'} />
              </RowComponent>

              <RowComponent>
                <TextComponent text={'Thu nhập: '} />
                <TextComponent
                  text={toPrice(2000000)}
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
            />
            <Space height={15} />
          </SectionComponent>

          {/* List item */}
          <SectionComponent styles={[styles.listItem]}>
            {/* Loại đơn và trạng thái đơn hàng */}
            <RowComponent>
              {checkOrderTypeIcon(type)}
              <RowComponent
                flexDirection="column"
                styles={{marginLeft: 15, marginTop: 12}}
                alignItems="flex-start">
                <TextComponent
                  font={fontFamilies.medium}
                  size={16}
                  text={checkOrderTypeTitle(type)}
                />
                <RowComponent alignItems="flex-start">
                  <TextComponent
                    text={
                      success ? `Đơn hàng đã hoàn thành` : `Đơn hàng bị hủy`
                    }
                    size={14}
                    color={success ? appColors.green : appColors.red}
                    font={fontFamilies.medium}
                  />
                </RowComponent>
              </RowComponent>
            </RowComponent>

            {/* Giá trị và thu nhập */}
            <RowComponent flexDirection="column" alignItems="flex-start">
              <RowComponent>
                <TextComponent text={handleCheckHeaderInfoType(type)} />
                <TextComponent
                  text={toPrice(2000000)}
                  font={fontFamilies.medium}
                />
                <TextComponent text={'đ'} />
              </RowComponent>

              <RowComponent>
                <TextComponent text={'Thu nhập: '} />
                <TextComponent
                  text={toPrice(2000000)}
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
            />
            <Space height={15} />
          </SectionComponent>
        </SectionComponent>
      </SectionComponent>
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
