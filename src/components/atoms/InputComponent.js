import {CloseCircle, Eye, EyeSlash} from 'iconsax-react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {appColors} from '../../constants/colors';
import {globalStyles} from '../../styles/global/GlobalStyles';
import _ from 'lodash';

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
}) => {
  const [isShowPass, setIsShowPass] = useState(isPassWord ?? false);
  const [internalValue, setInternalValue] = useState(value || '');

  // Hàm debounce
  const inputDebounce = useCallback(
    _.debounce(text => {
      if (onChange) {
        onChange(text);
      }
    }, 1000),
    [],
  );

  const handleChange = event => {
    const text = event.nativeEvent.text;
    setInternalValue(text);
    inputDebounce(text);
  };

  useEffect(() => {
    setInternalValue(value || '');
  }, [value]);

  useEffect(() => {
    return () => {
      inputDebounce.cancel();
    };
  }, [inputDebounce]);

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
        style={[styles.input, globalStyles.text]}
      />
      {suffix ?? suffix}
      <TouchableOpacity
        onPress={
          isPassWord ? () => setIsShowPass(!isShowPass) : () => onChange('')
        }>
        {isPassWord ? (
          isShowPass ? (
            <EyeSlash size={22} color={appColors.gray1} />
          ) : (
            <Eye size={22} color={appColors.black1} />
          )
        ) : (
          internalValue &&
          internalValue.length > 0 &&
          allowClear && (
            <CloseCircle size="32" color={appColors.black2} variant="Bold" />
          )
        )}
      </TouchableOpacity>
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
    paddingHorizontal: 14,
  },
});

export default InputComponent;
