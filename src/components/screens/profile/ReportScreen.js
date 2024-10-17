import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  Space,
  TextComponent,
} from '../../atoms';
import {ArrowDown, ArrowDown2, ArrowDown3} from 'iconsax-react-native';
import {appColors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';

const ReportScreen = () => {
  return (
    <SectionComponent>
      <SectionComponent styles={[styles.startEnd]}>
        <RowComponent flexDirection="row">
          <RowComponent
            flexDirection="column"
            alignItems="flex-start"
            styles={{flex: 1}}>
            <TextComponent text={'Ngày bắt đầu'} font={fontFamilies.medium} />
            <InputComponent
              placeHolder={'DD/MM/YYYY'}
              suffix={<ArrowDown2 color={appColors.gray3} />}
            />
          </RowComponent>

          <Space width={10} />

          <RowComponent
            flexDirection="column"
            alignItems="flex-start"
            styles={{flex: 1}}>
            <TextComponent text={'Ngày kết thúc'} font={fontFamilies.medium} />
            <InputComponent
              placeHolder={'DD/MM/YYYY'}
              suffix={<ArrowDown2 color={appColors.gray3} />}
            />
          </RowComponent>
        </RowComponent>
        <ButtonComponent type="primary" title="Lọc" />
      </SectionComponent>
    </SectionComponent>
  );
};

const styles = StyleSheet.create({
  startEnd: {
    paddingHorizontal: 24,
  },
});

export default ReportScreen;
