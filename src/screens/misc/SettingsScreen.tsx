import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Theme, TYPE, FONT_UI_BOLD, FONT_UI_SEMI } from '../../theme';
import { BackHeader } from '../../components/BackHeader';
import { Avatar } from '../../components/Avatar';
import { Icon, IconName } from '../../components/Icon';
import { Toggle } from '../../components/Toggle';
import { L9_USER } from '../../data';
import { App } from '../../nav';

type Props = { t: Theme; app: App };

export function SettingsScreen({ t, app }: Props) {
  const u = L9_USER;
  const [notif, setNotif] = useState(true);
  const [promo, setPromo] = useState(false);
  const [darkHere, setDarkHere] = useState(t.isDark);

  return (
    <View style={[styles.root, { backgroundColor: t.bg }]}>
      <BackHeader t={t} onBack={app.back} title="Paramètres" />
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.userCard,
            { backgroundColor: t.bgElev, borderColor: t.border },
          ]}
        >
          <Avatar src={u.avatar} size={52} t={t} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 15, color: t.textPrimary }}>
              {u.name}
            </Text>
            <Text style={[TYPE.caption, { color: t.textSecondary, marginTop: 2 }]}>
              +212 6 12 34 56 78
            </Text>
          </View>
          <Icon name="chevron" size={16} color={t.textTertiary} />
        </View>

        <Section t={t} title="Compte">
          <Row t={t} icon="user" label="Informations personnelles" />
          <Row t={t} icon="pin" label="Adresse" value={u.city} />
          <Row t={t} icon="lock" label="Mot de passe" />
          <Row t={t} icon="phone" label="Numéro de téléphone" value="+212 6 12 ···" />
        </Section>

        <Section t={t} title="Préférences">
          <Row
            t={t}
            icon="bell"
            label="Notifications push"
            toggle={<Toggle value={notif} onChange={setNotif} t={t} />}
          />
          <Row
            t={t}
            icon="mail"
            label="Offres et promotions"
            toggle={<Toggle value={promo} onChange={setPromo} t={t} />}
          />
          <Row
            t={t}
            icon="moon"
            label="Mode sombre"
            toggle={
              <Toggle
                value={darkHere}
                onChange={(v) => {
                  setDarkHere(v);
                  app.setDark(v);
                }}
                t={t}
              />
            }
          />
          <Row t={t} icon="globe" label="Langue" value="Français" />
        </Section>

        <Section t={t} title="Application">
          <Row t={t} icon="shield" label="Confidentialité" />
          <Row t={t} icon="info" label="À propos" value="v2.4.1" />
          <Row t={t} icon="help" label="Aide et support" />
          <Row t={t} icon="star" label="Noter l'application" />
        </Section>

        <Section t={t} title="Session">
          <Row t={t} icon="logout" label="Déconnexion" danger onPress={app.goAuth} />
        </Section>
      </ScrollView>
    </View>
  );
}

function Section({ t, title, children }: { t: Theme; title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 18 }}>
      <Text
        style={{
          fontFamily: FONT_UI_BOLD,
          fontSize: 11,
          color: t.textTertiary,
          textTransform: 'uppercase',
          letterSpacing: 0.8,
          marginBottom: 8,
          marginLeft: 4,
        }}
      >
        {title}
      </Text>
      <View
        style={[
          styles.sectionWrap,
          { backgroundColor: t.bgElev, borderColor: t.border },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

function Row({
  t,
  icon,
  label,
  value,
  toggle,
  danger,
  onPress,
}: {
  t: Theme;
  icon: IconName;
  label: string;
  value?: string;
  toggle?: React.ReactNode;
  danger?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.row, { borderBottomColor: t.divider }]}
    >
      <View
        style={[
          styles.rowIcon,
          { backgroundColor: danger ? t.dangerSoft : t.primarySoft },
        ]}
      >
        <Icon name={icon} size={16} color={danger ? t.danger : t.primary} />
      </View>
      <Text
        style={{
          flex: 1,
          fontFamily: FONT_UI_SEMI,
          fontSize: 14,
          color: danger ? t.danger : t.textPrimary,
        }}
      >
        {label}
      </Text>
      {value ? (
        <Text style={{ fontSize: 13, color: t.textTertiary, fontFamily: FONT_UI_SEMI }}>
          {value}
        </Text>
      ) : null}
      {toggle ? toggle : !danger ? <Icon name="chevron" size={14} color={t.textTertiary} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 18,
  },
  sectionWrap: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
