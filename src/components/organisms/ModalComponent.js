import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {ContainerComponent} from '../molecules';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  Space,
  TextComponent,
} from '../atoms';
import {appColors} from '../../constants/colors';

const ModalComponent = ({
  title,
  descripttion,
  okTitle,
  cancelTitle,
  onOk,
  onCancel,
  visible,
  shipperCancel,
}) => {
  return (
    <Modal
      visible={visible}
      styles={{flex: 1, alignItems: 'center'}}
      animationType="fade"
      transparent={true}>
      <SectionComponent
        styles={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SectionComponent styles={[styles.modal]}>
          <Space height={30} width={107} />
          <RowComponent
            justify="center"
            children={
              <TextComponent color={appColors.black1} text={title} title={28} />
            }
          />
          <Space height={15} />
          <RowComponent
            justify="center"
            children={
              <TextComponent text={descripttion} color={appColors.black1} />
            }
          />
          {shipperCancel && (
            <RowComponent styles={{marginHorizontal: 20, minHeight: 70}}>
              <InputComponent placeHolder={'Nhập lý do hủy đơn'} />
            </RowComponent>
          )}
          <Space height={15} />
          <ButtonComponent
            type="primary"
            title={okTitle ?? 'ĐÓNG'}
            onPress={onOk}
          />
          <Space height={15} />
          {cancelTitle ? (
            <ButtonComponent
              type="gray"
              title={cancelTitle}
              onPress={onCancel}
            />
          ) : null}
        </SectionComponent>
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

export default ModalComponent;
