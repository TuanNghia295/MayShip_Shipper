import React from 'react';
import {StyleSheet, View} from 'react-native';
import {orderStyle} from '../../styles/templates/orderStyle';
import {InputComponent, SectionComponent} from '../atoms';
import {Delivery} from '../../assets/images';
const CurrentOrder = () => {
  return (
    <SectionComponent styles={orderStyle.container}>
      <Delivery />
      <InputComponent placeholder="Search" allowClear={true} disbaled={false} />
      {/* <ButtonComponent type="outline" title="hello" /> */}
    </SectionComponent>
  );
};

const styles = StyleSheet.create({});

export default CurrentOrder;
