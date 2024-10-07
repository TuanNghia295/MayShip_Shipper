import React from 'react';
import {View} from 'react-native';
import {globalStyles} from '../../styles/global/GlobalStyles';

const SectionComponent = ({children, styles}) => {
  return <View style={[globalStyles.section, styles]}>{children}</View>;
};

export default SectionComponent;
