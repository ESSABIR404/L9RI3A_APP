import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Theme, FONT_UI_SEMI } from '../theme';

type Props = {
  children: React.ReactNode;
  active?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
  t: Theme;
};

export function Chip({ children, active, onPress, icon, t }: Props) {
  const bg = active ? t.textPrimary : t.isDark ? t.surfaceAlt : '#fff';
  const color = active ? (t.isDark ? t.bg : '#fff') : t.textPrimary;
  const borderColor = active ? 'transparent' : t.border;
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        { backgroundColor: bg, borderColor },
      ]}
    >
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <Text style={[styles.text, { color }]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    gap: 6,
  },
  icon: { marginRight: 2 },
  text: {
    fontFamily: FONT_UI_SEMI,
    fontSize: 13,
    letterSpacing: -0.1,
  },
});
