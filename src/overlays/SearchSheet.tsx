import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { Theme, TYPE, FONT_UI_BOLD, FONT_UI_SEMI } from '../theme';
import { Icon } from '../components/Icon';
import { L9_PRODUCTS } from '../data';
import { App } from '../nav';

type Props = { t: Theme; app: App };

const TRENDING = ['Nike', 'Zara', 'Vintage', 'Sneakers', 'Robes été', 'Sacs cuir'];

export function SearchSheet({ t, app }: Props) {
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState([
    'Jordan 1',
    "Veste Levi's",
    'Sac cuir',
    'Hoodie Champion',
  ]);
  const close = () => app.setSearch(false);
  const filtered = query
    ? L9_PRODUCTS.filter((p) =>
        (p.title + ' ' + p.brand + ' ' + p.category).toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const apply = (q: string) => {
    const clean = q.trim();
    if (!clean) return;
    setRecent((r) => [clean, ...r.filter((x) => x.toLowerCase() !== clean.toLowerCase())].slice(0, 8));
    app.setSearchQuery(clean);
    app.setTab('marche');
    close();
  };

  return (
    <Modal visible={app.search} transparent animationType="slide" onRequestClose={close}>
      <View style={styles.root}>
        <Pressable style={styles.scrim} onPress={close} />
        <View style={[styles.sheet, { backgroundColor: t.bgElev }]}>
          <View style={styles.handleRow}>
            <View style={[styles.handle, { backgroundColor: t.borderStrong }]} />
          </View>
          <View style={[styles.searchRow, { borderBottomColor: t.divider }]}>
            <View
              style={[
                styles.searchField,
                {
                  backgroundColor: t.isDark ? t.surfaceAlt : '#F6F8FB',
                  borderColor: t.primary,
                  shadowColor: t.primary,
                  shadowOpacity: 0.16,
                  shadowRadius: 6,
                },
              ]}
            >
              <Icon name="search" size={16} color={t.textTertiary} />
              <TextInput
                autoFocus
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={() => apply(query)}
                placeholder="Rechercher un article, une marque..."
                placeholderTextColor={t.textTertiary}
                style={{
                  flex: 1,
                  fontFamily: TYPE.body.fontFamily,
                  fontSize: 14,
                  color: t.textPrimary,
                  padding: 0,
                }}
              />
              {query ? (
                <Pressable onPress={() => setQuery('')}>
                  <Icon name="close" size={16} color={t.textTertiary} />
                </Pressable>
              ) : null}
            </View>
            <Pressable onPress={close} hitSlop={6}>
              <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 14, color: t.primary }}>
                Annuler
              </Text>
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 14 }} showsVerticalScrollIndicator={false}>
            {!query ? (
              <>
                <Text
                  style={{
                    fontFamily: FONT_UI_BOLD,
                    fontSize: 12,
                    color: t.textTertiary,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    marginBottom: 10,
                  }}
                >
                  Recherches récentes
                </Text>
                {recent.map((r, i) => (
                  <Pressable
                    key={i}
                    onPress={() => apply(r)}
                    style={[styles.recent, { borderBottomColor: t.divider }]}
                  >
                    <Icon name="history" size={16} color={t.textTertiary} />
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: TYPE.body.fontFamily,
                        fontSize: 14,
                        color: t.textPrimary,
                      }}
                    >
                      {r}
                    </Text>
                    <Pressable
                      onPress={() => setRecent(recent.filter((_, j) => j !== i))}
                      hitSlop={6}
                    >
                      <Icon name="close" size={14} color={t.textTertiary} />
                    </Pressable>
                  </Pressable>
                ))}

                <Text
                  style={{
                    fontFamily: FONT_UI_BOLD,
                    fontSize: 12,
                    color: t.textTertiary,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    marginTop: 20,
                    marginBottom: 10,
                  }}
                >
                  Tendances
                </Text>
                <View style={styles.trendingRow}>
                  {TRENDING.map((s, i) => (
                    <Pressable
                      key={i}
                      onPress={() => apply(s)}
                      style={[
                        styles.trendingChip,
                        {
                          backgroundColor: t.isDark ? t.surfaceAlt : '#F6F8FB',
                          borderColor: t.border,
                        },
                      ]}
                    >
                      <Icon name="sparkle" size={12} color={t.primary} />
                      <Text style={{ fontFamily: FONT_UI_SEMI, fontSize: 13, color: t.textPrimary }}>
                        {s}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </>
            ) : (
              <>
                <Text style={{ ...TYPE.caption, color: t.textTertiary, marginBottom: 10 }}>
                  {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
                </Text>
                {filtered.length === 0 ? (
                  <Text
                    style={{
                      textAlign: 'center',
                      paddingVertical: 40,
                      color: t.textTertiary,
                      fontSize: 13,
                      fontFamily: TYPE.body.fontFamily,
                    }}
                  >
                    Aucun article trouvé pour "{query}"
                  </Text>
                ) : (
                  <View style={{ gap: 8 }}>
                    {filtered.map((p) => (
                      <Pressable
                        key={p.id}
                        onPress={() => {
                          close();
                          app.push('product', { id: p.id });
                        }}
                        style={[
                          styles.result,
                          { backgroundColor: t.bgElev, borderColor: t.border },
                        ]}
                      >
                        <Image source={{ uri: p.image }} style={styles.resultImg} />
                        <View style={{ flex: 1, minWidth: 0 }}>
                          <Text
                            style={{
                              fontFamily: FONT_UI_BOLD,
                              fontSize: 11,
                              color: t.textTertiary,
                              textTransform: 'uppercase',
                            }}
                          >
                            {p.brand}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontFamily: FONT_UI_BOLD,
                              fontSize: 14,
                              color: t.textPrimary,
                            }}
                          >
                            {p.title}
                          </Text>
                          <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 13, color: t.primary, marginTop: 2 }}>
                            {p.price} MAD
                          </Text>
                        </View>
                      </Pressable>
                    ))}
                  </View>
                )}
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  scrim: { ...StyleSheet.absoluteFillObject },
  sheet: {
    height: '92%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  handleRow: { alignItems: 'center', paddingTop: 10, paddingBottom: 6 },
  handle: { width: 38, height: 4, borderRadius: 999 },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  searchField: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1.5,
  },
  recent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  trendingRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  trendingChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
  },
  result: {
    flexDirection: 'row',
    gap: 12,
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  resultImg: { width: 60, height: 60, borderRadius: 10 },
});
