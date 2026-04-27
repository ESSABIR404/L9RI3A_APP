import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, StyleSheet } from 'react-native';
import { Theme, TYPE, FONT_UI_BOLD } from '../../theme';
import { BackHeader } from '../../components/BackHeader';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { FieldSelect } from '../../components/FieldSelect';
import { L9_PRODUCTS } from '../../data';
import { App } from '../../nav';

type Props = { t: Theme; app: App; editing?: boolean };

export function AddProductScreen({ t, app, editing }: Props) {
  const [title, setTitle] = useState(editing ? 'Veste en jean oversize' : '');
  const [desc, setDesc] = useState(
    editing ? 'Veste portée quelques fois, très bon état.' : ''
  );
  const [cat, setCat] = useState('Vestes');
  const [cond, setCond] = useState('Très bon état');
  const [size, setSize] = useState('M');
  const [price, setPrice] = useState(editing ? '450' : '');
  const [city, setCity] = useState('Casablanca');
  const [quartier, setQuartier] = useState('Maarif');
  const [type, setType] = useState('vente');
  const [echangePref, setEchangePref] = useState('');

  return (
    <View style={[styles.root, { backgroundColor: t.bg }]}>
      <BackHeader t={t} onBack={app.back} title={editing ? 'Modifier le produit' : 'Nouveau produit'} />
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <Text style={[TYPE.label, { color: t.textPrimary, marginBottom: 10 }]}>Photos</Text>
        <View style={styles.photosGrid}>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            if (editing && i < 3) {
              return (
                <View
                  key={i}
                  style={[styles.photoFilled, { backgroundColor: t.surfaceAlt }]}
                >
                  <Image
                    source={{ uri: L9_PRODUCTS[0].image }}
                    style={{ width: '100%', height: '100%' }}
                  />
                  {i === 0 ? (
                    <View style={[styles.principal, { backgroundColor: t.primary }]}>
                      <Text style={{ color: '#fff', fontFamily: FONT_UI_BOLD, fontSize: 9 }}>
                        PRINCIPAL
                      </Text>
                    </View>
                  ) : null}
                  <View style={styles.photoClose}>
                    <Icon name="close" size={12} color="#fff" />
                  </View>
                </View>
              );
            }
            return (
              <View
                key={i}
                style={[
                  styles.photoEmpty,
                  {
                    borderColor: t.border,
                    backgroundColor: t.isDark ? t.surfaceAlt : '#F6F8FB',
                  },
                ]}
              >
                <Icon name="plus" size={20} color={t.textTertiary} />
                <Text style={{ fontSize: 11, color: t.textTertiary }}>Photo</Text>
              </View>
            );
          })}
        </View>

        <View style={{ gap: 14, marginTop: 18 }}>
          <Input t={t} label="Titre" value={title} onChangeText={setTitle} placeholder="Ex. Veste en jean oversize" />
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
                label="Catégorie"
                value={cat}
                onChange={setCat}
                options={['Vestes', 'Chaussures', 'Sacs', 'T-shirts', 'Pantalons', 'Accessoires']}
              />
            </View>
            <View style={{ flex: 1 }}>
              <FieldSelect
                t={t}
                label="État"
                value={cond}
                onChange={setCond}
                options={['Neuf', 'Comme neuf', 'Très bon état', 'Bon état']}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ flex: 1 }}>
              <Input t={t} label="Taille" value={size} onChangeText={setSize} />
            </View>
            <View style={{ flex: 1 }}>
              <Input
                t={t}
                label="Ville"
                value={city}
                onChangeText={setCity}
                icon={<Icon name="pin" size={14} color={t.textTertiary} />}
              />
            </View>
          </View>
          <Input t={t} label="Quartier" value={quartier} onChangeText={setQuartier} />

          <View>
            <Text style={[TYPE.label, { color: t.textSecondary, marginBottom: 8 }]}>
              Type d'annonce
            </Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {[
                ['vente', 'Vente'],
                ['echange', 'Échange'],
                ['les-deux', 'Les deux'],
              ].map(([v, l]) => (
                <Pressable
                  key={v}
                  onPress={() => setType(v)}
                  style={[
                    styles.typeBtn,
                    {
                      backgroundColor: type === v ? t.primary : t.isDark ? t.surfaceAlt : '#fff',
                      borderColor: type === v ? t.primary : t.border,
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
          </View>

          {type === 'vente' || type === 'les-deux' ? (
            <Input
              t={t}
              label="Prix"
              prefix="MAD"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              placeholder="450"
            />
          ) : null}
          {type === 'echange' || type === 'les-deux' ? (
            <Input
              t={t}
              label="Préférences d'échange (optionnel)"
              value={echangePref}
              onChangeText={setEchangePref}
              placeholder="Ex. Veste en cuir taille M"
            />
          ) : null}
        </View>
      </ScrollView>
      <View style={[styles.footer, { backgroundColor: t.bgElev, borderTopColor: t.divider }]}>
        <Pressable
          onPress={() => app.push('preview', { id: 'p1' })}
          style={[styles.previewBtn, { borderColor: t.border }]}
        >
          <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 15, color: t.textPrimary }}>
            Aperçu
          </Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          <Button t={t} variant="primary" size="md" onPress={app.back}>
            {editing ? 'Enregistrer' : 'Publier'}
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { padding: 16 },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  photoEmpty: {
    width: '32%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  photoFilled: {
    width: '32%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  principal: {
    position: 'absolute',
    top: 6,
    left: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  photoClose: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 999,
    backgroundColor: 'rgba(15,21,35,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
  },
  previewBtn: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
