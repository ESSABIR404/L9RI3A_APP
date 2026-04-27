import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FONT_BRAND, FONT_BRAND_UPRIGHT } from '../theme';

type Props = {
  size?: number;
  color?: string;
};

export function Logo({ size = 22, color = '#0F1523' }: Props) {
  return (
    <View style={styles.row}>
      <Text style={[styles.italic, { fontSize: size, color }]}>L</Text>
      <Text style={[styles.upright, { fontSize: size, color }]}>9</Text>
      <Text style={[styles.italic, { fontSize: size, color }]}>RI</Text>
      <Text style={[styles.upright, { fontSize: size, color }]}>3</Text>
      <Text style={[styles.italic, { fontSize: size, color }]}>A</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'baseline' },
  italic: {
    fontFamily: FONT_BRAND,
    letterSpacing: -0.5,
    lineHeight: undefined,
  },
  upright: {
    fontFamily: FONT_BRAND_UPRIGHT,
    letterSpacing: -0.5,
  },
});
