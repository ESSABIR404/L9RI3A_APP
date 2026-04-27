import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { Theme, TYPE, FONT_UI_BOLD, FONT_UI_EXTRA } from '../../theme';
import { BackHeader } from '../../components/BackHeader';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { L9_PRODUCTS } from '../../data';
import { App } from '../../nav';

type Props = { t: Theme; app: App; productId: string };

export function AchatScreen({ t, app, productId }: Props) {
  const p = L9_PRODUCTS.find((x) => x.id === productId) || L9_PRODUCTS[0];
  const [offer, setOffer] = useState('');
  const [msg, setMsg] = useState("Bonjour, je suis intéressé(e) par votre article.");

  return (
    <View style={[styles.root, { backgroundColor: t.bg }]}>
      <BackHeader t={t} onBack={app.back} title="Demande d'achat" />
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: t.bgElev, borderColor: t.border }]}>
          <Image source={{ uri: p.image }} style={styles.thumb} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 15, color: t.textPrimary }}>
              {p.title}
            </Text>
            <Text style={[TYPE.caption, { color: t.textSecondary, marginTop: 2 }]}>
              {p.seller.name} · {p.city}
            </Text>
            <Text style={{ fontFamily: FONT_UI_EXTRA, fontSize: 18, color: t.primary, marginTop: 4 }}>
              {p.price} MAD
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 18 }}>
          <Input t={t} label="Message au vendeur" value={msg} onChangeText={setMsg} multiline />
        </View>

        <View style={{ marginTop: 14 }}>
          <Input
            t={t}
            label="Proposer un prix (optionnel)"
            placeholder="Ex. 1100"
            prefix="MAD"
            value={offer}
            onChangeText={setOffer}
            keyboardType="numeric"
          />
          <Text style={[TYPE.captionSm, { color: t.textTertiary, marginTop: 6 }]}>
            Laissez vide pour accepter le prix demandé. Le vendeur peut accepter, refuser ou
            contre-proposer.
          </Text>
        </View>

        <View
          style={[styles.note, { backgroundColor: t.isDark ? t.surfaceAlt : '#F6F8FB' }]}
        >
          <Icon name="shield" size={16} color={t.success} />
          <Text style={[TYPE.caption, { color: t.textSecondary, flex: 1 }]}>
            <Text style={{ fontFamily: FONT_UI_BOLD, color: t.textPrimary }}>
              Transaction sécurisée.{' '}
            </Text>
            Rencontrez le vendeur dans un lieu public et vérifiez l'article avant paiement.
          </Text>
        </View>
      </ScrollView>
      <View style={[styles.footer, { backgroundColor: t.bgElev, borderTopColor: t.divider }]}>
        <Button t={t} variant="primary" size="lg" onPress={app.back}>
          Envoyer la demande
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { padding: 16 },
  card: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  thumb: { width: 72, height: 72, borderRadius: 12 },
  note: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
  },
});
