import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {globalStyles} from '../../styles/global/GlobalStyles';
import {appColors} from '../../constants/colors';
import {buttonStyles} from '../../styles/atoms/buttonStyles';
import TextComponent from './TextComponent';

/**
 * @typedef {"primary" | "outline" | "shortPrimary" | "shortOutline"} ButtonType
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
      {type === 'primary' ? (
        <View>
          <TouchableOpacity
            onPress={onPress}
            style={globalStyles.button}
            disabled={isDisable}>
            <TextComponent color={appColors.white} text={title}></TextComponent>
          </TouchableOpacity>
        </View>
      ) : type === 'outline' ? (
        <View>
          <TouchableOpacity
            onPress={onPress}
            style={buttonStyles.outline}
            disabled={isDisable}>
            <TextComponent
              style={{color: appColors.white}}
              text={title}></TextComponent>
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({});

export default ButtonComponent;
