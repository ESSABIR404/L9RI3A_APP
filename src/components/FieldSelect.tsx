import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';
import { Theme, TYPE, FONT_UI_MEDIUM, FONT_UI_BOLD } from '../theme';
import { Icon } from './Icon';

type Props = {
  t: Theme;
  label?: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
};

export function FieldSelect({ t, label, value, onChange, options }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <View>
      {label ? (
        <Text style={[TYPE.label, { color: t.textSecondary, marginBottom: 8 }]}>{label}</Text>
      ) : null}
      <Pressable
        onPress={() => setOpen(true)}
        style={[
          styles.field,
          {
            backgroundColor: t.isDark ? t.surfaceAlt : '#fff',
            borderColor: open ? t.primary : t.border,
          },
        ]}
      >
        <Text style={{ fontFamily: FONT_UI_MEDIUM, fontSize: 15, color: t.textPrimary, flex: 1 }}>
          {value}
        </Text>
        <Icon name="chevronDown" size={16} color={t.textTertiary} />
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)} />
        <View
          style={[
            styles.sheet,
            { backgroundColor: t.bgElev, borderTopColor: t.border, paddingBottom: 28 },
          ]}
        >
          <View
            style={{ alignItems: 'center', paddingVertical: 8 }}
          >
            <View style={{ width: 38, height: 4, borderRadius: 999, backgroundColor: t.borderStrong }} />
          </View>
          {label ? (
            <Text style={[TYPE.h3, { color: t.textPrimary, paddingHorizontal: 16, paddingBottom: 8 }]}>
              {label}
            </Text>
          ) : null}
          {options.map((o) => {
            const active = o === value;
            return (
              <Pressable
                key={o}
                onPress={() => {
                  onChange(o);
                  setOpen(false);
                }}
                style={[styles.option, { borderBottomColor: t.divider }]}
              >
                <Text
                  style={{
                    fontFamily: active ? FONT_UI_BOLD : FONT_UI_MEDIUM,
                    fontSize: 15,
                    color: active ? t.primary : t.textPrimary,
                  }}
                >
                  {o}
                </Text>
                {active ? <Icon name="check" size={16} color={t.primary} /> : null}
              </Pressable>
            );
          })}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    height: 54,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
});
