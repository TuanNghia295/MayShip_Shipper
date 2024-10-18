import React, {useState, useEffect, forwardRef} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import * as Progress from 'react-native-progress';
import {Icon} from '@rneui/themed';
import * as Animatable from 'react-native-animatable';
import {
  progressBarTitle,
  progressButtonTitle,
} from '../../constants/messages/messages';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  Space,
  TextComponent,
} from '../atoms';
import {appColors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {Dimensions} from 'react-native';
import {ScreenWidth} from '@rneui/base';

const {width: screenWidth} = Dimensions.get('window');

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
    <TextComponent
      text={label}
      styles={[styles.stepLabel, completed ? {color: '#000'} : {}]}
    />
  </View>
);

const ProgressBarComponent = forwardRef(({status}, ref) => {
  const [currentStep, setCurrentStep] = useState(status ?? 2);
  useEffect(() => {
    setCurrentStep(status);
  }, [status]);
  return (
    <SectionComponent>
      <RowComponent
        style={styles.container}
        justify="center"
        alignItems="flex-start"
        ref={ref}>
        <View style={styles.stepsContainer}>
          <Step label={progressBarTitle.step1} completed={currentStep >= 1} />
          <Progress.Bar
            style={styles.progressBar}
            progress={1}
            height={0}
            width={screenWidth * 0.1}
            color={currentStep >= 2 ? appColors.primary : appColors.gray1}
          />
          <Step label={progressBarTitle.step2} completed={currentStep >= 2} />
          <Progress.Bar
            style={styles.progressBar}
            progress={1}
            height={0}
            width={screenWidth * 0.1}
            color={currentStep >= 3 ? appColors.primary : appColors.gray1}
          />
          <Step label={progressBarTitle.step3} completed={currentStep >= 3} />
          <Progress.Bar
            style={styles.progressBar}
            progress={1}
            height={0}
            width={screenWidth * 0.1}
            color={currentStep >= 4 ? appColors.primary : appColors.gray1}
          />
          <Step label={progressBarTitle.step4} completed={currentStep >= 4} />
        </View>
      </RowComponent>
      <Space height={10} />
    </SectionComponent>
  );
});

const styles = StyleSheet.create({
  container: {},
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingRight: ScreenWidth * 0.01,
  },
  step: {
    width: screenWidth * 0.2,
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  progressBar: {
    marginTop: 10,
  },
  stepLabel: {
    width: 80,
    paddingTop: 10,
    textAlign: 'center',
  },
});

export default ProgressBarComponent;
