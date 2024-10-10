import React, {useState, useEffect, forwardRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';
import {Icon} from '@rneui/themed';
import * as Animatable from 'react-native-animatable';
import {ORDERTYPE} from '../../constants/orderType';
import {progressBarTitle} from '../../constants/messages/messages';
import {RowComponent} from '../atoms';
import {appColors} from '../../constants/colors';

// Chia ra 4 steps từ 0 đến 3
// Các step sẽ được hiển thị dưới dạng 1 dãy các icon
// Mỗi icon sẽ có một label tương ứng
// Các step đã hoàn thành sẽ có màu xanh
// Các step chưa hoàn thành sẽ có màu xám

const Step = ({label, completed}) => (
  <View style={styles.step}>
    {completed ? (
      <Animatable.View
        animation="bounceIn"
        duration={500}
        style={{
          backgroundColor: appColors.primary,
          borderRadius: 50,
          width: 24,
          height: 24,
          justifyContent: 'center',
          marginRight: 10,
        }}>
        <Icon
          name="check"
          type="font-awesome"
          size={16}
          iconStyle={{color: '#fff'}}
        />
      </Animatable.View>
    ) : (
      <Icon
        name="circle"
        type="font-awesome"
        size={8}
        color="#E7E7E7"
        containerStyle={{width: 24, height: 24, justifyContent: 'center'}}
      />
    )}
    <Text style={[styles.stepLabel, completed ? {color: '#000'} : {}]}>
      {label}
    </Text>
  </View>
);

const ProgressBarComponent = forwardRef(({status}, ref) => {
  const [currentStep, setCurrentStep] = useState(1);
  useEffect(() => {
    setCurrentStep(status);
  }, [status]);
  return (
    <RowComponent justify="center" style={styles.container} ref={ref}>
      <View style={styles.stepsContainer}>
        <Step label={progressBarTitle.step1} completed={currentStep >= 0} />
        <Progress.Bar
          style={styles.progressBar}
          progress={1}
          height={0}
          width={60}
          color={currentStep >= 0 ? appColors.primary : appColors.gray1}
        />
        <Step label={progressBarTitle.step2} completed={currentStep >= 1} />
        <Progress.Bar
          style={styles.progressBar}
          progress={1}
          height={0}
          width={60}
          color={currentStep >= 1 ? appColors.primary : appColors.gray1}
        />
        <Step label={progressBarTitle.step3} completed={currentStep >= 2} />
        <Progress.Bar
          style={styles.progressBar}
          progress={1}
          height={0}
          width={60}
          color={currentStep >= 2 ? appColors.primary : appColors.gray1}
        />
        <Step label={progressBarTitle.step4} completed={currentStep >= 3} />
      </View>
    </RowComponent>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  step: {
    width: 30,
    alignItems: 'center',
  },
  progressBar: {
    marginTop: 10,
  },
  stepLabel: {
    paddingTop: 10,
    width: 70,
    textAlign: 'center',
  },
});

export default ProgressBarComponent;
