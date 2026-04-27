import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Theme, TYPE, FONT_UI_BOLD, FONT_UI_MEDIUM } from '../../theme';
import { BackHeader } from '../../components/BackHeader';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';

type Props = { t: Theme; onBack: () => void; onContinue: () => void; onLogin: () => void };

export function PhoneScreen({ t, onBack, onContinue, onLogin }: Props) {
  const [phone, setPhone] = useState('');
  const valid = phone.replace(/\s/g, '').length >= 9;

  return (
    <View style={[styles.root, { backgroundColor: t.bgElev }]}>
      <BackHeader t={t} onBack={onBack} border={false} />
      <View style={styles.body}>
        <Text style={[TYPE.displayLg, { color: t.textPrimary }]}>Créer votre compte</Text>
        <Text style={[TYPE.body, { color: t.textSecondary, marginTop: 10, marginBottom: 32 }]}>
          Entrez votre numéro de téléphone marocain pour recevoir un code de vérification.
        </Text>

        <Input
          t={t}
          label="Numéro de téléphone"
          prefix="+212"
          placeholder="6 12 34 56 78"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <View style={[styles.note, { backgroundColor: t.isDark ? t.surfaceAlt : '#F6F8FB' }]}>
          <Icon name="shield" size={16} color={t.textSecondary} />
          <Text style={[TYPE.caption, { color: t.textSecondary, flex: 1 }]}>
            Votre numéro est confidentiel et ne sera jamais partagé sans votre accord.
          </Text>
        </View>

        <View style={{ flex: 1 }} />

        <Button t={t} variant="primary" size="lg" disabled={!valid} onPress={onContinue}>
          Continuer
        </Button>
        <Pressable onPress={onLogin} style={styles.bottomLink}>
          <Text style={{ fontFamily: FONT_UI_MEDIUM, fontSize: 14, color: t.textSecondary }}>
            J'ai déjà un compte ·{' '}
            <Text style={{ fontFamily: FONT_UI_BOLD, color: t.primary }}>Se connecter</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { flex: 1, paddingHorizontal: 24, paddingTop: 8, paddingBottom: 24 },
  note: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  bottomLink: { alignItems: 'center', marginTop: 14 },
});
