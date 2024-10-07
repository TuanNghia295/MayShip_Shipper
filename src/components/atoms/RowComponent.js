import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {globalStyles} from '../../styles/global/GlobalStyles';

/**
 * @typedef {"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"} justifyType
 */

/**
 * @param {{justify: justifyType, children: any, styles?: object}} props
 */

const RowComponent = ({children, justify, styles}) => {
  const localStyle = [
    globalStyles.row,
    {
      justifyContent: justify,
    },
    styles,
  ];

  return <View style={localStyle}>{children}</View>;
};

export default RowComponent;
