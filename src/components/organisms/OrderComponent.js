import React, {useState} from 'react';
import {
  Image,
  ImageBase,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  Space,
  TextComponent,
} from '../atoms';
import {fontFamilies} from '../../constants/fontFamilies';
import {appColors} from '../../constants/colors';
import {buttonStyles} from '../../styles/atoms/buttonStyles';
import {ArrowDown, ArrowUp, ItemsTest} from '../../assets/images';
import {SvgUri} from 'react-native-svg';
import {OrderInfoFromComponent} from '../molecules';
import OrderInfoToComponent from '../molecules/OrderInfoToComponent';
import {ORDERTYPE} from '../../constants/orderType';

const OrderComponent = ({type}) => {
  const onCallClient = clientPhone => {};
  const [isShowListItems, setIsShowListItems] = useState(true);
  return (
    <>
      {/* Thông tin chi tiết shop */}
      <OrderInfoFromComponent type={type ?? 'FOOD'} />

      {type === ORDERTYPE.Transportation ? null : (
        /* Thông tin đơn hàng */
        <SectionComponent>
          <RowComponent styles={[styles.shopInfo]} alignItems="flex-start">
            <TextComponent
              flex={1}
              text={`Thông tin đơn hàng`}
              title={true}
              size={16}
              font={fontFamilies.medium}
            />
            <ButtonComponent
              onPress={() => setIsShowListItems(!isShowListItems)}
              icon={isShowListItems ? <ArrowUp /> : <ArrowDown />}
              iconFlex="right"
              type="empty"
            />
          </RowComponent>
          {/* Type === DELIVERY */}
          {type === ORDERTYPE.Delivery && isShowListItems && (
            <InputComponent
              value={`Now, let’s build a sign-up form with the React Hook Form. Start by installing the library with the below command:`}
              disbaled={true}
              flexible={true}
            />
          )}

          {type === ORDERTYPE.Delivery
            ? null
            : /* Danh sách đơn hàng */
              isShowListItems && (
                <>
                  <RowComponent
                    styles={{
                      flex: 1,
                      height: 90,
                      padding: 10,
                    }}>
                    {/* Ảnh món */}
                    <RowComponent alignItems="flex-start">
                      {/* <TextComponent
                        text={`60 x 60`}
                        title={true}
                        size={14}
                        styles={{
                          height: 60,
                          width: 60,
                          backgroundColor: appColors.gray1,
                          borderRadius: 8,
                        }}
                      /> */}
                      {/* <Image
                        source={require('../../assets/images/donHang.png')}
                      /> */}
                      <ItemsTest />
                    </RowComponent>
                    <Space width={15} />

                    {/* Tên món, topping và giá tiền */}
                    <RowComponent
                      flexDirection="column"
                      alignItems="flex-start">
                      {/* Tên, topping */}
                      <RowComponent styles={{}}>
                        <RowComponent
                          flexDirection="column"
                          alignItems="flex-start">
                          <TextComponent
                            text={'Trà sữa oreo'}
                            font={fontFamilies.medium}
                          />
                          <RowComponent>
                            <TextComponent
                              color={appColors.gray4}
                              text={'Trân châu đen'}
                            />
                            <Space width={5} />
                            <TextComponent
                              text={'x1'}
                              color={appColors.gray4}
                            />
                          </RowComponent>
                        </RowComponent>
                      </RowComponent>

                      {/* Giá tiền */}
                      <RowComponent justify="flex-start">
                        <TextComponent
                          font={fontFamilies.medium}
                          text={'2000.0000 đ'}
                        />
                      </RowComponent>
                    </RowComponent>

                    {/* Số lượng */}
                    <RowComponent
                      styles={{
                        flex: 1,
                        marginBottom: 50,
                      }}
                      justify="flex-end">
                      <Space width={4} />
                      <TextComponent
                        text={'x1'}
                        styles={{textAlign: 'right'}}
                        flex={1}
                      />
                    </RowComponent>
                  </RowComponent>
                </>
              )}
        </SectionComponent>
      )}

      <OrderInfoToComponent type={type ?? 'FOOD'} />
    </>
  );
};

const styles = StyleSheet.create({
  shopInfo: {
    alignItems: 'center',
    flex: 1,
    marginTop: 5,
    borderTopWidth: 1,
    borderColor: appColors.gray1,
    paddingTop: 10,
  },
});

export default OrderComponent;
