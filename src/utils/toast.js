import Toast from 'react-native-toast-message';

/**
 * @typedef {"success" | "error" | "info"} toastType
 * @param {toastType} type
 * @param {string} text2
 * @param {string} [text1='Thông báo']
 * @param {number} [visibilityTime=2000]
 */
const toast = (type, text2, text1 = 'Thông báo', visibilityTime = 3000) => {
  Toast.show({
    type: type,
    text2: text2,
    text1: text1,
    visibilityTime: visibilityTime,
  });
};

export default toast;
