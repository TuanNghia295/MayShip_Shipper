import {StyleSheet} from 'react-native';
import {appColors} from '../../constants/colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
    justifyContent: 'center',
  },

  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: 40,
    backgroundColor: appColors.primary,
    borderRadius: 5,
    gap: 6,
  },
});
