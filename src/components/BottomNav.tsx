import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme, FONT_UI_BOLD, FONT_UI_SEMI } from '../theme';
import { Icon, IconName } from './Icon';

export type TabId = 'marche' | 'favoris' | 'ia' | 'messages' | 'profil';

type Tab = { id: TabId; label: string; icon: IconName; pill?: boolean };

const TABS: Tab[] = [
  { id: 'marche', label: 'Marché', icon: 'grid' },
  { id: 'favoris', label: 'Favoris', icon: 'heart' },
  { id: 'ia', label: 'IA', icon: 'sparkle', pill: true },
  { id: 'messages', label: 'Messages', icon: 'chat' },
  { id: 'profil', label: 'Profil', icon: 'user' },
];

type Props = {
  active: TabId;
  onChange: (id: TabId) => void;
  t: Theme;
};

export function BottomNav({ active, onChange, t }: Props) {
  return (
    <View style={[styles.wrap, { backgroundColor: t.bgElev, borderTopColor: t.divider }]}>
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        if (tab.pill) {
          return (
            <Pressable key={tab.id} onPress={() => onChange(tab.id)} style={styles.item}>
              {isActive ? (
                <LinearGradient
                  colors={[t.primary, '#7C4DFF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.pill}
                >
                  <Icon name="sparkle" size={18} color="#fff" filled />
                </LinearGradient>
              ) : (
                <View style={[styles.pill, { backgroundColor: t.isDark ? t.surfaceAlt : '#F1F3F7' }]}>
                  <Icon name="sparkle" size={18} color={t.textSecondary} />
                </View>
              )}
              <Text
                style={[
                  styles.pillLabel,
                  { color: isActive ? t.primary : t.textTertiary },
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        }
        return (
          <Pressable key={tab.id} onPress={() => onChange(tab.id)} style={styles.item}>
            <Icon
              name={tab.icon}
              size={22}
              color={isActive ? t.primary : t.textTertiary}
              filled={isActive}
            />
            <Text style={[styles.label, { color: isActive ? t.primary : t.textTertiary }]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingBottom: 26,
    paddingHorizontal: 8,
    borderTopWidth: 1,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 4,
  },
  label: {
    fontFamily: FONT_UI_SEMI,
    fontSize: 11,
    letterSpacing: -0.1,
    marginTop: 4,
  },
  pill: {
    width: 48,
    height: 34,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillLabel: {
    fontFamily: FONT_UI_BOLD,
    fontSize: 11,
    letterSpacing: -0.1,
    marginTop: 3,
  },
});
