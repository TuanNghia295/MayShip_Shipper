import {appColors} from '../../constants/colors';

export const buttonStyles = {
  outline: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: 40,
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 1,
  },

  shortPrimary: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: 40,
    width: 88,
    backgroundColor: appColors.primary,
    borderRadius: 48,
    padding: 8,
  },

  shortOutline: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: 40,
    width: 88, 
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 1,
  },
};
