import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {globalStyles} from '../../styles/global/GlobalStyles';
import {appColors} from '../../constants/colors';

const ButtonComponent = ({title}) => {
  return (
    <View style={globalStyles.button}>
      <TouchableOpacity>
        <Text style={{color: appColors.white}}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ButtonComponent;
