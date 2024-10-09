import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {globalStyles} from '../../styles/global/GlobalStyles';

/**
 * @typedef {"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"} justifyType
 * @typedef {"row" | "column"} directionType
 * @typedef {"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"} alignType
 */

/**
 * @param {{justify: justifyType, flexDirection:directionType, alignItems:alignType, children: any, styles?: object}} props
 */

const RowComponent = ({
  children,
  justify,
  alignItems = 'center',
  flexDirection = 'row',
  styles,
}) => {
  const localStyle = [
    globalStyles.row,
    {
      flexDirection: flexDirection,
      marginBottom: 5,
      justifyContent: justify,
      alignItems: alignItems,
    },
    styles,
  ];

  return <View style={localStyle}>{children}</View>;
};

export default RowComponent;
