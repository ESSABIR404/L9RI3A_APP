import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  TextStyle,
} from 'react-native';
import { Theme, FONT_UI_SEMI, FONT_UI_MEDIUM, TYPE } from '../theme';

type Props = {
  label?: string;
  value?: string;
  onChangeText?: (v: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  prefix?: string;
  suffix?: React.ReactNode;
  t: Theme;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  autoFocus?: boolean;
  editable?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onSubmitEditing?: () => void;
  inputStyle?: TextStyle;
};

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  prefix,
  suffix,
  t,
  error,
  secureTextEntry,
  keyboardType,
  multiline,
  autoFocus,
  editable = true,
  onFocus,
  onBlur,
  onSubmitEditing,
  inputStyle,
}: Props) {
  const [focus, setFocus] = useState(false);
  const borderColor = error ? t.danger : focus ? t.primary : t.border;

  return (
    <View style={styles.wrap}>
      {label ? (
        <Text style={[styles.label, { color: t.textSecondary }]}>{label}</Text>
      ) : null}
      <View
        style={[
          styles.field,
          {
            backgroundColor: t.isDark ? t.surfaceAlt : '#fff',
            borderColor,
            minHeight: 54,
          },
          focus && !error
            ? {
                shadowColor: t.primary,
                shadowOpacity: 0.12,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 0 },
              }
            : null,
        ]}
      >
        {icon ? <View style={styles.slot}>{icon}</View> : null}
        {prefix ? (
          <View style={[styles.prefix, { borderRightColor: t.border }]}>
            <Text
              style={{
                fontFamily: FONT_UI_SEMI,
                fontSize: 15,
                color: t.textPrimary,
              }}
            >
              {prefix}
            </Text>
          </View>
        ) : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={t.textTertiary}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          autoFocus={autoFocus}
          editable={editable}
          onFocus={() => {
            setFocus(true);
            onFocus?.();
          }}
          onBlur={() => {
            setFocus(false);
            onBlur?.();
          }}
          onSubmitEditing={onSubmitEditing}
          style={[
            styles.input,
            {
              color: t.textPrimary,
              fontFamily: FONT_UI_MEDIUM,
              minHeight: multiline ? 80 : 44,
              textAlignVertical: multiline ? 'top' : 'center',
            },
            inputStyle,
          ]}
        />
        {suffix ? <View style={styles.slot}>{suffix}</View> : null}
      </View>
      {error ? (
        <Text style={[styles.error, { color: t.danger }]}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%' },
  label: {
    ...TYPE.label,
    marginBottom: 8,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    gap: 10,
  },
  slot: { alignItems: 'center', justifyContent: 'center' },
  prefix: {
    paddingRight: 10,
    marginRight: 2,
    borderRightWidth: 1,
    height: 24,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontSize: 15,
    padding: 0,
  },
  error: {
    ...TYPE.caption,
    marginTop: 6,
  },
});
