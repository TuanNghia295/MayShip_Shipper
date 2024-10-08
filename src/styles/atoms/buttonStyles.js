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
    borderColor: appColors.primary,
  },

  shortPrimary: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: appColors.primary,
    minHeight: 28,
    maxWidth: 120,
    borderRadius: 48,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },

  shortOutline: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'transparent',
    borderRadius: 48,
    borderWidth: 1,
    borderColor: appColors.primary,
    minHeight: 28,
    maxWidth: 120,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },

  gray: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: 40,
    backgroundColor: appColors.gray1,
    borderRadius: 8,
  },

  shortGray: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: appColors.gray1,
    borderRadius: 48,
    minHeight: 28,
    maxWidth: 120,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
};
