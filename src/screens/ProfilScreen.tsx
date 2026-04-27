import React from 'react';
import { View, Text, ScrollView, Image, Pressable, StyleSheet } from 'react-native';
import { Theme, TYPE, FONT_UI_EXTRA, FONT_UI_BOLD, FONT_UI_SEMI, SHADOWS } from '../theme';
import { MarketHeader } from '../components/MarketHeader';
import { Icon, IconName } from '../components/Icon';
import { Button } from '../components/Button';
import { L9_USER } from '../data';
import { App } from '../nav';

type Props = { t: Theme; app: App };

export function ProfilScreen({ t, app }: Props) {
  const u = L9_USER;
  return (
    <View style={[styles.root, { backgroundColor: t.bg }]}>
      <MarketHeader
        t={t}
        onMenu={() => app.setDrawer(true)}
        onNotif={() => app.push('notifications')}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { backgroundColor: t.bgElev, borderBottomColor: t.divider }]}>
          <View style={styles.avatarWrap}>
            <View style={[styles.avatar, SHADOWS.md, { borderColor: t.bgElev }]}>
              <Image source={{ uri: u.avatar }} style={{ width: '100%', height: '100%' }} />
            </View>
            <View style={[styles.accountTag, { backgroundColor: t.primary, borderColor: t.bgElev }]}>
              <Text
                style={{
                  fontFamily: FONT_UI_EXTRA,
                  fontSize: 9.5,
                  color: '#fff',
                  letterSpacing: 0.5,
                }}
              >
                {u.accountType.toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={[TYPE.h1, { color: t.textPrimary, marginTop: 12 }]}>{u.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Icon name="pin" size={12} color={t.textTertiary} />
            <Text style={[TYPE.caption, { color: t.textSecondary }]}>
              {u.city} · {u.quartier}
            </Text>
          </View>
          <View style={[styles.ratingPill, { backgroundColor: t.warningSoft }]}>
            <Icon name="star" size={12} color={t.warning} filled />
            <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 12, color: t.warning }}>
              {u.rating}
            </Text>
            <Text style={{ fontFamily: FONT_UI_SEMI, fontSize: 11, color: t.warning, opacity: 0.8 }}>
              ({u.reviews} avis)
            </Text>
          </View>
          <View style={styles.headerActions}>
            <View style={{ flex: 1 }}>
              <Button t={t} variant="primary" size="sm">
                Modifier le profil
              </Button>
            </View>
            <Pressable style={[styles.shareBtn, { borderColor: t.border }]}>
              <Icon name="share" size={16} color={t.textPrimary} />
            </Pressable>
          </View>
        </View>

        <View style={[styles.statsRow, { backgroundColor: t.bgElev, borderBottomColor: t.divider }]}>
          {[
            { l: 'Produits', v: u.stats.produits, i: 'box' as IconName },
            { l: 'Ventes', v: u.stats.ventes, i: 'shoppingBag' as IconName },
            { l: 'Échanges', v: u.stats.echanges, i: 'swap' as IconName },
            { l: 'Note', v: u.rating, i: 'star' as IconName },
          ].map((s) => (
            <View
              key={s.l}
              style={[styles.statCell, { backgroundColor: t.isDark ? t.surfaceAlt : '#F6F8FB' }]}
            >
              <Icon name={s.i} size={18} color={t.primary} />
              <Text style={{ fontFamily: FONT_UI_EXTRA, fontSize: 18, color: t.textPrimary, marginTop: 4 }}>
                {s.v}
              </Text>
              <Text style={[TYPE.captionSm, { color: t.textTertiary }]}>{s.l}</Text>
            </View>
          ))}
        </View>

        <View style={{ padding: 16, gap: 10 }}>
          <ProfilAction t={t} icon="box" label="Mes produits" onPress={() => app.push('my-products')} />
          <ProfilAction t={t} icon="history" label="Historique" onPress={() => app.push('history')} />
          <ProfilAction t={t} icon="settings" label="Paramètres" onPress={() => app.push('settings')} />
          <ProfilAction t={t} icon="help" label="Aide et support" />
          <ProfilAction t={t} icon="shield" label="Confidentialité" />
          <ProfilAction t={t} icon="logout" label="Déconnexion" danger onPress={app.goAuth} />
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

function ProfilAction({
  t,
  icon,
  label,
  onPress,
  danger,
}: {
  t: Theme;
  icon: IconName;
  label: string;
  onPress?: () => void;
  danger?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.action, { backgroundColor: t.bgElev, borderColor: t.border }]}
    >
      <View
        style={[
          styles.actionIcon,
          { backgroundColor: danger ? t.dangerSoft : t.primarySoft },
        ]}
      >
        <Icon name={icon} size={18} color={danger ? t.danger : t.primary} />
      </View>
      <Text
        style={{
          flex: 1,
          fontFamily: FONT_UI_SEMI,
          fontSize: 15,
          color: danger ? t.danger : t.textPrimary,
        }}
      >
        {label}
      </Text>
      <Icon name="chevron" size={16} color={t.textTertiary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 16, borderBottomWidth: 1 },
  avatarWrap: { position: 'relative' },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 999,
    overflow: 'hidden',
    borderWidth: 3,
  },
  accountTag: {
    position: 'absolute',
    bottom: 0,
    right: -4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 2,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginTop: 8,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
    width: '100%',
    maxWidth: 320,
  },
  shareBtn: {
    width: 44,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    padding: 16,
    borderBottomWidth: 1,
  },
  statCell: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
