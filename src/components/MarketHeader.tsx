import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Theme, FONT_UI_SEMI } from '../theme';
import { Icon } from './Icon';
import { Logo } from './Logo';

type Props = {
  t: Theme;
  onMenu?: () => void;
  onNotif?: () => void;
  location?: string;
  notifCount?: number;
};

export function MarketHeader({ t, onMenu, onNotif, location = 'Casablanca', notifCount = 3 }: Props) {
  return (
    <View style={[styles.wrap, { backgroundColor: t.bgElev, borderBottomColor: t.divider }]}>
      <Pressable
        onPress={onMenu}
        style={[styles.iconButton, { borderColor: t.border }]}
        hitSlop={6}
      >
        <Icon name="menu" size={20} color={t.textPrimary} />
      </Pressable>

      <View style={styles.center}>
        <View style={styles.locationRow}>
          <Icon name="pin" size={10} color={t.textTertiary} />
          <Text style={[styles.locationText, { color: t.textTertiary }]}>{location.toUpperCase()}</Text>
        </View>
        <Logo size={22} color={t.textPrimary} />
      </View>

      <Pressable
        onPress={onNotif}
        style={[styles.iconButton, { borderColor: t.border }]}
        hitSlop={6}
      >
        <Icon name="bell" size={20} color={t.textPrimary} />
        {notifCount > 0 ? (
          <View style={[styles.dot, { backgroundColor: t.danger, borderColor: t.bgElev }]} />
        ) : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  locationText: {
    fontSize: 11,
    fontFamily: FONT_UI_SEMI,
    letterSpacing: 0.6,
  },
  dot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 999,
    borderWidth: 2,
  },
});
