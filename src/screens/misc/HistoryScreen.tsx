import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { Theme, TYPE, FONT_UI_BOLD, FONT_UI_EXTRA, FONT_UI_SEMI } from '../../theme';
import { BackHeader } from '../../components/BackHeader';
import { Chip } from '../../components/Chip';
import { Badge } from '../../components/Badge';
import { L9_PRODUCTS } from '../../data';
import { App } from '../../nav';

type Tab = 'achats' | 'ventes' | 'echanges' | 'offres-e' | 'offres-r';

type Props = { t: Theme; app: App };

export function HistoryScreen({ t, app }: Props) {
  const [tab, setTab] = useState<Tab>('achats');
  const list = L9_PRODUCTS.slice(0, 5);

  return (
    <View style={[styles.root, { backgroundColor: t.bg }]}>
      <BackHeader t={t} onBack={app.back} title="Historique" />
      <View style={[styles.tabs, { backgroundColor: t.bgElev, borderBottomColor: t.divider }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {(
            [
              ['achats', 'Achats'],
              ['ventes', 'Ventes'],
              ['echanges', 'Échanges'],
              ['offres-e', 'Offres envoyées'],
              ['offres-r', 'Offres reçues'],
            ] as [Tab, string][]
          ).map(([v, l]) => (
            <Chip key={v} t={t} active={tab === v} onPress={() => setTab(v)}>
              {l}
            </Chip>
          ))}
        </ScrollView>
      </View>
      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {list.map((p) => (
          <View
            key={p.id}
            style={[styles.row, { backgroundColor: t.bgElev, borderColor: t.border }]}
          >
            <Image source={{ uri: p.image }} style={styles.thumb} />
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text
                numberOfLines={1}
                style={{ fontFamily: FONT_UI_BOLD, fontSize: 14, color: t.textPrimary }}
              >
                {p.title}
              </Text>
              <Text style={[TYPE.caption, { color: t.textSecondary, marginTop: 2 }]}>
                {tab === 'achats' ? 'Acheté à ' : tab === 'ventes' ? 'Vendu à ' : 'Échangé avec '}
                {p.seller.name}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <Badge
                  t={t}
                  variant={tab === 'ventes' ? 'success' : tab === 'echanges' ? 'accentSoft' : 'soft'}
                  size="sm"
                >
                  {tab === 'achats' ? 'Terminé' : tab === 'ventes' ? 'Vendu' : 'Échangé'}
                </Badge>
                <Text style={[TYPE.captionSm, { color: t.textTertiary }]}>15 avril 2026</Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontFamily: FONT_UI_EXTRA, fontSize: 15, color: t.primary }}>
                {p.price}
              </Text>
              <Text style={{ fontFamily: FONT_UI_SEMI, fontSize: 11, color: t.textTertiary }}>
                MAD
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  tabs: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1 },
  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  thumb: { width: 60, height: 60, borderRadius: 10 },
});
