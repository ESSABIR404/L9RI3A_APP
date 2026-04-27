import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme, TYPE, FONT_UI_EXTRA, SHADOWS } from '../../theme';
import { BackHeader } from '../../components/BackHeader';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';

type Props = { t: Theme; onBack: () => void; onContinue: () => void };

export function ProfileSetupScreen({ t, onBack, onContinue }: Props) {
  const [name, setName] = useState('Ayoub El Fassi');
  const [gender, setGender] = useState('homme');
  const [city, setCity] = useState('Casablanca');
  const [quartier, setQuartier] = useState('Maarif');

  return (
    <View style={[styles.root, { backgroundColor: t.bgElev }]}>
      <BackHeader t={t} onBack={onBack} title="Votre profil" border={false} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[TYPE.body, { color: t.textSecondary, marginBottom: 24 }]}>
          Quelques infos pour personnaliser votre expérience.
        </Text>

        <View style={styles.avatarRow}>
          <LinearGradient
            colors={[t.primary, t.accent]}
            style={[styles.avatar, SHADOWS.md]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={[styles.avatarInit]}>AE</Text>
          </LinearGradient>
          <View style={[styles.cameraBtn, { backgroundColor: t.primary, borderColor: t.bgElev }]}>
            <Icon name="camera" size={16} color="#fff" />
          </View>
        </View>

        <View style={{ gap: 14 }}>
          <Input t={t} label="Nom complet" value={name} onChangeText={setName} placeholder="Prénom Nom" />
          <View>
            <Text style={[TYPE.label, { color: t.textSecondary, marginBottom: 8 }]}>Genre</Text>
            <View style={styles.genderRow}>
              {[
                ['homme', 'Homme'],
                ['femme', 'Femme'],
                ['autre', 'Autre'],
              ].map(([v, l]) => (
                <Pressable
                  key={v}
                  onPress={() => setGender(v)}
                  style={[
                    styles.genderItem,
                    {
                      backgroundColor: gender === v ? t.primary : t.isDark ? t.surfaceAlt : '#fff',
                      borderColor: gender === v ? t.primary : t.border,
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontFamily: TYPE.bodyStrong.fontFamily,
                      fontSize: 14,
                      color: gender === v ? '#fff' : t.textPrimary,
                    }}
                  >
                    {l}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          <Input
            t={t}
            label="Ville"
            value={city}
            onChangeText={setCity}
            icon={<Icon name="pin" size={16} color={t.textTertiary} />}
          />
          <Input t={t} label="Quartier" value={quartier} onChangeText={setQuartier} />
        </View>
      </ScrollView>
      <View style={[styles.footer, { backgroundColor: t.bgElev }]}>
        <Button t={t} variant="primary" size="lg" onPress={onContinue}>
          Enregistrer et continuer
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 24 },
  avatarRow: { alignSelf: 'center', marginBottom: 28, position: 'relative' },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInit: { color: '#fff', fontFamily: FONT_UI_EXTRA, fontSize: 36 },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
  },
  genderRow: { flexDirection: 'row', gap: 8 },
  genderItem: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 28 },
});
