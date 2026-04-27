import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Theme, TYPE } from '../theme';
import { Icon } from './Icon';

type Props = {
  title?: string;
  subtitle?: string;
  t: Theme;
  onBack?: () => void;
  right?: React.ReactNode;
  border?: boolean;
};

export function BackHeader({ title, subtitle, t, onBack, right, border = true }: Props) {
  return (
    <View
      style={[
        styles.wrap,
        {
          backgroundColor: t.bgElev,
          borderBottomColor: t.divider,
          borderBottomWidth: border ? 1 : 0,
        },
      ]}
    >
      <Pressable
        onPress={onBack}
        style={[styles.iconButton, { borderColor: t.border }]}
        hitSlop={6}
      >
        <Icon name="back" size={20} color={t.textPrimary} />
      </Pressable>
      <View style={styles.center}>
        {title ? (
          <Text numberOfLines={1} style={[TYPE.h3, { color: t.textPrimary }]}>
            {title}
          </Text>
        ) : null}
        {subtitle ? (
          <Text numberOfLines={1} style={[TYPE.caption, { color: t.textTertiary }]}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right ? <View>{right}</View> : <View style={{ width: 40 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: { flex: 1, minWidth: 0 },
});
