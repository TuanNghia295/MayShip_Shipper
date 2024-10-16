import {CloseCircle, Eye, EyeSlash} from 'iconsax-react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {appColors} from '../../constants/colors';
import {globalStyles} from '../../styles/global/GlobalStyles';
import {useEffect, useState} from 'react';

const InputComponent = ({
  placeHolder,
  value,
  onChange,
  allowClear,
  type,
  onEnd,
  isPassWord,
  affix,
  suffix,
  disbaled,
  danger,
  flexible,
  calendar,
  shipperCancel,
}) => {
  const [isShowPass, setIsShowPass] = useState(isPassWord ?? false);
  const [internalValue, setInternalValue] = useState(value || '');
  const [inputHeight, setInputHeight] = useState(56); // State để lưu chiều cao của input
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // State để hiển thị DatePicker
  const [date, setDate] = useState(new Date());

  const handleChange = event => {
    const text = event.nativeEvent.text;
    setInternalValue(text);
    if (onChange) {
      onChange(text);
    }
  };

  const handleContentSizeChange = event => {
    const {width, height} = event.nativeEvent.contentSize;
    if (width >= 100) {
      setInputHeight(height); // Cập nhật chiều cao của input khi chiều rộng đạt 100px
    }
  };

  const handleClear = () => {
    setInternalValue('');
    if (onChange) {
      onChange('');
    }
  };

  const handleConfirm = date => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    setInternalValue(formattedDate);
    if (onChange) {
      onChange(formattedDate);
    }
    setDatePickerVisibility(false);
  };

  useEffect(() => {
    setInternalValue(value || '');
  }, [value]);

  return (
    <View style={[styles.inputContainer, danger && styles.dangerBorder]}>
      {affix ?? affix}
      <TextInput
        placeholder={placeHolder}
        value={internalValue}
        onChange={handleChange}
        secureTextEntry={isShowPass}
        placeholderTextColor={'#747688'}
        keyboardType={type}
        onEndEditing={onEnd}
        editable={!disbaled}
        multiline={flexible ? true : false} // Cho phép nhập nhiều dòng
        onContentSizeChange={handleContentSizeChange} // Xử lý sự kiện khi kích thước nội dung thay đổi
        style={[
          styles.input,
          globalStyles.text,
          {minHeight: shipperCancel ? 100 : inputHeight}, // Thay đổi chiều cao tối thiểu khi có shipperCancel
        ]}
        onFocus={calendar ? () => setDatePickerVisibility(true) : undefined} // Hiển thị DatePicker khi focus nếu calendar là true
      />
      {suffix ?? suffix}
      {calendar && (
        <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
          <FontAwesome5 name="calendar-alt" size={22} color={appColors.bl} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={isPassWord ? () => setIsShowPass(!isShowPass) : handleClear}>
        {isPassWord ? (
          isShowPass ? (
            <EyeSlash size={22} color={appColors.gray1} />
          ) : (
            <Eye size={22} color={appColors.black1} />
          )
        ) : (
          internalValue &&
          internalValue.length > 0 &&
          allowClear && <CloseCircle size="32" color={appColors.black1} />
        )}
      </TouchableOpacity>
      {calendar && (
        <DatePicker
          title={'Ngày tháng năm sinh'}
          modal
          open={isDatePickerVisible}
          date={date}
          mode="date"
          locale={'vi_VN'}
          confirmText="Xác nhận"
          cancelText="Hủy"
          buttonColor={appColors.primary}
          onConfirm={handleConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray3,
    backgroundColor: appColors.white,
    width: '100%',
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 8,
  },
  dangerBorder: {
    borderColor: '#FF2D2D',
  },
  input: {
    padding: 0,
    margin: 0,
    flex: 1,
    lineHeight: 20,
    paddingHorizontal: 14,
  },
});

export default InputComponent;
