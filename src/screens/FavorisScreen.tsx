import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Theme, TYPE } from '../theme';
import { MarketHeader } from '../components/MarketHeader';
import { Icon } from '../components/Icon';
import { ProductCard } from '../components/ProductCard';
import { EmptyState } from '../components/EmptyState';
import { L9_PRODUCTS, Product } from '../data';
import { App } from '../nav';

type Props = { t: Theme; app: App };

export function FavorisScreen({ t, app }: Props) {
  const saved: Product[] = L9_PRODUCTS.filter((p) => app.saved.includes(p.id));
  const rows: Product[][] = [];
  for (let i = 0; i < saved.length; i += 2) rows.push(saved.slice(i, i + 2));

  return (
    <View style={[styles.root, { backgroundColor: t.bg }]}>
      <MarketHeader
        t={t}
        onMenu={() => app.setDrawer(true)}
        onNotif={() => app.push('notifications')}
      />
      <View style={[styles.head, { backgroundColor: t.bgElev, borderBottomColor: t.divider }]}>
        <Text style={[TYPE.displayMd, { color: t.textPrimary }]}>Favoris</Text>
        <Text style={[TYPE.bodySm, { color: t.textSecondary, marginTop: 4, marginBottom: 14 }]}>
          {saved.length} articles sauvegardés
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Pressable
            onPress={() => app.setSearch(true)}
            style={[
              styles.searchBar,
              { backgroundColor: t.isDark ? t.surfaceAlt : '#F6F8FB', borderColor: t.border },
            ]}
          >
            <Icon name="search" size={16} color={t.textTertiary} />
            <Text style={[TYPE.body, { color: t.textTertiary, flex: 1 }]}>
              Rechercher dans mes favoris
            </Text>
          </Pressable>
          <Pressable
            onPress={() => app.setFilters(true)}
            style={[styles.filterBtn, { borderColor: t.border, backgroundColor: t.bgElev }]}
          >
            <Icon name="filter" size={16} color={t.textPrimary} />
          </Pressable>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ padding: 12 }} showsVerticalScrollIndicator={false}>
        {saved.length === 0 ? (
          <EmptyState
            t={t}
            icon="heart"
            title="Aucun favori pour l'instant"
            subtitle="Sauvegardez des articles en appuyant sur le cœur. Ils apparaîtront ici."
            action="Parcourir le marché"
            onAction={() => app.setTab('marche')}
          />
        ) : (
          rows.map((row, i) => (
            <View key={i} style={styles.row}>
              {row.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  t={t}
                  saved
                  onPress={() => app.push('product', { id: p.id })}
                  onToggleFav={() => app.toggleSaved(p.id)}
                />
              ))}
              {row.length === 1 ? <View style={{ flex: 1 }} /> : null}
            </View>
          ))
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  head: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  searchBar: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
  },
  filterBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: { flexDirection: 'row', gap: 10, marginBottom: 10 },
});
