import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {globalStyles} from '../../styles/global/GlobalStyles';
import {appColors} from '../../constants/colors';
import {buttonStyles} from '../../styles/atoms/buttonStyles';
import TextComponent from './TextComponent';

/**
 * @typedef {"primary" | "outline" | "shortPrimary" | "shortOutline" | "gray" | "shortGray" | "empty"} ButtonType
 * @typedef {"right" | "left"} IconFlex
 */

/**
 * Button component
 * @param {{type: ButtonType, title: string, iconFlex: IconFlex, isDisable: boolean, onPress: () => void, icon: React.ReactNode, textStyle: object}} props
 */
const ButtonComponent = ({
  type = 'primary',
  title,
  isDisable = false,
  onPress,
  icon,
  iconFlex,
  textStyle,
}) => {
  const getButtonStyle = type => {
    switch (type) {
      case 'primary':
        return globalStyles.button;
      case 'gray':
        return buttonStyles.gray;
      case 'shortPrimary':
        return buttonStyles.shortPrimary;
      case 'outline':
        return buttonStyles.outline;
      case 'shortOutline':
        return buttonStyles.shortOutline;
      case 'shortGray':
        return buttonStyles.shortGray;
      case 'empty':
        return buttonStyles.empty;
      default:
        return globalStyles.button;
    }
  };

  const getTextColor = type => {
    switch (type) {
      case 'primary':
      case 'shortPrimary':
        return appColors.white;
      case 'outline':
        return appColors.primary;
      case 'shortOutline':
      case 'empty':
        return appColors.black1;
      case 'gray':
      case 'shortGray':
      default:
        return appColors.black1;
    }
  };

  const renderIcon = position => {
    if (icon && iconFlex === position) {
      return icon;
    }
    return null;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={getButtonStyle(type)}
      disabled={isDisable}>
      {renderIcon('left')}
      <TextComponent
        color={getTextColor(type)}
        text={title}
        styles={[
          textStyle,
          {
            marginLeft: icon && iconFlex === 'left' ? 12 : 0,
            textAlign: 'center',
          },
        ]}
        flex={icon && iconFlex === 'right' ? 0 : 0}
      />
      {renderIcon('right')}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default ButtonComponent;
