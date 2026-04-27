import { TextStyle } from 'react-native';

export type Theme = {
  primary: string;
  primaryHover: string;
  primarySoft: string;
  primarySoftBorder: string;

  bg: string;
  bgElev: string;
  surface: string;
  surfaceAlt: string;

  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textOnPrimary: string;

  border: string;
  borderStrong: string;
  divider: string;

  success: string;
  successSoft: string;
  danger: string;
  dangerSoft: string;
  warning: string;
  warningSoft: string;

  accent: string;
  accentSoft: string;

  isDark: boolean;
};

export const L9_LIGHT: Theme = {
  primary: '#1877F2',
  primaryHover: '#166FE5',
  primarySoft: '#E7F0FE',
  primarySoftBorder: '#D0E2FD',

  bg: '#F6F7FB',
  bgElev: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceAlt: '#F2F4F8',

  textPrimary: '#0F1523',
  textSecondary: '#4A5365',
  textTertiary: '#8892A5',
  textOnPrimary: '#FFFFFF',

  border: '#E7EAF1',
  borderStrong: '#D4D9E4',
  divider: '#EEF0F5',

  success: '#10B981',
  successSoft: '#E6F7F1',
  danger: '#EF4444',
  dangerSoft: '#FEECEC',
  warning: '#F59E0B',
  warningSoft: '#FEF3E1',

  accent: '#7C4DFF',
  accentSoft: '#EFE9FF',

  isDark: false,
};

export const L9_DARK: Theme = {
  primary: '#3B8BFF',
  primaryHover: '#5A9EFF',
  primarySoft: 'rgba(59, 139, 255, 0.15)',
  primarySoftBorder: 'rgba(59, 139, 255, 0.3)',

  bg: '#0A0D14',
  bgElev: '#141924',
  surface: '#161C28',
  surfaceAlt: '#1E2533',

  textPrimary: '#F4F6FA',
  textSecondary: '#A7B0C2',
  textTertiary: '#6B7487',
  textOnPrimary: '#FFFFFF',

  border: '#232B3A',
  borderStrong: '#303A4D',
  divider: '#1C2330',

  success: '#34D399',
  successSoft: 'rgba(52, 211, 153, 0.15)',
  danger: '#F87171',
  dangerSoft: 'rgba(248, 113, 113, 0.15)',
  warning: '#FBBF24',
  warningSoft: 'rgba(251, 191, 36, 0.15)',

  accent: '#A78BFA',
  accentSoft: 'rgba(167, 139, 250, 0.18)',

  isDark: true,
};

export const FONT_UI = 'Inter_400Regular';
export const FONT_UI_MEDIUM = 'Inter_500Medium';
export const FONT_UI_SEMI = 'Inter_600SemiBold';
export const FONT_UI_BOLD = 'Inter_700Bold';
export const FONT_UI_EXTRA = 'Inter_800ExtraBold';
export const FONT_BRAND = 'Fraunces_900Black_Italic';
export const FONT_BRAND_UPRIGHT = 'Fraunces_900Black';

export const RADIUS = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  pill: 9999,
};

type TypeToken = Pick<
  TextStyle,
  'fontFamily' | 'fontSize' | 'lineHeight' | 'letterSpacing' | 'textTransform'
>;

export const TYPE: Record<string, TypeToken> = {
  displayXl: { fontFamily: FONT_UI_EXTRA, fontSize: 32, lineHeight: 36, letterSpacing: -0.6 },
  displayLg: { fontFamily: FONT_UI_EXTRA, fontSize: 28, lineHeight: 32, letterSpacing: -0.5 },
  displayMd: { fontFamily: FONT_UI_EXTRA, fontSize: 24, lineHeight: 28, letterSpacing: -0.4 },
  h1: { fontFamily: FONT_UI_BOLD, fontSize: 22, lineHeight: 28, letterSpacing: -0.4 },
  h2: { fontFamily: FONT_UI_BOLD, fontSize: 18, lineHeight: 24, letterSpacing: -0.3 },
  h3: { fontFamily: FONT_UI_BOLD, fontSize: 16, lineHeight: 22, letterSpacing: -0.2 },
  bodyLg: { fontFamily: FONT_UI, fontSize: 16, lineHeight: 24, letterSpacing: -0.1 },
  body: { fontFamily: FONT_UI, fontSize: 14, lineHeight: 21, letterSpacing: -0.05 },
  bodyStrong: { fontFamily: FONT_UI_SEMI, fontSize: 14, lineHeight: 20, letterSpacing: -0.1 },
  bodySm: { fontFamily: FONT_UI, fontSize: 13, lineHeight: 19, letterSpacing: 0 },
  label: { fontFamily: FONT_UI_SEMI, fontSize: 13, lineHeight: 18, letterSpacing: -0.05 },
  labelSm: { fontFamily: FONT_UI_SEMI, fontSize: 12, lineHeight: 16, letterSpacing: 0 },
  buttonLg: { fontFamily: FONT_UI_SEMI, fontSize: 16, lineHeight: 20, letterSpacing: -0.1 },
  button: { fontFamily: FONT_UI_SEMI, fontSize: 15, lineHeight: 20, letterSpacing: -0.1 },
  buttonSm: { fontFamily: FONT_UI_SEMI, fontSize: 13, lineHeight: 18, letterSpacing: 0 },
  caption: { fontFamily: FONT_UI_MEDIUM, fontSize: 12, lineHeight: 16, letterSpacing: 0 },
  captionSm: { fontFamily: FONT_UI_MEDIUM, fontSize: 11, lineHeight: 15, letterSpacing: 0.1 },
  eyebrow: {
    fontFamily: FONT_UI_BOLD,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  eyebrowXs: {
    fontFamily: FONT_UI_BOLD,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
};

export const SHADOWS = {
  sm: {
    shadowColor: '#0F1523',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  md: {
    shadowColor: '#0F1523',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  lg: {
    shadowColor: '#0F1523',
    shadowOpacity: 0.14,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 16 },
    elevation: 12,
  },
};
