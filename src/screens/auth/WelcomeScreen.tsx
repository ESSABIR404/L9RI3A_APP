import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme, TYPE, SHADOWS } from '../../theme';
import { Logo } from '../../components/Logo';
import { Button } from '../../components/Button';

type Props = {
  t: Theme;
  onSignup: () => void;
  onLogin: () => void;
};

export function WelcomeScreen({ t, onSignup, onLogin }: Props) {
  return (
    <View style={[styles.root, { backgroundColor: t.bgElev }]}>
      <LinearGradient
        colors={[t.primarySoft, 'transparent']}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.6 }}
      />
      <View style={styles.center}>
        <View style={styles.hero}>
          <View style={[styles.card, styles.card1, SHADOWS.lg, { borderColor: t.bgElev }]}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=400' }}
              style={styles.cardImg}
            />
          </View>
          <View style={[styles.card, styles.card2, SHADOWS.lg, { borderColor: t.bgElev }]}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400' }}
              style={styles.cardImg}
            />
          </View>
          <View style={[styles.card, styles.card3, SHADOWS.lg, { borderColor: t.bgElev }]}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400' }}
              style={styles.cardImg}
            />
          </View>
        </View>
        <Logo size={48} color={t.textPrimary} />
        <Text style={[TYPE.bodyLg, styles.tagline, { color: t.textSecondary }]}>
          La marketplace marocaine pour vendre, acheter et échanger vos vêtements.
        </Text>
      </View>
      <View style={styles.footer}>
        <Button t={t} variant="primary" size="lg" onPress={onSignup}>
          Créer un compte
        </Button>
        <View style={{ height: 12 }} />
        <Button t={t} variant="secondary" size="lg" onPress={onLogin}>
          Se connecter
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 24,
  },
  hero: { width: 280, height: 280 },
  card: {
    position: 'absolute',
    width: 120,
    height: 160,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 3,
  },
  card1: { top: 20, left: 10, transform: [{ rotate: '-8deg' }] },
  card2: { top: 40, right: 10, transform: [{ rotate: '6deg' }] },
  card3: { bottom: 0, left: 80, height: 120 },
  cardImg: { width: '100%', height: '100%' },
  tagline: { textAlign: 'center', maxWidth: 300, marginTop: 10 },
  footer: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 },
});
