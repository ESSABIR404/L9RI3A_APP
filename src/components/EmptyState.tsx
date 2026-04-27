import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme, TYPE } from '../theme';
import { Icon, IconName } from './Icon';
import { Button } from './Button';

type Props = {
  t: Theme;
  icon: IconName;
  title: string;
  subtitle?: string;
  action?: string;
  onAction?: () => void;
};

export function EmptyState({ t, icon, title, subtitle, action, onAction }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={[styles.icon, { backgroundColor: t.primarySoft }]}>
        <Icon name={icon} size={32} color={t.primary} />
      </View>
      <Text style={[TYPE.h2, { color: t.textPrimary, textAlign: 'center' }]}>{title}</Text>
      {subtitle ? (
        <Text style={[TYPE.body, { color: t.textSecondary, textAlign: 'center', marginTop: 8, maxWidth: 280 }]}>
          {subtitle}
        </Text>
      ) : null}
      {action ? (
        <View style={{ width: 220, marginTop: 22 }}>
          <Button t={t} variant="primary" onPress={onAction}>
            {action}
          </Button>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
    minHeight: 400,
  },
  icon: {
    width: 76,
    height: 76,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});
