import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Theme, FONT_UI_BOLD } from '../theme';

type Variant = 'primary' | 'soft' | 'accent' | 'accentSoft' | 'success' | 'warning' | 'danger' | 'neutral' | 'dark';

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  size?: 'sm' | 'md';
  t: Theme;
  style?: ViewStyle;
};

export function Badge({ children, variant = 'primary', size = 'md', t, style }: Props) {
  const palettes: Record<Variant, { bg: string; color: string }> = {
    primary: { bg: t.primary, color: '#fff' },
    soft: { bg: t.primarySoft, color: t.primary },
    accent: { bg: t.accent, color: '#fff' },
    accentSoft: { bg: t.accentSoft, color: t.accent },
    success: { bg: t.successSoft, color: t.success },
    warning: { bg: t.warningSoft, color: t.warning },
    danger: { bg: t.dangerSoft, color: t.danger },
    neutral: { bg: t.isDark ? t.surfaceAlt : '#F1F3F7', color: t.textSecondary },
    dark: { bg: 'rgba(15, 21, 35, 0.85)', color: '#fff' },
  };
  const p = palettes[variant];
  const dims =
    size === 'sm'
      ? { paddingVertical: 3, paddingHorizontal: 8, fontSize: 11, borderRadius: 6 }
      : { paddingVertical: 5, paddingHorizontal: 10, fontSize: 11.5, borderRadius: 8 };
  return (
    <View
      style={[
        styles.wrap,
        {
          backgroundColor: p.bg,
          paddingVertical: dims.paddingVertical,
          paddingHorizontal: dims.paddingHorizontal,
          borderRadius: dims.borderRadius,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { color: p.color, fontSize: dims.fontSize }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: FONT_UI_BOLD,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
});
