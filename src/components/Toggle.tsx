import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Theme } from '../theme';

type Props = {
  value: boolean;
  onChange: (v: boolean) => void;
  t: Theme;
};

export function Toggle({ value, onChange, t }: Props) {
  return (
    <Pressable
      onPress={() => onChange(!value)}
      style={[
        styles.track,
        { backgroundColor: value ? t.primary : t.isDark ? t.surfaceAlt : '#E2E5EC' },
      ]}
    >
      <View style={[styles.thumb, { left: value ? 22 : 2 }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 48,
    height: 28,
    borderRadius: 999,
    position: 'relative',
  },
  thumb: {
    position: 'absolute',
    top: 2,
    width: 24,
    height: 24,
    borderRadius: 999,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
});
