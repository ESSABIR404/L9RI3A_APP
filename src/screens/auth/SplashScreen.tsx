import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme, FONT_UI_SEMI } from '../../theme';
import { Logo } from '../../components/Logo';

type Props = { t: Theme; onDone: () => void };

export function SplashScreen({ t, onDone }: Props) {
  useEffect(() => {
    const id = setTimeout(onDone, 1800);
    return () => clearTimeout(id);
  }, [onDone]);

  return (
    <View style={[styles.root, { backgroundColor: t.bgElev }]}>
      <LinearGradient
        colors={[t.primarySoft, 'transparent']}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0.5, y: 0.2 }}
        end={{ x: 0.5, y: 0.8 }}
      />
      <View style={styles.center}>
        <Logo size={64} color={t.textPrimary} />
        <Text style={[styles.tagline, { color: t.textTertiary }]}>MARKETPLACE · MAROC</Text>
      </View>
      <View style={styles.dots}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={[styles.dot, { backgroundColor: t.primary }]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  center: { alignItems: 'center', gap: 14 },
  tagline: {
    fontFamily: FONT_UI_SEMI,
    fontSize: 12,
    letterSpacing: 4,
  },
  dots: { position: 'absolute', bottom: 80, flexDirection: 'row', gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 999, opacity: 0.7 },
});
