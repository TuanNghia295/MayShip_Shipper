import React from 'react';
import {Alert, StatusBar, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppRouter from './src/navigation/AppRouter';
import {globalStyles} from './src/styles/global/GlobalStyles';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
} from './src/components/atoms';
import TextComponent from './src/components/atoms/TextComponent';
import {ModalComponent} from './src/components/organisms';
import {messages} from './src/constants/messages';
import {fontFamilies} from './src/constants/fontFamilies';
import {appColors} from './src/constants/colors';
const App = () => {
  return (
    // <>
    //   <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
    //   <NavigationContainer>
    //     <AppRouter />
    //   </NavigationContainer>
    // </>
    <View style={globalStyles.container}>
      <TextComponent
        text={'nguyen tuan nghia'}
        size={32}
        font={fontFamilies.thin}
      />
      <InputComponent
        value={'value'}
        placeHolder={'hello em'}
        // isPassWord={true}
        allowClear={true}
      />
      {/* <ModalComponent
        title={'THÔNG BÁO'}
        cancelTitle={'Huy'}
        descripttion={messages.cancelBike}
        visible={true}
      /> */}
    </View>
  );
};

export default App;
