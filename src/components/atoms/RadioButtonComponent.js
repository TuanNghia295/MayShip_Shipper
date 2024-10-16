import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {appColors} from '../../constants/colors';

// RadioButtonComponent nhận các props: options (mảng các lựa chọn), selectedOption (lựa chọn hiện tại), onSelect (hàm callback khi lựa chọn thay đổi)
const RadioButtonComponent = ({options, selectedOption, onSelect}) => {
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionContainer}
          onPress={() => onSelect(option)}>
          <View style={styles.radioCircle}>
            {selectedOption === option && <View style={styles.selectedRb} />}
          </View>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Styles cho RadioButtonComponent
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: appColors.primary, // Màu của viền vòng tròn
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: appColors.primary, // Màu nền của vòng tròn bên trong khi được chọn
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: appColors.black1,
  },
});

export default RadioButtonComponent;
