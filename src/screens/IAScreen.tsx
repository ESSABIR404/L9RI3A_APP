import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme, TYPE, FONT_UI_BOLD, FONT_UI_SEMI, FONT_UI_EXTRA, FONT_UI_MEDIUM } from '../theme';
import { Icon } from '../components/Icon';
import { L9_PRODUCTS } from '../data';
import { App } from '../nav';

type Outfit = {
  title: string;
  summary: string;
  total: number;
  products: string[];
};

type Msg =
  | { role: 'ai'; kind: 'greeting' }
  | { role: 'me'; text: string }
  | { role: 'ai'; kind: 'loading' }
  | { role: 'ai'; kind: 'reco'; intro: string; outfits: Outfit[] };

type Props = { t: Theme; app: App };

const SUGGESTIONS = [
  'Tenue sportswear 1000-1500 MAD',
  'Look soirée élégant',
  'Veste + pantalon hiver',
  'Sneakers Nike ou Jordan',
];

export function IAScreen({ t, app }: Props) {
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([{ role: 'ai', kind: 'greeting' }]);
  const [loading, setLoading] = useState(false);
  const ref = useRef<ScrollView>(null);

  const send = (text?: string) => {
    const q = (text ?? input).trim();
    if (!q) return;
    setMsgs((m) => [...m, { role: 'me', text: q }, { role: 'ai', kind: 'loading' }]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      setMsgs((m) => {
        const next = m.filter((x) => !(x.role === 'ai' && (x as any).kind === 'loading'));
        return [
          ...next,
          {
            role: 'ai',
            kind: 'reco',
            intro: "J'ai trouvé 3 combinaisons qui correspondent à votre demande :",
            outfits: [
              {
                title: 'Look sportswear Jordan',
                summary: 'Hoodie, chino, Jordan 1',
                total: 1420,
                products: ['p2', 'p4', 'p6'],
              },
              {
                title: 'Combo street casual',
                summary: 'T-shirt Stüssy, chino, AF1',
                total: 1250,
                products: ['p7', 'p6', 'p10'],
              },
              {
                title: 'Alternative urbaine',
                summary: 'Hoodie Champion, AF1, casquette',
                total: 1210,
                products: ['p4', 'p10', 'p11'],
              },
            ],
          },
        ];
      });
      setLoading(false);
    }, 1400);
  };

  useEffect(() => {
    ref.current?.scrollToEnd({ animated: true });
  }, [msgs]);

  return (
    <View style={[styles.root, { backgroundColor: t.bg }]}>
      <View style={[styles.header, { borderBottomColor: t.divider }]}>
        <LinearGradient
          colors={[t.bgElev, t.bgElev, t.primarySoft]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
        <LinearGradient
          colors={[t.primary, t.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.botIcon}
        >
          <Icon name="sparkle" size={22} color="#fff" filled />
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <Text style={[TYPE.h2, { color: t.textPrimary }]}>Assistant L9RI3A</Text>
          <Text style={[TYPE.caption, { color: t.textSecondary }]}>
            Trouve la tenue parfaite dans le marketplace
          </Text>
        </View>
        <View style={[styles.online, { backgroundColor: t.successSoft }]}>
          <View style={[styles.dot, { backgroundColor: t.success }]} />
          <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 11, color: t.success }}>
            En ligne
          </Text>
        </View>
      </View>

      <ScrollView ref={ref} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {msgs.map((m, i) => {
          if (m.role === 'ai' && m.kind === 'greeting') {
            return (
              <View key={i} style={{ alignSelf: 'flex-start', maxWidth: '92%' }}>
                <View
                  style={[
                    styles.bubble,
                    {
                      backgroundColor: t.bgElev,
                      borderColor: t.border,
                      borderBottomLeftRadius: 6,
                    },
                  ]}
                >
                  <Text style={[TYPE.body, { color: t.textPrimary }]}>
                    Salam 👋 Dites-moi ce que vous cherchez et je vous propose des combinaisons à
                    partir des articles disponibles.
                  </Text>
                  <View style={[styles.example, { backgroundColor: t.primarySoft }]}>
                    <Text
                      style={{
                        fontFamily: FONT_UI_MEDIUM,
                        fontSize: 12,
                        color: t.primary,
                      }}
                    >
                      <Text style={{ fontFamily: FONT_UI_BOLD }}>Exemple : </Text>
                      "Je veux une tenue avec veste, pantalon et chaussures Nike entre 1000 et
                      1500 dirhams"
                    </Text>
                  </View>
                </View>
              </View>
            );
          }
          if (m.role === 'me') {
            return (
              <View key={i} style={{ alignSelf: 'flex-end', maxWidth: '85%' }}>
                <View
                  style={[
                    styles.bubble,
                    { backgroundColor: t.primary, borderBottomRightRadius: 6 },
                  ]}
                >
                  <Text style={{ color: '#fff', fontSize: 14, fontFamily: TYPE.body.fontFamily }}>
                    {m.text}
                  </Text>
                </View>
              </View>
            );
          }
          if (m.kind === 'loading') {
            return (
              <View key={i} style={{ alignSelf: 'flex-start' }}>
                <View
                  style={[
                    styles.bubble,
                    {
                      backgroundColor: t.bgElev,
                      borderColor: t.border,
                      borderBottomLeftRadius: 6,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    },
                  ]}
                >
                  <Icon name="sparkle" size={14} color={t.primary} />
                  <Text style={[TYPE.bodySm, { color: t.textSecondary }]}>Recherche en cours…</Text>
                </View>
              </View>
            );
          }
          if (m.kind === 'reco') {
            return (
              <View key={i} style={{ gap: 10 }}>
                <View style={{ alignSelf: 'flex-start', maxWidth: '92%' }}>
                  <View
                    style={[
                      styles.bubble,
                      {
                        backgroundColor: t.bgElev,
                        borderColor: t.border,
                        borderBottomLeftRadius: 6,
                      },
                    ]}
                  >
                    <Text style={[TYPE.body, { color: t.textPrimary }]}>{m.intro}</Text>
                  </View>
                </View>
                {m.outfits.map((o, k) => (
                  <OutfitCard key={k} outfit={o} t={t} app={app} />
                ))}
              </View>
            );
          }
          return null;
        })}
      </ScrollView>

      {msgs.length === 1 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.suggestRow}
        >
          {SUGGESTIONS.map((s, i) => (
            <Pressable
              key={i}
              onPress={() => send(s)}
              style={[
                styles.suggest,
                { backgroundColor: t.bgElev, borderColor: t.border },
              ]}
            >
              <Text style={{ fontFamily: FONT_UI_SEMI, fontSize: 12, color: t.textPrimary }}>
                {s}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      ) : null}

      <View style={[styles.inputRow, { backgroundColor: t.bgElev, borderTopColor: t.divider }]}>
        <View
          style={[
            styles.inputWrap,
            { backgroundColor: t.isDark ? t.surfaceAlt : '#F6F8FB', borderColor: t.border },
          ]}
        >
          <TextInput
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => send()}
            placeholder="Décrivez la tenue recherchée..."
            placeholderTextColor={t.textTertiary}
            style={{
              flex: 1,
              fontFamily: TYPE.body.fontFamily,
              fontSize: 14,
              color: t.textPrimary,
              padding: 0,
            }}
          />
          <Icon name="mic" size={16} color={t.textTertiary} />
        </View>
        <Pressable
          onPress={() => send()}
          disabled={loading}
          style={{ opacity: loading ? 0.6 : 1 }}
        >
          <LinearGradient
            colors={[t.primary, t.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sendBtn}
          >
            <Icon name="send" size={18} color="#fff" />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

function OutfitCard({ outfit, t, app }: { outfit: Outfit; t: Theme; app: App }) {
  const prods = outfit.products
    .map((id) => L9_PRODUCTS.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <View
      style={[
        styles.outfit,
        { backgroundColor: t.bgElev, borderColor: t.border },
      ]}
    >
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View style={[styles.outfitIcon, { backgroundColor: t.primarySoft }]}>
          <Icon name="sparkle" size={16} color={t.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[TYPE.h3, { color: t.textPrimary }]}>{outfit.title}</Text>
          <Text style={[TYPE.caption, { color: t.textSecondary, marginTop: 2 }]}>
            {outfit.summary}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text
            style={{
              fontFamily: FONT_UI_BOLD,
              fontSize: 11,
              color: t.textTertiary,
              textTransform: 'uppercase',
            }}
          >
            Total
          </Text>
          <Text style={{ fontFamily: FONT_UI_EXTRA, fontSize: 18, color: t.primary }}>
            {outfit.total}
            <Text style={{ fontSize: 11, color: t.textTertiary }}> MAD</Text>
          </Text>
        </View>
      </View>
      <View style={styles.outfitGrid}>
        {prods.map((p) => (
          <Pressable
            key={p.id}
            onPress={() => app.push('product', { id: p.id })}
            style={{ flex: 1 }}
          >
            <View
              style={{
                aspectRatio: 1 / 1.1,
                borderRadius: 10,
                overflow: 'hidden',
                backgroundColor: t.surfaceAlt,
              }}
            >
              <Image source={{ uri: p.image }} style={{ width: '100%', height: '100%' }} />
            </View>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: FONT_UI_SEMI,
                fontSize: 11,
                color: t.textPrimary,
                marginTop: 4,
              }}
            >
              {p.title}
            </Text>
            <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 11, color: t.primary }}>
              {p.price} MAD
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={{ flexDirection: 'row', gap: 6 }}>
        <Pressable
          style={[styles.outfitCta, { backgroundColor: t.primary }]}
        >
          <Text style={{ color: '#fff', fontFamily: FONT_UI_BOLD, fontSize: 12 }}>
            Voir les produits
          </Text>
        </Pressable>
        <Pressable style={[styles.outfitIconBtn, { borderColor: t.border }]}>
          <Icon name="heart" size={14} color={t.textPrimary} />
        </Pressable>
        <Pressable style={[styles.outfitIconBtn, { borderColor: t.border }]}>
          <Icon name="chat" size={14} color={t.textPrimary} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  botIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  online: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  dot: { width: 6, height: 6, borderRadius: 999 },
  list: { padding: 14, gap: 14 },
  bubble: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
  },
  example: { marginTop: 10, padding: 10, borderRadius: 12 },
  suggestRow: { paddingHorizontal: 14, paddingBottom: 10, gap: 8 },
  suggest: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    marginRight: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    paddingBottom: 14,
    borderTopWidth: 1,
  },
  inputWrap: {
    flex: 1,
    minHeight: 44,
    borderRadius: 22,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    gap: 8,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outfit: {
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    gap: 12,
  },
  outfitIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outfitGrid: { flexDirection: 'row', gap: 8 },
  outfitCta: {
    flex: 1,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outfitIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});
