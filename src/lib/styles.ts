import { HeaderOptions } from '@react-navigation/elements';

export const colors = {
  main: {
    primaryLight: '#DAC6BE',
    primary: '#7C6354',
    primaryDark: '#564439',
    black: '#070707',
    white: '#FBFCFF',
    gray: '#F4F6F6',
    gray5: 'rgba(0,0,0,.5)',
    gray10: 'rgba(0,0,0,.1)',
    gray20: 'rgba(0,0,0,.2)',
    gray25: 'rgba(0,0,0,.25)',
    gray50: 'rgba(0,0,0,.5)',
    blue: '#2176FF',
    blue75: 'rgba(33,118,255,.75)',
    red: 'rgba(237,125,58,1)'
  },
  indicators: {
    success: '#C6CA53',
    error: '#EF2D56',
    warning: '#ED7D3A',
    rating: '#F9CB40'
  }
};

export const fonts = {
  ComfortaaBold: 'Comfortaa-Bold',
  ComfortaaLight: 'Comfortaa-Light',
  ComfortaaMedium: 'Comfortaa-Medium',
  ComfortaaRegular: 'Comfortaa-Regular',
  ComfortaaSemiBold: 'Comfortaa-SemiBold',
  CrimsonProBlack: 'CrimsonPro-Black',
  CrimsonProBlackItalic: 'CrimsonPro-BlackItalic',
  CrimsonProBold: 'CrimsonPro-Bold',
  CrimsonProBoldItalic: 'CrimsonPro-BoldItalic',
  CrimsonProExtraBold: 'CrimsonPro-ExtraBold',
  CrimsonProExtraBoldItalic: 'CrimsonPro-ExtraBoldItalic',
  CrimsonProExtraLight: 'CrimsonPro-ExtraLight',
  CrimsonProExtraLightItalic: 'CrimsonPro-ExtraLightItalic',
  CrimsonProItalic: 'CrimsonPro-Italic',
  CrimsonProLight: 'CrimsonPro-Light',
  CrimsonProLightItalic: 'CrimsonPro-LightItalic',
  CrimsonProMedium: 'CrimsonPro-Medium',
  CrimsonProRegular: 'CrimsonPro-Regular',
  CrimsonProSemiBold: 'CrimsonPro-SemiBold',
  CrimsonProSemiBoldItalic: 'CrimsonPro-SemiBoldItalic',
  NunitoSansBlack: 'NunitoSans-Black',
  NunitoSansBlackItalic: 'NunitoSans-BlackItalic',
  NunitoSansBold: 'NunitoSans-Bold',
  NunitoSansBoldItalic: 'NunitoSans-BoldItalic',
  NunitoSansExtraBold: 'NunitoSans-ExtraBold',
  NunitoSansExtraBoldItalic: 'NunitoSans-ExtraBoldItalic',
  NunitoSansExtraLight: 'NunitoSans-ExtraLight',
  NunitoSansExtraLightItalic: 'NunitoSans-ExtraLightItalic',
  NunitoSansItalic: 'NunitoSans-Italic',
  NunitoSansLight: 'NunitoSans-Light',
  NunitoSansLightItalic: 'NunitoSans-LightItalic',
  NunitoSansRegular: 'NunitoSans-Regular',
  NunitoSansSemiBold: 'NunitoSans-SemiBold',
  NunitoSansSemiBoldItalic: 'NunitoSans-SemiBoldItalic'
};

export const navigationHeader: HeaderOptions = {
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: colors.main.white
  },
  headerTransparent: true,
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontFamily: fonts.NunitoSansRegular,
    fontSize: 18,
    letterSpacing: 1.33,
    color: colors.main.black
  }
};
