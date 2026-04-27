import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Theme, TYPE, FONT_UI_BOLD } from '../../theme';
import { BackHeader } from '../../components/BackHeader';
import { Button } from '../../components/Button';

type Props = { t: Theme; onBack: () => void; onConfirm: () => void };

export function OTPScreen({ t, onBack, onConfirm }: Props) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(42);
  const refs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (timer <= 0) return;
    const id = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  const setDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, '').slice(-1);
    const next = [...code];
    next[i] = d;
    setCode(next);
    if (d && i < 5) refs.current[i + 1]?.focus();
  };

  const complete = code.every((c) => c !== '');

  return (
    <View style={[styles.root, { backgroundColor: t.bgElev }]}>
      <BackHeader t={t} onBack={onBack} border={false} />
      <View style={styles.body}>
        <Text style={[TYPE.displayLg, { color: t.textPrimary }]}>Vérification</Text>
        <Text style={[TYPE.body, { color: t.textSecondary, marginTop: 10, marginBottom: 32 }]}>
          Nous avons envoyé un code à 6 chiffres au{' '}
          <Text style={{ fontFamily: FONT_UI_BOLD, color: t.textPrimary }}>
            +212 6 12 34 56 78
          </Text>
        </Text>

        <View style={styles.codeRow}>
          {code.map((d, i) => (
            <TextInput
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              keyboardType="number-pad"
              maxLength={1}
              value={d}
              onChangeText={(v) => setDigit(i, v)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace' && !d && i > 0) {
                  refs.current[i - 1]?.focus();
                }
              }}
              style={[
                styles.cell,
                {
                  backgroundColor: d ? t.primarySoft : t.isDark ? t.surfaceAlt : '#fff',
                  borderColor: d ? t.primary : t.border,
                  color: t.textPrimary,
                  fontFamily: FONT_UI_BOLD,
                },
              ]}
            />
          ))}
        </View>

        <View style={{ marginTop: 22, alignItems: 'center' }}>
          {timer > 0 ? (
            <Text style={[TYPE.bodySm, { color: t.textTertiary }]}>
              Renvoyer le code dans{' '}
              <Text style={{ fontFamily: FONT_UI_BOLD, color: t.textPrimary }}>
                0:{timer.toString().padStart(2, '0')}
              </Text>
            </Text>
          ) : (
            <Pressable onPress={() => setTimer(42)}>
              <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 14, color: t.primary }}>
                Renvoyer le code
              </Text>
            </Pressable>
          )}
        </View>

        <View style={{ flex: 1 }} />

        <Button t={t} variant="primary" size="lg" disabled={!complete} onPress={onConfirm}>
          Confirmer
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { flex: 1, paddingHorizontal: 24, paddingTop: 8, paddingBottom: 24 },
  codeRow: { flexDirection: 'row', gap: 10, justifyContent: 'space-between' },
  cell: {
    flex: 1,
    maxWidth: 52,
    height: 60,
    textAlign: 'center',
    fontSize: 24,
    borderWidth: 1.5,
    borderRadius: 14,
  },
});
