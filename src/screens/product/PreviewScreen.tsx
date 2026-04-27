import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Theme, FONT_UI_BOLD } from '../../theme';
import { Icon } from '../../components/Icon';
import { App } from '../../nav';
import { ProductDetailScreen } from './ProductDetailScreen';

type Props = { t: Theme; app: App; productId: string };

export function PreviewScreen({ t, app, productId }: Props) {
  return (
    <View style={[styles.root, { backgroundColor: t.bg }]}>
      <View style={[styles.banner, { backgroundColor: t.warningSoft }]}>
        <Icon name="eye" size={14} color={t.warning} />
        <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 12, color: t.warning, flex: 1 }}>
          Mode aperçu — voici comment les acheteurs verront votre annonce
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <ProductDetailScreen t={t} app={app} productId={productId} />
      </View>
      <View style={[styles.footer, { backgroundColor: t.bgElev, borderTopColor: t.divider }]}>
        <Pressable style={[styles.btn, { borderColor: t.border }]}>
          <Icon name="copy" size={14} color={t.textPrimary} />
          <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 13, color: t.textPrimary }}>
            Copier lien
          </Text>
        </Pressable>
        <Pressable style={[styles.btn, { borderColor: t.border }]}>
          <Icon name="share" size={14} color={t.textPrimary} />
          <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 13, color: t.textPrimary }}>
            Partager
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  footer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingBottom: 14,
    borderTopWidth: 1,
  },
  btn: {
    flex: 1,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
});
