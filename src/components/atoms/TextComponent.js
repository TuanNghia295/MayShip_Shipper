import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../../styles/global/GlobalStyles';
import {appColors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';

const TextComponent = ({text, size, flex, title, font, color, styles}) => {
  const fontSizeDefault = Platform.OS === 'ios' ? 16 : 14;

  return (
    <Text
      style={[
        globalStyles.text,
        {
          color: color ?? appColors.black1,
          flex: flex ?? 0,
          fontSize: size ? size : title ? 24 : fontSizeDefault,
          fontFamily: font
            ? font
            : title
            ? fontFamilies.bold
            : fontFamilies.regular,
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
