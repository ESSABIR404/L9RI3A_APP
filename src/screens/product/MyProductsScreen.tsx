import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, StyleSheet } from 'react-native';
import { Theme, TYPE, FONT_UI_BOLD, FONT_UI_EXTRA } from '../../theme';
import { BackHeader } from '../../components/BackHeader';
import { Chip } from '../../components/Chip';
import { Icon } from '../../components/Icon';
import { L9_PRODUCTS, Product } from '../../data';
import { App } from '../../nav';

type Tab = 'actifs' | 'inactifs' | 'vendus' | 'echanges';

type Props = { t: Theme; app: App };

export function MyProductsScreen({ t, app }: Props) {
  const [tab, setTab] = useState<Tab>('actifs');
  const buckets: Record<Tab, Product[]> = {
    actifs: L9_PRODUCTS.slice(0, 4),
    inactifs: [L9_PRODUCTS[4]],
    vendus: [L9_PRODUCTS[6], L9_PRODUCTS[7]],
    echanges: [L9_PRODUCTS[2]],
  };
  const list = buckets[tab];

  return (
    <View style={[styles.root, { backgroundColor: t.bg }]}>
      <BackHeader
        t={t}
        onBack={app.back}
        title="Mes produits"
        right={
          <Pressable
            onPress={() => app.push('add-product')}
            style={[styles.addBtn, { backgroundColor: t.primary }]}
          >
            <Icon name="plus" size={20} color="#fff" />
          </Pressable>
        }
      />
      <View
        style={[styles.tabs, { backgroundColor: t.bgElev, borderBottomColor: t.divider }]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {[
            ['actifs', 'Actifs', 4],
            ['inactifs', 'Inactifs', 1],
            ['vendus', 'Vendus', 2],
            ['echanges', 'Échangés', 1],
          ].map(([v, l, n]) => (
            <Chip
              key={v as string}
              t={t}
              active={tab === (v as Tab)}
              onPress={() => setTab(v as Tab)}
            >
              {l} · {n}
            </Chip>
          ))}
        </ScrollView>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 10 }} showsVerticalScrollIndicator={false}>
        {list.map((p) => (
          <View
            key={p.id}
            style={[styles.row, { backgroundColor: t.bgElev, borderColor: t.border }]}
          >
            <Image source={{ uri: p.image }} style={styles.thumb} />
            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} style={{ fontFamily: FONT_UI_BOLD, fontSize: 14, color: t.textPrimary }}>
                {p.title}
              </Text>
              <Text style={{ fontFamily: FONT_UI_EXTRA, fontSize: 16, color: t.primary, marginTop: 2 }}>
                {p.price} MAD
              </Text>
              <View style={{ flexDirection: 'row', gap: 10, marginTop: 4 }}>
                {[
                  ['eye', 142],
                  ['heart', 12],
                  ['chat', 4],
                ].map(([icon, n]) => (
                  <View key={icon as string} style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                    <Icon name={icon as any} size={10} color={t.textTertiary} />
                    <Text style={[TYPE.captionSm, { color: t.textTertiary }]}>{n}</Text>
                  </View>
                ))}
              </View>
            </View>
            <Pressable style={[styles.moreBtn, { borderColor: t.border }]}>
              <Icon name="moreV" size={16} color={t.textPrimary} />
            </Pressable>
          </View>
        ))}
        {tab === 'actifs' ? (
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            <Pressable
              onPress={() => app.push('add-product')}
              style={[styles.actionPrimary, { backgroundColor: t.primary }]}
            >
              <Icon name="plus" size={16} color="#fff" />
              <Text style={{ color: '#fff', fontFamily: FONT_UI_BOLD, fontSize: 13 }}>
                Ajouter
              </Text>
            </Pressable>
            <Pressable
              onPress={() => app.push('edit-product')}
              style={[styles.actionSecondary, { borderColor: t.border }]}
            >
              <Icon name="edit" size={16} color={t.textPrimary} />
              <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 13, color: t.textPrimary }}>
                Modifier
              </Text>
            </Pressable>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
  },
  thumb: { width: 72, height: 72, borderRadius: 10 },
  moreBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
  },
  actionSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
});
