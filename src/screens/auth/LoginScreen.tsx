import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Theme, TYPE, FONT_UI_BOLD, FONT_UI_MEDIUM } from '../../theme';
import { BackHeader } from '../../components/BackHeader';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { Logo } from '../../components/Logo';

type Props = {
  t: Theme;
  onBack: () => void;
  onLogin: () => void;
  onSignup: () => void;
  onForgot?: () => void;
};

export function LoginScreen({ t, onBack, onLogin, onSignup, onForgot }: Props) {
  const [phone, setPhone] = useState('612345678');
  const [password, setPassword] = useState('password');
  const [show, setShow] = useState(false);

  return (
    <View style={[styles.root, { backgroundColor: t.bgElev }]}>
      <BackHeader t={t} onBack={onBack} border={false} />
      <View style={styles.body}>
        <Logo size={32} color={t.textPrimary} />
        <Text style={[TYPE.displayLg, { color: t.textPrimary, marginTop: 18, marginBottom: 8 }]}>
          Bon retour
        </Text>
        <Text style={[TYPE.body, { color: t.textSecondary, marginBottom: 28 }]}>
          Connectez-vous pour retrouver vos favoris et messages.
        </Text>

        <View style={{ gap: 14 }}>
          <Input
            t={t}
            label="Numéro de téléphone"
            prefix="+212"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <Input
            t={t}
            label="Mot de passe"
            secureTextEntry={!show}
            value={password}
            onChangeText={setPassword}
            icon={<Icon name="lock" size={16} color={t.textTertiary} />}
            suffix={
              <Pressable onPress={() => setShow(!show)}>
                <Icon name={show ? 'eyeOff' : 'eye'} size={16} color={t.textTertiary} />
              </Pressable>
            }
          />
        </View>

        <Pressable onPress={onForgot} style={{ alignSelf: 'flex-end', marginTop: 12 }}>
          <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 13, color: t.primary }}>
            Mot de passe oublié ?
          </Text>
        </Pressable>

        <View style={{ flex: 1 }} />

        <Button t={t} variant="primary" size="lg" onPress={onLogin}>
          Se connecter
        </Button>
        <View style={styles.faceRow}>
          <Icon name="face" size={18} color={t.textTertiary} />
          <Text style={{ fontFamily: FONT_UI_MEDIUM, fontSize: 13, color: t.textTertiary }}>
            Connexion avec Face ID
          </Text>
        </View>
        <Button t={t} variant="secondary" size="lg" onPress={onSignup}>
          Créer un compte
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { flex: 1, paddingHorizontal: 24, paddingTop: 8, paddingBottom: 24 },
  faceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 14,
  },
});
