import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Theme, FONT_UI_BOLD } from '../theme';

type Props = {
  src?: string;
  name?: string;
  size?: number;
  t: Theme;
  ring?: boolean;
};

export function Avatar({ src, name, size = 40, t, ring }: Props) {
  const initials = (name || '?')
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <View
      style={[
        styles.wrap,
        {
          width: size,
          height: size,
          borderRadius: 999,
          backgroundColor: src ? '#eee' : t.primary,
          borderWidth: ring ? 2 : 0,
          borderColor: t.primary,
        },
      ]}
    >
      {src ? (
        <Image source={{ uri: src }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
      ) : (
        <Text
          style={{
            color: '#fff',
            fontFamily: FONT_UI_BOLD,
            fontSize: size * 0.4,
          }}
        >
          {initials}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  },
});
