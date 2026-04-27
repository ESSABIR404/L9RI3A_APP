import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Theme, FONT_UI_SEMI, FONT_UI_BOLD, FONT_UI_EXTRA, TYPE } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MarketHeader } from '../components/MarketHeader';
import { Chip } from '../components/Chip';
import { Icon } from '../components/Icon';
import { ProductCard } from '../components/ProductCard';
import { L9_PRODUCTS, CATEGORIES, CategoryKey, Product } from '../data';
import { App } from '../nav';

type Props = { t: Theme; app: App };

export function MarketScreen({ t, app }: Props) {
  const [tab, setTab] = useState<'tous' | 'pour-vous'>('tous');
  const [cat, setCat] = useState<CategoryKey>('Tout');

  const q = (app.searchQuery || '').trim();

  const filtered: Product[] = useMemo(() => {
    let list = L9_PRODUCTS;
    if (q) {
      const ql = q.toLowerCase();
      list = list.filter((p) =>
        (p.title + ' ' + p.brand + ' ' + p.category).toLowerCase().includes(ql)
      );
    }
    if (cat !== 'Tout') list = list.filter((p) => p.category === cat);
    return list;
  }, [q, cat]);

  const rows: Product[][] = [];
  for (let i = 0; i < filtered.length; i += 2) rows.push(filtered.slice(i, i + 2));

  return (
    <View style={[styles.root, { backgroundColor: t.bg }]}>
      <MarketHeader
        t={t}
        onMenu={() => app.setDrawer(true)}
        onNotif={() => app.push('notifications')}
      />

      {q ? (
        <View
          style={[
            styles.searchBanner,
            { backgroundColor: t.primarySoft, borderBottomColor: t.divider },
          ]}
        >
          <Icon name="search" size={14} color={t.primary} />
          <Text style={{ flex: 1, color: t.textPrimary, fontFamily: FONT_UI_SEMI, fontSize: 13 }}>
            <Text style={{ color: t.textSecondary }}>Recherche : </Text>
            <Text style={{ fontFamily: FONT_UI_EXTRA, color: t.primary }}>"{q}"</Text>
            <Text style={{ color: t.textTertiary }}>
              {' · '}
              {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
            </Text>
          </Text>
          <Pressable
            onPress={() => app.setSearchQuery('')}
            style={[styles.dismissBtn, { backgroundColor: t.bgElev }]}
          >
            <Icon name="close" size={14} color={t.textPrimary} />
          </Pressable>
        </View>
      ) : null}

      <View style={[styles.chipRow, { backgroundColor: t.bgElev, borderBottomColor: t.divider }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipScroll}
        >
          <Chip t={t} active={tab === 'tous'} onPress={() => setTab('tous')}>
            Tous
          </Chip>
          <Chip
            t={t}
            active={tab === 'pour-vous'}
            onPress={() => setTab('pour-vous')}
            icon={
              <Icon
                name="sparkle"
                size={12}
                color={tab === 'pour-vous' ? (t.isDark ? t.bg : '#fff') : t.primary}
              />
            }
          >
            Pour vous
          </Chip>
          <Chip
            t={t}
            onPress={() => app.setSearch(true)}
            icon={<Icon name="search" size={12} color={t.textPrimary} />}
          >
            Chercher
          </Chip>
        </ScrollView>
        <Pressable
          onPress={() => app.setFilters(true)}
          style={[styles.filterButton, { borderColor: t.border, backgroundColor: t.bgElev }]}
        >
          <Icon name="filter" size={16} color={t.textPrimary} />
        </Pressable>
      </View>

      <View style={[styles.catsWrap, { backgroundColor: t.bgElev, borderBottomColor: t.divider }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catsScroll}
        >
          {CATEGORIES.map((c) => {
            const isActive = cat === c.label;
            return (
              <Pressable key={c.label} onPress={() => setCat(c.label)} style={styles.catItem}>
                <View
                  style={[
                    styles.catIcon,
                    { backgroundColor: isActive ? t.primary : t.isDark ? t.surfaceAlt : '#F1F3F7' },
                    isActive && styles.catIconActiveShadow,
                  ]}
                >
                  <Icon
                    name={c.icon as any}
                    size={22}
                    color={isActive ? '#fff' : t.textSecondary}
                  />
                </View>
                <Text
                  style={[
                    styles.catLabel,
                    {
                      color: isActive ? t.textPrimary : t.textSecondary,
                      fontFamily: isActive ? FONT_UI_BOLD : FONT_UI_SEMI,
                    },
                  ]}
                >
                  {c.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.grid}
        contentContainerStyle={styles.gridContent}
        showsVerticalScrollIndicator={false}
      >
        {tab === 'pour-vous' ? (
          <LinearGradient
            colors={[t.primary, t.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.recoBanner}
          >
            <View style={styles.recoIcon}>
              <Icon name="sparkle" size={20} color="#fff" filled />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#fff', fontFamily: FONT_UI_BOLD, fontSize: 14 }}>
                Recommandé pour vous
              </Text>
              <Text
                style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, marginTop: 2 }}
              >
                D'après votre style et vos favoris
              </Text>
            </View>
          </LinearGradient>
        ) : null}
        {rows.map((row, idx) => (
          <View key={idx} style={styles.gridRow}>
            {row.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                t={t}
                saved={app.saved.includes(p.id)}
                onPress={() => app.push('product', { id: p.id })}
                onToggleFav={() => app.toggleSaved(p.id)}
              />
            ))}
            {row.length === 1 ? <View style={{ flex: 1 }} /> : null}
          </View>
        ))}
        {filtered.length === 0 ? (
          <Text style={[styles.empty, { color: t.textTertiary }]}>
            Aucun article {q ? `pour "${q}"` : `dans ${cat}`}. Essayez autre chose.
          </Text>
        ) : null}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  searchBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  dismissBtn: {
    width: 26,
    height: 26,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  chipScroll: {
    paddingLeft: 16,
    paddingRight: 8,
    gap: 8,
  },
  filterButton: {
    width: 40,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    marginLeft: 4,
  },
  catsWrap: { borderBottomWidth: 1 },
  catsScroll: { paddingVertical: 14, paddingHorizontal: 16, gap: 14 },
  catItem: { alignItems: 'center', minWidth: 56 },
  catIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catIconActiveShadow: {
    shadowColor: '#1877F2',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  catLabel: { ...TYPE.captionSm, marginTop: 6 },
  grid: { flex: 1 },
  gridContent: { padding: 12 },
  gridRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  empty: {
    textAlign: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
    ...TYPE.body,
  },
  recoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    marginHorizontal: 4,
    marginBottom: 12,
    borderRadius: 16,
  },
  recoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
