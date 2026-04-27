import React from 'react';
import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import { Theme, FONT_UI_BOLD, FONT_UI_SEMI, FONT_UI_MEDIUM } from '../theme';
import { Icon } from './Icon';
import { Badge } from './Badge';
import { Product } from '../data';

type Props = {
  product: Product;
  t: Theme;
  saved?: boolean;
  onPress?: () => void;
  onToggleFav?: () => void;
};

export function ProductCard({ product, t, saved, onPress, onToggleFav }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.card, { backgroundColor: t.bgElev, borderColor: t.border }]}>
      <View style={[styles.imageWrap, { backgroundColor: t.surfaceAlt }]}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
        <View style={styles.badge}>
          {product.type === 'echange' ? (
            <Badge t={t} variant="accent" size="sm">Échange</Badge>
          ) : (
            <Badge t={t} variant="dark" size="sm">À vendre</Badge>
          )}
        </View>
        <Pressable onPress={onToggleFav} hitSlop={6} style={styles.favButton}>
          <Icon name="heart" size={16} color={saved ? t.danger : '#0F1523'} filled={!!saved} />
        </Pressable>
      </View>

      <View style={styles.body}>
        <Text numberOfLines={2} style={[styles.title, { color: t.textPrimary }]}>
          {product.title}
        </Text>
        <View style={styles.priceRow}>
          <Text style={[styles.price, { color: t.textPrimary }]}>{product.price}</Text>
          <Text style={[styles.currency, { color: t.textTertiary }]}>MAD</Text>
        </View>
        <View style={styles.cityRow}>
          <Icon name="pin" size={10} color={t.textTertiary} />
          <Text style={[styles.city, { color: t.textTertiary }]}>{product.city}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    flex: 1,
  },
  imageWrap: {
    width: '100%',
    aspectRatio: 1 / 1.15,
    position: 'relative',
  },
  image: { width: '100%', height: '100%' },
  badge: { position: 'absolute', top: 8, left: 8 },
  favButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
  },
  title: {
    fontFamily: FONT_UI_BOLD,
    fontSize: 15,
    letterSpacing: -0.3,
    lineHeight: 19,
    minHeight: 38,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 6,
    gap: 4,
  },
  price: {
    fontFamily: FONT_UI_BOLD,
    fontSize: 16,
  },
  currency: {
    fontFamily: FONT_UI_SEMI,
    fontSize: 11,
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 4,
  },
  city: {
    fontFamily: FONT_UI_MEDIUM,
    fontSize: 11,
  },
});
