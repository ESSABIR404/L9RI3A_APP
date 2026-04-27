import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Theme, TYPE, FONT_UI_BOLD } from '../theme';
import { Icon } from '../components/Icon';
import { Chip } from '../components/Chip';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { App } from '../nav';

type Props = { t: Theme; app: App };

export function FiltersSheet({ t, app }: Props) {
  const [cat, setCat] = useState('Toutes');
  const [type, setType] = useState('tous');
  const [cond, setCond] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [city, setCity] = useState('Toutes');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [sort, setSort] = useState('recent');

  const close = () => app.setFilters(false);
  const reset = () => {
    setCat('Toutes');
    setType('tous');
    setCond([]);
    setSizes([]);
    setCity('Toutes');
    setPriceMin('');
    setPriceMax('');
    setSort('recent');
  };
  const toggle = (arr: string[], setArr: (a: string[]) => void, v: string) =>
    setArr(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  return (
    <Modal visible={app.filters} transparent animationType="slide" onRequestClose={close}>
      <View style={styles.root}>
        <Pressable style={styles.scrim} onPress={close} />
        <View style={[styles.sheet, { backgroundColor: t.bgElev }]}>
          <View style={styles.handleRow}>
            <View style={[styles.handle, { backgroundColor: t.borderStrong }]} />
          </View>
          <View style={[styles.head, { borderBottomColor: t.divider }]}>
            <Pressable onPress={reset} hitSlop={8}>
              <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 13, color: t.textSecondary }}>
                Réinitialiser
              </Text>
            </Pressable>
            <Text style={[TYPE.h2, { color: t.textPrimary, flex: 1, textAlign: 'center' }]}>
              Filtres
            </Text>
            <Pressable
              onPress={close}
              style={[styles.closeBtn, { borderColor: t.border }]}
            >
              <Icon name="close" size={16} color={t.textPrimary} />
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }} showsVerticalScrollIndicator={false}>
            <Group t={t} title="Type">
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {[
                  ['tous', 'Tous'],
                  ['vente', 'À vendre'],
                  ['echange', 'Échange'],
                ].map(([v, l]) => (
                  <Pressable
                    key={v}
                    onPress={() => setType(v)}
                    style={[
                      styles.typeBtn,
                      {
                        backgroundColor:
                          type === v ? t.primary : t.isDark ? t.surfaceAlt : '#F6F8FB',
                        borderColor: type === v ? t.primary : 'transparent',
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontFamily: FONT_UI_BOLD,
                        fontSize: 13,
                        color: type === v ? '#fff' : t.textPrimary,
                      }}
                    >
                      {l}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </Group>

            <Group t={t} title="Catégorie">
              <View style={styles.chipRow}>
                {['Toutes', 'Vestes', 'Chaussures', 'Sacs', 'Robes', 'T-shirts', 'Pantalons', 'Pulls', 'Accessoires'].map(
                  (c) => (
                    <Chip key={c} t={t} active={cat === c} onPress={() => setCat(c)}>
                      {c}
                    </Chip>
                  )
                )}
              </View>
            </Group>

            <Group t={t} title="Prix (MAD)">
              <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <Input
                    t={t}
                    value={priceMin}
                    onChangeText={setPriceMin}
                    placeholder="Min"
                    keyboardType="numeric"
                  />
                </View>
                <Text style={{ color: t.textTertiary, fontFamily: TYPE.body.fontFamily }}>—</Text>
                <View style={{ flex: 1 }}>
                  <Input
                    t={t}
                    value={priceMax}
                    onChangeText={setPriceMax}
                    placeholder="Max"
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View style={[styles.chipRow, { marginTop: 10 }]}>
                {[
                  [0, 300],
                  [300, 600],
                  [600, 1000],
                  [1000, 2000],
                ].map(([a, b]) => (
                  <Pressable
                    key={a}
                    onPress={() => {
                      setPriceMin(String(a));
                      setPriceMax(String(b));
                    }}
                    style={[
                      styles.preset,
                      {
                        backgroundColor: t.isDark ? t.surfaceAlt : '#F6F8FB',
                        borderColor: t.border,
                      },
                    ]}
                  >
                    <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 11, color: t.textPrimary }}>
                      {a}—{b}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </Group>

            <Group t={t} title="État">
              <View style={styles.chipRow}>
                {['Neuf', 'Comme neuf', 'Très bon état', 'Bon état', 'Correct'].map((c) => (
                  <Chip
                    key={c}
                    t={t}
                    active={cond.includes(c)}
                    onPress={() => toggle(cond, setCond, c)}
                  >
                    {c}
                  </Chip>
                ))}
              </View>
            </Group>

            <Group t={t} title="Taille">
              <View style={styles.chipRow}>
                {['XS', 'S', 'M', 'L', 'XL', '38', '40', '42', '44', 'Unique'].map((s) => (
                  <Pressable
                    key={s}
                    onPress={() => toggle(sizes, setSizes, s)}
                    style={[
                      styles.sizeBtn,
                      {
                        backgroundColor:
                          sizes.includes(s) ? t.primary : t.isDark ? t.surfaceAlt : '#fff',
                        borderColor: sizes.includes(s) ? t.primary : t.border,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontFamily: FONT_UI_BOLD,
                        fontSize: 13,
                        color: sizes.includes(s) ? '#fff' : t.textPrimary,
                      }}
                    >
                      {s}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </Group>

            <Group t={t} title="Ville">
              <View style={styles.chipRow}>
                {['Toutes', 'Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Fès', 'Agadir'].map((c) => (
                  <Chip
                    key={c}
                    t={t}
                    active={city === c}
                    onPress={() => setCity(c)}
                    icon={c !== 'Toutes' ? <Icon name="pin" size={11} color={city === c ? (t.isDark ? t.bg : '#fff') : t.textTertiary} /> : null}
                  >
                    {c}
                  </Chip>
                ))}
              </View>
            </Group>

            <Group t={t} title="Trier par">
              <View style={{ gap: 6 }}>
                {[
                  ['recent', 'Plus récents'],
                  ['prix-asc', 'Prix croissant'],
                  ['prix-desc', 'Prix décroissant'],
                  ['popular', 'Populaires'],
                  ['proche', 'Plus proches'],
                ].map(([v, l]) => (
                  <Pressable
                    key={v}
                    onPress={() => setSort(v)}
                    style={[
                      styles.sortRow,
                      {
                        backgroundColor: sort === v ? t.primarySoft : 'transparent',
                        borderColor: sort === v ? t.primary : t.border,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.radio,
                        {
                          borderColor: sort === v ? t.primary : t.borderStrong,
                          backgroundColor: sort === v ? t.primary : 'transparent',
                        },
                      ]}
                    >
                      {sort === v ? (
                        <View style={{ width: 6, height: 6, borderRadius: 999, backgroundColor: '#fff' }} />
                      ) : null}
                    </View>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: FONT_UI_BOLD,
                        fontSize: 14,
                        color: sort === v ? t.primary : t.textPrimary,
                      }}
                    >
                      {l}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </Group>
          </ScrollView>

          <View
            style={[
              styles.footer,
              { backgroundColor: t.bgElev, borderTopColor: t.divider },
            ]}
          >
            <Button t={t} variant="primary" size="lg" onPress={close}>
              Afficher les résultats
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function Group({ t, title, children }: { t: Theme; title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 22 }}>
      <Text
        style={{
          fontFamily: FONT_UI_BOLD,
          fontSize: 13,
          color: t.textPrimary,
          marginBottom: 10,
          letterSpacing: -0.1,
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  scrim: { ...StyleSheet.absoluteFillObject },
  sheet: {
    maxHeight: '88%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  handleRow: { alignItems: 'center', paddingTop: 10 },
  handle: { width: 38, height: 4, borderRadius: 999 },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  preset: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  sizeBtn: {
    minWidth: 48,
    height: 38,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 999,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
  },
});
