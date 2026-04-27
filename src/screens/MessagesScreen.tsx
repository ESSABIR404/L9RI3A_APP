import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, StyleSheet } from 'react-native';
import { Theme, TYPE, FONT_UI_BOLD, FONT_UI_EXTRA, FONT_UI_SEMI, FONT_UI_MEDIUM } from '../theme';
import { MarketHeader } from '../components/MarketHeader';
import { Chip } from '../components/Chip';
import { Icon } from '../components/Icon';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { L9_CONVERSATIONS } from '../data';
import { App } from '../nav';

type Props = { t: Theme; app: App };

export function MessagesScreen({ t, app }: Props) {
  const [tab, setTab] = useState<'toutes' | 'achat' | 'echange'>('toutes');
  const list = L9_CONVERSATIONS.filter((c) => tab === 'toutes' || c.type === tab);

  return (
    <View style={[styles.root, { backgroundColor: t.bg }]}>
      <MarketHeader
        t={t}
        onMenu={() => app.setDrawer(true)}
        onNotif={() => app.push('notifications')}
      />
      <View style={[styles.head, { backgroundColor: t.bgElev, borderBottomColor: t.divider }]}>
        <Text style={[TYPE.displayMd, { color: t.textPrimary }]}>Messages</Text>
        <Text style={[TYPE.bodySm, { color: t.textSecondary, marginTop: 4, marginBottom: 14 }]}>
          Discussions avec vendeurs et acheteurs
        </Text>
        <Pressable
          onPress={() => app.setSearch(true)}
          style={[
            styles.searchBar,
            { backgroundColor: t.isDark ? t.surfaceAlt : '#F6F8FB', borderColor: t.border },
          ]}
        >
          <Icon name="search" size={16} color={t.textTertiary} />
          <Text style={[TYPE.body, { color: t.textTertiary, flex: 1 }]}>
            Rechercher une conversation
          </Text>
        </Pressable>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
          <Chip t={t} active={tab === 'toutes'} onPress={() => setTab('toutes')}>
            Toutes
          </Chip>
          <Chip t={t} active={tab === 'achat'} onPress={() => setTab('achat')}>
            Achats
          </Chip>
          <Chip t={t} active={tab === 'echange'} onPress={() => setTab('echange')}>
            Échanges
          </Chip>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {list.map((c) => (
          <Pressable
            key={c.id}
            onPress={() => app.push('conversation', { id: c.id })}
            style={[
              styles.row,
              {
                borderBottomColor: t.divider,
                backgroundColor:
                  c.unread > 0 ? (t.isDark ? 'rgba(59,139,255,0.04)' : '#FAFBFE') : 'transparent',
              },
            ]}
          >
            <Avatar src={c.user.avatar} name={c.user.name} size={50} t={t} />
            <View style={{ flex: 1, minWidth: 0 }}>
              <View style={styles.headerRow}>
                <Text
                  numberOfLines={1}
                  style={{
                    flex: 1,
                    fontFamily: c.unread > 0 ? FONT_UI_EXTRA : FONT_UI_SEMI,
                    fontSize: 15,
                    color: t.textPrimary,
                    letterSpacing: -0.2,
                  }}
                >
                  {c.user.name}
                </Text>
                <Text
                  style={{
                    fontFamily: c.unread > 0 ? FONT_UI_BOLD : FONT_UI_MEDIUM,
                    fontSize: 11,
                    color: c.unread > 0 ? t.primary : t.textTertiary,
                  }}
                >
                  {c.time}
                </Text>
              </View>
              <View style={styles.previewRow}>
                <Text
                  numberOfLines={1}
                  style={{
                    flex: 1,
                    fontFamily: c.unread > 0 ? FONT_UI_SEMI : FONT_UI_MEDIUM,
                    fontSize: 13,
                    color: c.unread > 0 ? t.textPrimary : t.textSecondary,
                  }}
                >
                  {c.lastMessage}
                </Text>
                {c.unread > 0 ? (
                  <View style={[styles.badge, { backgroundColor: t.primary }]}>
                    <Text
                      style={{
                        color: '#fff',
                        fontFamily: FONT_UI_BOLD,
                        fontSize: 11,
                      }}
                    >
                      {c.unread}
                    </Text>
                  </View>
                ) : null}
              </View>
              <View style={styles.productRow}>
                <Image source={{ uri: c.product.image }} style={styles.thumb} />
                <Text
                  numberOfLines={1}
                  style={{
                    flex: 1,
                    fontFamily: FONT_UI_MEDIUM,
                    fontSize: 11,
                    color: t.textTertiary,
                  }}
                >
                  {c.product.title}
                </Text>
                <Badge t={t} variant={c.type === 'echange' ? 'accentSoft' : 'soft'} size="sm">
                  {c.type === 'echange' ? 'Échange' : 'Achat'}
                </Badge>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  head: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 12, borderBottomWidth: 1 },
  searchBar: {
    height: 42,
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  previewRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 3 },
  productRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  thumb: { width: 22, height: 22, borderRadius: 6 },
  badge: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
