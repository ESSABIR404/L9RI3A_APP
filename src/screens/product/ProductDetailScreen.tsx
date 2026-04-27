import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, StyleSheet } from 'react-native';
import {
  Theme,
  TYPE,
  FONT_UI_BOLD,
  FONT_UI_EXTRA,
  FONT_UI_SEMI,
} from '../../theme';
import { Icon } from '../../components/Icon';
import { Avatar } from '../../components/Avatar';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { L9_PRODUCTS } from '../../data';
import { App } from '../../nav';

type Props = { t: Theme; app: App; productId: string };

export function ProductDetailScreen({ t, app, productId }: Props) {
  const p = L9_PRODUCTS.find((x) => x.id === productId) || L9_PRODUCTS[0];
  const [imgIdx, setImgIdx] = useState(0);
  const saved = app.saved.includes(p.id);
  const images = [p.image, p.image, p.image];

  return (
    <View style={[styles.root, { backgroundColor: t.bg }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.gallery, { backgroundColor: t.surfaceAlt }]}>
          <Image source={{ uri: images[imgIdx] }} style={{ width: '100%', height: '100%' }} />
          <View style={styles.topControls}>
            <Pressable onPress={app.back} style={styles.glassBtn}>
              <Icon name="back" size={20} color="#0F1523" />
            </Pressable>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Pressable onPress={() => app.toggleSaved(p.id)} style={styles.glassBtn}>
                <Icon name="heart" size={18} color={saved ? t.danger : '#0F1523'} filled={saved} />
              </Pressable>
              <Pressable style={styles.glassBtn}>
                <Icon name="share" size={18} color="#0F1523" />
              </Pressable>
            </View>
          </View>
          <View style={styles.dots}>
            {images.map((_, i) => (
              <Pressable
                key={i}
                onPress={() => setImgIdx(i)}
                style={[
                  styles.dot,
                  {
                    width: i === imgIdx ? 18 : 4,
                    backgroundColor: i === imgIdx ? '#fff' : 'rgba(255,255,255,0.5)',
                  },
                ]}
              />
            ))}
          </View>
          <View style={{ position: 'absolute', bottom: 14, right: 12 }}>
            {p.type === 'echange' ? (
              <Badge t={t} variant="accent">
                Échange
              </Badge>
            ) : (
              <Badge t={t} variant="dark">
                À vendre
              </Badge>
            )}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: t.bgElev, borderBottomColor: t.divider }]}>
          <Text style={[TYPE.eyebrow, { color: t.textTertiary }]}>{p.brand}</Text>
          <Text style={[TYPE.displayMd, { color: t.textPrimary, marginTop: 4 }]}>{p.title}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: 10 }}>
            <Text style={{ fontFamily: FONT_UI_EXTRA, fontSize: 28, color: t.primary }}>
              {p.price}
            </Text>
            <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 14, color: t.textTertiary }}>
              MAD
            </Text>
          </View>
          <View style={[styles.metaRow, { marginTop: 10 }]}>
            <Icon name="pin" size={12} color={t.textTertiary} />
            <Text style={[TYPE.caption, { color: t.textTertiary }]}>
              {p.city}, {p.quartier} · {p.posted}
            </Text>
          </View>
        </View>

        <View style={[styles.sellerRow, { backgroundColor: t.bgElev, borderBottomColor: t.divider }]}>
          <Avatar name={p.seller.name} size={48} t={t} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 15, color: t.textPrimary }}>
              {p.seller.name}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }}>
              <Icon name="star" size={12} color={t.warning} filled />
              <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 12, color: t.textPrimary }}>
                {p.seller.rating}
              </Text>
              <Text style={{ fontSize: 12, color: t.textTertiary }}>
                · {p.seller.reviews} avis
              </Text>
            </View>
          </View>
          <Pressable style={[styles.viewProfile, { backgroundColor: t.primarySoft }]}>
            <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 13, color: t.primary }}>
              Voir profil
            </Text>
          </Pressable>
        </View>

        <View style={[styles.section, { backgroundColor: t.bgElev, borderBottomColor: t.divider }]}>
          <View style={styles.specsGrid}>
            {[
              ['État', p.condition],
              ['Taille', p.size],
              ['Catégorie', p.category],
              ['Ville', p.city],
            ].map(([k, v]) => (
              <View
                key={k}
                style={[
                  styles.specCell,
                  { backgroundColor: t.isDark ? t.surfaceAlt : '#F6F8FB' },
                ]}
              >
                <Text style={{ fontFamily: FONT_UI_SEMI, fontSize: 11, color: t.textTertiary, textTransform: 'uppercase', letterSpacing: 0.4 }}>
                  {k}
                </Text>
                <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 14, color: t.textPrimary, marginTop: 2 }}>
                  {v}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: t.bgElev }]}>
          <Text style={[TYPE.label, { color: t.textPrimary, marginBottom: 8 }]}>Description</Text>
          <Text style={[TYPE.body, { color: t.textSecondary, lineHeight: 22 }]}>
            {p.description}
          </Text>
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      <View style={[styles.actionBar, { backgroundColor: t.bgElev, borderTopColor: t.divider }]}>
        <Pressable
          onPress={() => app.push('conversation', { id: 'c1' })}
          style={[styles.chatBtn, { borderColor: t.border }]}
        >
          <Icon name="chat" size={20} color={t.textPrimary} />
        </Pressable>
        {p.type === 'echange' ? (
          <View style={{ flex: 1 }}>
            <Button
              t={t}
              variant="primary"
              size="md"
              onPress={() => app.push('echange', { id: p.id })}
              icon={<Icon name="swap" size={16} color="#fff" />}
            >
              Proposer un échange
            </Button>
          </View>
        ) : (
          <>
            <Pressable
              onPress={() => app.push('echange', { id: p.id })}
              style={[styles.outlineCta, { borderColor: t.accent }]}
            >
              <Icon name="swap" size={16} color={t.accent} />
              <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 14, color: t.accent }}>
                Échanger
              </Text>
            </Pressable>
            <View style={{ flex: 1 }}>
              <Button
                t={t}
                variant="primary"
                size="md"
                onPress={() => app.push('achat', { id: p.id })}
              >
                Acheter · {p.price} MAD
              </Button>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  gallery: { aspectRatio: 1, position: 'relative' },
  topControls: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  glassBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  dot: { height: 4, borderRadius: 999 },
  section: {
    padding: 16,
    borderBottomWidth: 1,
  },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  viewProfile: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  specCell: {
    width: '48%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  actionBar: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
  },
  chatBtn: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineCta: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
});
