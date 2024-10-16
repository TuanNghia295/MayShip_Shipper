import React from 'react';
import {StyleSheet, View, ActivityIndicator, Modal} from 'react-native';
import {appColors} from '../../constants/colors';
import SectionComponent from './SectionComponent';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import Space from './Space';

const LoadingComponent = ({visible, isTransparent}) => {
  return (
    <Modal
      visible={visible}
      styles={{flex: 1, alignItems: 'center'}}
      animationType="fade"
      transparent={isTransparent}>
      <SectionComponent
        styles={{
          flex: 1,
          backgroundColor: isTransparent
            ? 'rgba(0,0,0,0.5)'
            : appColors.background,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 0,
        }}>
        <RowComponent
          flexDirection="column"
          alignItems="center"
          justify="center">
          <ActivityIndicator size="large" color={appColors.primary} />
          <Space height={10} />
          <TextComponent
            text={'Đang tải...'}
            color={isTransparent ? appColors.white : appColors.black}
            size={16}
          />
        </RowComponent>
      </SectionComponent>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: 330,
    minHeight: 162,
    backgroundColor: appColors.white,
    borderRadius: 15,
  },
});

export default LoadingComponent;
