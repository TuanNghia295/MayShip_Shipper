import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {globalStyles} from '../../styles/global/GlobalStyles';
import {appColors} from '../../constants/colors';
import {buttonStyles} from '../../styles/atoms/buttonStyles';
import TextComponent from './TextComponent';

/**
 * @typedef {"primary" | "outline" | "shortPrimary" | "shortOutline" | "gray" | "shortGray"} ButtonType
 */

/**
 * Button component
 * @param {{type: ButtonType, title: string, isDisable: boolean, onPress: () => void}} props
 */
const ButtonComponent = ({
  type = 'primary',
  title,
  isDisable = false,
  onPress,
}) => {
  return (
    <>
      {type === 'primary' || type === 'gray' || type === 'shortPrimary' ? (
        <View>
          <TouchableOpacity
            onPress={onPress}
            style={
              type === 'primary'
                ? globalStyles.button
                : type === 'gray'
                ? buttonStyles.gray
                : buttonStyles.shortPrimary
            }
            disabled={isDisable}>
            <TextComponent
              color={
                type === 'primary' || type === 'shortPrimary'
                  ? appColors.white
                  : appColors.black1
              }
              text={title}
            />
          </TouchableOpacity>
        </View>
      ) : type === 'outline' ||
        type === 'shortOutline' ||
        type === 'shortGray' ? (
        <View>
          <TouchableOpacity
            onPress={onPress}
            style={
              type === 'outline'
                ? buttonStyles.outline
                : type === 'shortOutline'
                ? buttonStyles.shortOutline
                : buttonStyles.shortGray
            }
            disabled={isDisable}>
            <TextComponent
              color={
                type === 'outline' || type === 'shortOutline'
                  ? appColors.primary
                  : appColors.black1
              }
              text={title}
            />
          </TouchableOpacity>
        </View>
      ) : type === 'shortOutline' ? (
        <View>
          <TouchableOpacity
            onPress={onPress}
            style={buttonStyles.shortOutline}
            disabled={isDisable}>
            <TextComponent color={appColors.white} text={title} />
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({});

export default ButtonComponent;
