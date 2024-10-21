import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  Space,
  TextComponent,
} from '../atoms';
import {appColors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';

const ModalComponent = ({
  title,
  descripttion,
  okTitle,
  cancelTitle,
  onOk,
  onCancel,
  visible,
  shipperCancel,
  descripttionStyle,
  shipperCancelReason,
}) => {
  return (
    <Modal
      visible={visible}
      styles={{flex: 1, alignItems: 'center'}}
      animationType="fade"
      transparent={true}
    >
      <View style={styles.overlay}>
        <SectionComponent styles={[styles.modal]}>
          <Space height={30} />
          <RowComponent
            justify="center"
            children={
              <TextComponent
                color={appColors.black1}
                text={title}
                title={true}
                font={fontFamilies.medium}
                size={20}
              />
            }
          />
          <RowComponent
            justify="center"
            children={
              <TextComponent
                text={descripttion}
                styles={[descripttionStyle]}
                color={appColors.black1}
                size={14}
              />
            }
          />
          {shipperCancel && (
            <RowComponent flexDirection="column" alignItems="flex-start">
              <InputComponent
                placeHolder={'Nhập lý do hủy đơn'}
                flexible={true}
                shipperCancel={true}
                onChange={text => shipperCancelReason(text)} // Truyền hàm cập nhật state vào prop onChange
                value={''}
              />
              <TextComponent
                text={'Bạn chỉ được hủy đơn 3 lần trong 1 ngày'}
                size={14}
                color={appColors.red}
              />
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
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modal: {
    width: '100%',
    maxWidth: 400,
    minHeight: 162,
    backgroundColor: appColors.white,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
});

export default ModalComponent;
