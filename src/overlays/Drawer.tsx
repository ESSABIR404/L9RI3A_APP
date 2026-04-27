import React from 'react';
import { View, Text, Pressable, Modal, StyleSheet, ScrollView } from 'react-native';
import { Theme, TYPE, FONT_UI_BOLD, FONT_UI_SEMI } from '../theme';
import { Avatar } from '../components/Avatar';
import { Logo } from '../components/Logo';
import { Icon, IconName } from '../components/Icon';
import { L9_USER } from '../data';
import { App } from '../nav';

type Props = { t: Theme; app: App };

type Item = {
  i: IconName;
  l: string;
  act?: () => void;
  danger?: boolean;
};

export function Drawer({ t, app }: Props) {
  const u = L9_USER;
  const close = () => app.setDrawer(false);

  const menu: Item[] = [
    {
      i: 'home',
      l: 'Accueil',
      act: () => {
        app.setTab('marche');
        close();
      },
    },
    {
      i: 'box',
      l: 'Mes produits',
      act: () => {
        app.push('my-products');
        close();
      },
    },
    {
      i: 'heart',
      l: 'Favoris',
      act: () => {
        app.setTab('favoris');
        close();
      },
    },
    {
      i: 'chat',
      l: 'Messages',
      act: () => {
        app.setTab('messages');
        close();
      },
    },
    {
      i: 'bell',
      l: 'Notifications',
      act: () => {
        app.push('notifications');
        close();
      },
    },
    {
      i: 'history',
      l: 'Historique',
      act: () => {
        app.push('history');
        close();
      },
    },
    {
      i: 'settings',
      l: 'Paramètres',
      act: () => {
        app.push('settings');
        close();
      },
    },
    { i: 'help', l: 'Aide et support' },
    { i: 'shield', l: 'Politique de confidentialité' },
    {
      i: 'logout',
      l: 'Déconnexion',
      danger: true,
      act: () => {
        close();
        app.goAuth();
      },
    },
  ];

  return (
    <Modal visible={app.drawer} transparent animationType="slide" onRequestClose={close}>
      <View style={styles.root}>
        <View
          style={[
            styles.panel,
            { backgroundColor: t.bgElev },
          ]}
        >
          <View style={styles.closeRow}>
            <Pressable onPress={close} style={[styles.closeBtn, { borderColor: t.border }]}>
              <Icon name="close" size={18} color={t.textPrimary} />
            </Pressable>
          </View>

          <View style={[styles.userRow, { borderBottomColor: t.divider }]}>
            <Avatar src={u.avatar} size={56} t={t} />
            <View style={{ flex: 1 }}>
              <Text style={[TYPE.h3, { color: t.textPrimary }]}>{u.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <View style={[styles.tag, { backgroundColor: t.primarySoft }]}>
                  <Text
                    style={{
                      fontFamily: FONT_UI_BOLD,
                      fontSize: 11,
                      color: t.primary,
                      letterSpacing: 0.4,
                      textTransform: 'uppercase',
                    }}
                  >
                    {u.accountType}
                  </Text>
                </View>
                <Text style={[TYPE.caption, { color: t.textSecondary }]}>
                  {u.city} · {u.quartier}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 4 }}>
                <Icon name="star" size={11} color={t.warning} filled />
                <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 12, color: t.textPrimary }}>
                  {u.rating}
                </Text>
                <Text style={[TYPE.captionSm, { color: t.textTertiary }]}>
                  ({u.reviews} avis)
                </Text>
              </View>
            </View>
          </View>

          <ScrollView contentContainerStyle={{ padding: 10, paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
            {menu.map((m, i) => (
              <Pressable
                key={i}
                onPress={m.act}
                style={styles.item}
              >
                <View
                  style={[
                    styles.itemIcon,
                    { backgroundColor: m.danger ? t.dangerSoft : t.primarySoft },
                  ]}
                >
                  <Icon name={m.i} size={18} color={m.danger ? t.danger : t.primary} />
                </View>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: FONT_UI_SEMI,
                    fontSize: 14.5,
                    color: m.danger ? t.danger : t.textPrimary,
                  }}
                >
                  {m.l}
                </Text>
                <Icon name="chevron" size={14} color={t.textTertiary} />
              </Pressable>
            ))}
            <View style={{ alignItems: 'center', marginTop: 10, padding: 10 }}>
              <Logo size={18} color={t.textTertiary} />
              <Text style={[TYPE.captionSm, { color: t.textTertiary, marginTop: 4 }]}>
                Version 2.4.1
              </Text>
            </View>
          </ScrollView>
        </View>
        <Pressable style={styles.scrim} onPress={close} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  panel: {
    width: '82%',
    maxWidth: 340,
    height: '100%',
    paddingTop: 47,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 8, height: 0 },
    elevation: 20,
  },
  scrim: { flex: 1 },
  closeRow: { paddingHorizontal: 14, paddingTop: 6, alignItems: 'flex-end' },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  tag: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 2,
  },
  itemIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
