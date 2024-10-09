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
    marginHorizontal: 10,
  },

  shortPrimary: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    minWidth: 60,
    backgroundColor: appColors.primary,
    borderRadius: 48,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
  },

  shortOutline: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'transparent',
    borderRadius: 48,
    borderWidth: 1,
    borderColor: appColors.gray3,
    minHeight: 28,
    maxWidth: 120,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },

  gray: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: 40,
    backgroundColor: appColors.gray1,
    borderRadius: 8,
    marginHorizontal: 10,
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
    marginHorizontal: 10,
  },

  empty: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
    marginHorizontal: 10,
  },
};
