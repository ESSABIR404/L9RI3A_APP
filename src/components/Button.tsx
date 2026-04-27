import React from 'react';
import { Pressable, Text, View, StyleSheet, ViewStyle } from 'react-native';
import { Theme, TYPE } from '../theme';

type Variant = 'primary' | 'secondary' | 'soft' | 'ghost' | 'danger' | 'dangerSoft';
type Size = 'sm' | 'md' | 'lg';

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  full?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  t: Theme;
  style?: ViewStyle;
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  full = true,
  onPress,
  icon,
  disabled,
  t,
  style,
}: Props) {
  const heights: Record<Size, number> = { sm: 40, md: 52, lg: 56 };
  const fontStyle = size === 'lg' ? TYPE.buttonLg : size === 'sm' ? TYPE.buttonSm : TYPE.button;

  const palettes: Record<Variant, { bg: string; color: string; border: string }> = {
    primary: { bg: t.primary, color: '#fff', border: 'transparent' },
    secondary: { bg: t.isDark ? t.surfaceAlt : '#fff', color: t.textPrimary, border: t.border },
    soft: { bg: t.primarySoft, color: t.primary, border: 'transparent' },
    ghost: { bg: 'transparent', color: t.primary, border: 'transparent' },
    danger: { bg: t.danger, color: '#fff', border: 'transparent' },
    dangerSoft: { bg: t.dangerSoft, color: t.danger, border: 'transparent' },
  };
  const s = palettes[variant];

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={[
        styles.base,
        {
          height: heights[size],
          backgroundColor: s.bg,
          borderColor: s.border,
          opacity: disabled ? 0.4 : 1,
          width: full ? '100%' : undefined,
          ...(variant === 'primary' && !disabled
            ? {
                shadowColor: t.primary,
                shadowOpacity: 0.25,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
                elevation: 3,
              }
            : {}),
        },
        style,
      ]}
    >
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <Text style={[fontStyle, { color: s.color }]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1,
  },
  icon: { marginRight: 0 },
});
