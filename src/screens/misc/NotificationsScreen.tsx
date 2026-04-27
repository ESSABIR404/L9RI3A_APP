import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Theme, TYPE, FONT_UI_BOLD, FONT_UI_SEMI } from '../../theme';
import { BackHeader } from '../../components/BackHeader';
import { Chip } from '../../components/Chip';
import { Avatar } from '../../components/Avatar';
import { Icon, IconName } from '../../components/Icon';
import { L9_NOTIFICATIONS, Notification } from '../../data';
import { App } from '../../nav';

type Filter = 'toutes' | 'non-lues' | 'messages' | 'offres';
type Props = { t: Theme; app: App };

export function NotificationsScreen({ t, app }: Props) {
  const [filter, setFilter] = useState<Filter>('toutes');
  const list = L9_NOTIFICATIONS.filter((n) => {
    if (filter === 'toutes') return true;
    if (filter === 'non-lues') return n.unread;
    if (filter === 'messages') return n.type === 'message';
    if (filter === 'offres') return ['offer', 'accepted', 'rejected'].includes(n.type);
    return true;
  });

  return (
    <View style={[styles.root, { backgroundColor: t.bg }]}>
      <BackHeader t={t} onBack={app.back} title="Notifications" subtitle="3 non lues" />
      <View
        style={[styles.tabs, { backgroundColor: t.bgElev, borderBottomColor: t.divider }]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {([
            ['toutes', 'Toutes'],
            ['non-lues', 'Non lues'],
            ['messages', 'Messages'],
            ['offres', 'Offres'],
          ] as [Filter, string][]).map(([v, l]) => (
            <Chip key={v} t={t} active={filter === v} onPress={() => setFilter(v)}>
              {l}
            </Chip>
          ))}
        </ScrollView>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {list.map((n) => (
          <Item key={n.id} n={n} t={t} />
        ))}
      </ScrollView>
    </View>
  );
}

function Item({ n, t }: { n: Notification; t: Theme }) {
  const palette = ((): { bg: string; color: string } => {
    if (n.type === 'accepted') return { bg: t.successSoft, color: t.success };
    if (n.type === 'rejected') return { bg: t.dangerSoft, color: t.danger };
    if (n.type === 'sold') return { bg: t.accentSoft, color: t.accent };
    if (n.type === 'rating') return { bg: t.warningSoft, color: t.warning };
    return { bg: t.primarySoft, color: t.primary };
  })();

  return (
    <View
      style={[
        styles.row,
        {
          borderBottomColor: t.divider,
          backgroundColor: n.unread ? (t.isDark ? 'rgba(59,139,255,0.04)' : '#FAFBFE') : 'transparent',
        },
      ]}
    >
      {n.avatar ? (
        <Avatar src={n.avatar} size={42} t={t} />
      ) : (
        <View style={[styles.iconWrap, { backgroundColor: palette.bg }]}>
          <Icon name={(n.icon as IconName) || 'info'} size={20} color={palette.color} />
        </View>
      )}
      <View style={{ flex: 1, minWidth: 0 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
          <Text
            style={{
              flex: 1,
              fontFamily: n.unread ? FONT_UI_BOLD : FONT_UI_SEMI,
              fontSize: 14,
              color: t.textPrimary,
              letterSpacing: -0.2,
            }}
          >
            {n.title}
          </Text>
          {n.unread ? (
            <View style={[styles.dot, { backgroundColor: t.primary }]} />
          ) : null}
        </View>
        <Text style={{ ...TYPE.bodySm, color: t.textSecondary, marginTop: 3 }}>{n.body}</Text>
        <Text style={{ ...TYPE.captionSm, color: t.textTertiary, marginTop: 4 }}>{n.time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  tabs: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1 },
  row: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'flex-start',
    borderBottomWidth: 1,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: { width: 8, height: 8, borderRadius: 999, marginTop: 7 },
});
