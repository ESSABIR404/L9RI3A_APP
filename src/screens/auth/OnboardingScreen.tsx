import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme, TYPE, FONT_UI_SEMI } from '../../theme';
import { Logo } from '../../components/Logo';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';

type Variant = 'sell' | 'trade' | 'chat';

type Props = {
  t: Theme;
  step: number;
  total: number;
  title: string;
  subtitle: string;
  variant: Variant;
  onNext: () => void;
  onSkip: () => void;
};

function Illustration({ t, variant }: { t: Theme; variant: Variant }) {
  if (variant === 'sell') {
    return (
      <View style={[ill.box, { backgroundColor: t.primarySoft }]}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=600',
          }}
          style={ill.heroImg}
        />
        <View style={[ill.tag, { backgroundColor: t.primary }]}>
          <Text style={{ color: '#fff', fontFamily: FONT_UI_SEMI, fontSize: 11 }}>450 MAD</Text>
        </View>
        <View style={[ill.chip, { backgroundColor: t.bgElev }]}>
          <Icon name="camera" size={20} color={t.primary} />
        </View>
      </View>
    );
  }
  if (variant === 'trade') {
    return (
      <View style={[ill.box, { backgroundColor: t.primarySoft, justifyContent: 'center' }]}>
        <View style={ill.row}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=400',
            }}
            style={ill.tradeCard}
          />
          <View
            style={[
              ill.swap,
              {
                backgroundColor: t.bgElev,
                borderColor: t.primary,
              },
            ]}
          >
            <Icon name="swap" size={26} color={t.primary} />
          </View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400',
            }}
            style={ill.tradeCard}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={[ill.box, { backgroundColor: t.primarySoft, padding: 24 }]}>
      <View style={[ill.bubbleL, { backgroundColor: t.bgElev, borderColor: t.border }]}>
        <Text style={[TYPE.bodySm, { color: t.textPrimary }]}>Salam, c'est dispo ?</Text>
      </View>
      <View style={[ill.bubbleR, { backgroundColor: t.primary }]}>
        <Text style={[TYPE.bodySm, { color: '#fff' }]}>Oui ! On peut se voir demain ?</Text>
      </View>
      <View
        style={[
          ill.shield,
          { backgroundColor: t.bgElev, borderColor: t.success, borderWidth: 2 },
        ]}
      >
        <Icon name="shield" size={20} color={t.success} />
      </View>
    </View>
  );
}

export function OnboardingScreen({
  t,
  step,
  total,
  title,
  subtitle,
  variant,
  onNext,
  onSkip,
}: Props) {
  return (
    <View style={[styles.root, { backgroundColor: t.bgElev }]}>
      <View style={styles.top}>
        <Logo size={20} color={t.textPrimary} />
        <Pressable onPress={onSkip} hitSlop={8}>
          <Text style={[styles.skip, { color: t.textSecondary }]}>Passer</Text>
        </Pressable>
      </View>
      <View style={styles.content}>
        <Illustration t={t} variant={variant} />
        <View style={{ marginTop: 48 }}>
          <Text style={[TYPE.displayXl, { color: t.textPrimary }]}>{title}</Text>
          <Text
            style={[
              TYPE.bodyLg,
              { color: t.textSecondary, marginTop: 14 },
            ]}
          >
            {subtitle}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.dots}>
          {Array.from({ length: total }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  width: i === step ? 22 : 6,
                  backgroundColor: i === step ? t.primary : t.border,
                },
              ]}
            />
          ))}
        </View>
        <Button t={t} variant="primary" size="lg" onPress={onNext}>
          {step === total - 1 ? 'Commencer' : 'Continuer'}
        </Button>
      </View>
      <LinearGradient
        colors={['transparent', t.bgElev]}
        style={styles.gradient}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  skip: { fontFamily: FONT_UI_SEMI, fontSize: 14 },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  footer: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 },
  dots: { flexDirection: 'row', gap: 6, justifyContent: 'center', marginBottom: 24 },
  dot: { height: 6, borderRadius: 999 },
  gradient: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 0 },
});

const ill = StyleSheet.create({
  box: {
    height: 280,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImg: {
    position: 'absolute',
    width: '70%',
    height: '70%',
    borderRadius: 18,
    top: '15%',
    alignSelf: 'center',
  },
  tag: {
    position: 'absolute',
    bottom: 60,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  chip: {
    position: 'absolute',
    top: 22,
    left: 22,
    width: 52,
    height: 52,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tradeCard: { width: 100, height: 150, borderRadius: 16 },
  swap: {
    width: 64,
    height: 64,
    borderRadius: 999,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleL: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    maxWidth: 200,
  },
  bubbleR: {
    alignSelf: 'flex-end',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    borderBottomRightRadius: 4,
    marginTop: 16,
    maxWidth: 220,
  },
  shield: {
    alignSelf: 'center',
    width: 44,
    height: 44,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
});
