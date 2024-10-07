import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {globalStyles} from '../../styles/global/GlobalStyles';
import {RowComponent, TextComponent} from '../atoms';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft} from 'iconsax-react-native';
import {appColors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';

const ContainerComponent = ({
  title,
  back,
  isSroll,
  isImageBackground,
  children,
}) => {
  const {goBack} = useNavigation();
  const headerComponent = () => {
    return (
      <View style={{flex: 1}}>
        {(title || back) && (
          <RowComponent>
            {back && (
              <TouchableOpacity
                onPress={() => goBack()}
                style={{marginRight: 12}}>
                <ArrowLeft size={24} color={appColors.black1} />
              </TouchableOpacity>
            )}
            {title ? (
              <TextComponent
                text={title}
                size={16}
                font={fontFamilies.medium}
                flex={1}
              />
            ) : (
              <></>
            )}
            {returnContainer}
          </RowComponent>
        )}
      </View>
    );
  };

  // Hàm trả vể container là ScrollView hoặc View bình thường
  const returnContainer = isSroll ? (
    <ScrollView showsHorizontalScrollIndicator={false} style={{flex: 1}}>
      {children}
    </ScrollView>
  ) : (
    <View style={{flex: 1}}>{children}</View>
  );

  return isImageBackground ? (
    <ImageBackground style={{flex: 1}} imageStyle={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>{headerComponent()}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={globalStyles.container}>
      {headerComponent()}
    </SafeAreaView>
  );
};

export default ContainerComponent;
