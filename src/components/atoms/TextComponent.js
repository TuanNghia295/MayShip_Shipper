import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../../styles/global/GlobalStyles';
import {appColors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import Space from './Space';

const TextComponent = ({
  text,
  size,
  flex,
  title,
  font,
  color,
  styles,
  onPress,
  required,
}) => {
  const fontSizeDefault = Platform.OS === 'ios' ? 14 : 16;

  return (
    <View style={{flex: flex ?? 0}}>
      <Text
        style={[
          globalStyles.text,
          {
            color: color ?? appColors.black1,
            fontSize: size ? size : title ? 20 : fontSizeDefault,
            fontFamily: font
              ? font
              : title
              ? fontFamilies.bold
              : fontFamilies.regular,
          },
          styles,
        ]}
        onPress={onPress}>
        {text}
        <Space width={4} />
        {required && <Text style={[styless.requiredText]}>*</Text>}
      </Text>
    </View>
  );
};

const styless = StyleSheet.create({
  requiredText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default TextComponent;
