import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../atoms';
import {LocationMarkerWhite} from '../../../assets/images';
import {fontFamilies} from '../../../constants/fontFamilies';

const LocationScreen = () => {
  return (
    <>
      <ImageBackground
        source={require('../../../assets/images/SplashScreen.png')}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        imageStyle={{flex: 1}}>
        <SectionComponent styles={[styles.container]}>
          <RowComponent styles={[styles.rowItems]}>
            <TextComponent
              text={<LocationMarkerWhite />}
              styles={{marginLeft: 10}}
            />
            <TextComponent
              text={
                '158 An Dương Vương, phường An Lạc, Quận Bình Tân, TP. Hồ Chí Minh'
              }
              size={16}
              styles={[styles.text]}
            />
          </RowComponent>
          <ButtonComponent
            type="white"
            title="Xác nhận"
            textStyle={{fontFamily: fontFamilies.bold}}
          />
        </SectionComponent>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 160,
    paddingHorizontal: 24,
  },
  text: {
    color: 'white',
    fontFamily: fontFamilies.bold,
    marginHorizontal: 24,
    marginLeft: 10,
  },
  rowItems: {
    alignItems: 'center',
    padding: 10,
  },
});

export default LocationScreen;
