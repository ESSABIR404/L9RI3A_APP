import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Theme, TYPE, FONT_UI_BOLD } from '../../theme';
import { BackHeader } from '../../components/BackHeader';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { FieldSelect } from '../../components/FieldSelect';
import { L9_PRODUCTS } from '../../data';
import { App } from '../../nav';

type Props = { t: Theme; app: App; productId: string };

export function EchangeScreen({ t, app, productId }: Props) {
  const p = L9_PRODUCTS.find((x) => x.id === productId) || L9_PRODUCTS[0];
  const [cat, setCat] = useState('Chaussures');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [cond, setCond] = useState('Très bon état');
  const [size, setSize] = useState('42');
  const [diff, setDiff] = useState('je-paye');
  const [amount, setAmount] = useState('150');
  const [msg, setMsg] = useState('');

  return (
    <View style={[styles.root, { backgroundColor: t.bg }]}>
      <BackHeader
        t={t}
        onBack={app.back}
        title="Proposition d'échange"
        subtitle={p.title}
      />
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <Text style={[TYPE.label, { color: t.textPrimary, marginBottom: 10 }]}>
          Votre article à proposer
        </Text>

        <Pressable
          style={[
            styles.upload,
            {
              borderColor: t.border,
              backgroundColor: t.isDark ? t.surfaceAlt : '#F6F8FB',
            },
          ]}
        >
          <View style={[styles.uploadIcon, { backgroundColor: t.primarySoft }]}>
            <Icon name="camera" size={22} color={t.primary} />
          </View>
          <Text style={[TYPE.label, { color: t.textPrimary }]}>Ajouter des photos</Text>
          <Text style={[TYPE.captionSm, { color: t.textTertiary }]}>
            Jusqu'à 6 photos · 5 MB max
          </Text>
        </Pressable>

        <View style={{ gap: 14, marginTop: 14 }}>
          <FieldSelect
            t={t}
            label="Catégorie"
            value={cat}
            onChange={setCat}
            options={['Vestes', 'Chaussures', 'Sacs', 'T-shirts', 'Pantalons', 'Accessoires']}
          />
          <Input
            t={t}
            label="Titre du produit"
            value={title}
            onChangeText={setTitle}
            placeholder="Ex. Nike Air Max 90"
          />
          <Input
            t={t}
            label="Description"
            value={desc}
            onChangeText={setDesc}
            placeholder="Décrivez votre article..."
            multiline
          />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ flex: 1 }}>
              <FieldSelect
                t={t}
                label="État"
                value={cond}
                onChange={setCond}
                options={['Neuf', 'Comme neuf', 'Très bon état', 'Bon état', 'Correct']}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Input
                t={t}
                label="Taille"
                value={size}
                onChangeText={setSize}
                placeholder="M, 42..."
              />
            </View>
          </View>
        </View>

        <View
          style={[styles.diffCard, { backgroundColor: t.bgElev, borderColor: t.border }]}
        >
          <Text style={[TYPE.label, { color: t.textPrimary }]}>Différence de prix</Text>
          <Text style={[TYPE.caption, { color: t.textSecondary, marginTop: 3, marginBottom: 12 }]}>
            Si les articles n'ont pas la même valeur, qui compense ?
          </Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {[
              ['je-paye', "J'ajoute"],
              ['il-paye', 'Il ajoute'],
              ['egal', 'Équivalent'],
            ].map(([v, l]) => (
              <Pressable
                key={v}
                onPress={() => setDiff(v)}
                style={[
                  styles.diffBtn,
                  {
                    backgroundColor:
                      diff === v ? t.primary : t.isDark ? t.surfaceAlt : '#F6F8FB',
                    borderColor: diff === v ? t.primary : 'transparent',
                  },
                ]}
              >
                <Text
                  style={{
                    fontFamily: FONT_UI_BOLD,
                    fontSize: 12,
                    color: diff === v ? '#fff' : t.textPrimary,
                  }}
                >
                  {l}
                </Text>
              </Pressable>
            ))}
          </View>
          {diff !== 'egal' ? (
            <View style={{ marginTop: 12 }}>
              <Input
                t={t}
                value={amount}
                onChangeText={setAmount}
                prefix="MAD"
                keyboardType="numeric"
                placeholder="Montant"
              />
            </View>
          ) : null}
        </View>

        <View style={{ marginTop: 14 }}>
          <Input
            t={t}
            label="Message (optionnel)"
            value={msg}
            onChangeText={setMsg}
            placeholder="Ajoutez un mot au vendeur..."
            multiline
          />
        </View>
      </ScrollView>
      <View style={[styles.footer, { backgroundColor: t.bgElev, borderTopColor: t.divider }]}>
        <Button t={t} variant="primary" size="lg" onPress={app.back}>
          Envoyer l'offre d'échange
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { padding: 16 },
  upload: {
    height: 150,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  uploadIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diffCard: {
    marginTop: 18,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  diffBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
  },
});
