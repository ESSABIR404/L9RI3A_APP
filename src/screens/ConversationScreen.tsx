import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Theme, TYPE, FONT_UI_BOLD, FONT_UI_SEMI, FONT_UI_EXTRA } from '../theme';
import { BackHeader } from '../components/BackHeader';
import { Icon } from '../components/Icon';
import { L9_CONVERSATIONS, L9_PRODUCTS } from '../data';
import { App } from '../nav';

type Props = { t: Theme; app: App; convId: string };

type Message = {
  me: boolean;
  text?: string;
  time: string;
  offer?: { amount: number };
};

export function ConversationScreen({ t, app, convId }: Props) {
  const conv = L9_CONVERSATIONS.find((c) => c.id === convId) || L9_CONVERSATIONS[0];
  const product = L9_PRODUCTS.find((p) => p.id === conv.product.id) || L9_PRODUCTS[0];
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { me: false, text: 'Salam, est-ce que les Jordan sont toujours disponibles ?', time: '14:28' },
    { me: true, text: 'Salam ! Oui, toujours dispo.', time: '14:30' },
    { me: false, text: 'Parfait, est-ce que le prix est négociable ?', time: '14:31' },
    { me: false, text: '', time: '14:32', offer: { amount: 1100 } },
  ]);

  const send = () => {
    if (!msg.trim()) return;
    setMessages([...messages, { me: true, text: msg, time: 'Maintenant' }]);
    setMsg('');
  };

  return (
    <View style={[styles.root, { backgroundColor: t.bg }]}>
      <BackHeader
        t={t}
        onBack={app.back}
        title={conv.user.name}
        subtitle={conv.type === 'echange' ? 'Échange en cours' : 'Vendeur'}
        right={
          <Pressable
            style={[styles.iconBtn, { borderColor: t.border }]}
          >
            <Icon name="moreV" size={18} color={t.textPrimary} />
          </Pressable>
        }
      />

      <View
        style={[styles.pinned, { backgroundColor: t.bgElev, borderBottomColor: t.divider }]}
      >
        <Image source={{ uri: product.image }} style={styles.pinnedImg} />
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ fontFamily: FONT_UI_BOLD, fontSize: 13, color: t.textPrimary }}>
            {product.title}
          </Text>
          <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 12, color: t.primary }}>
            {product.price} MAD
          </Text>
        </View>
        <Pressable
          onPress={() => app.push('product', { id: product.id })}
          style={[styles.viewBtn, { borderColor: t.border }]}
        >
          <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 12, color: t.textPrimary }}>Voir</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[styles.dayPill, { backgroundColor: t.isDark ? t.surfaceAlt : '#EEF0F5' }]}
        >
          <Text style={{ fontFamily: FONT_UI_SEMI, fontSize: 11, color: t.textTertiary }}>
            Aujourd'hui
          </Text>
        </View>
        {messages.map((m, i) => (
          <View key={i} style={{ alignItems: m.me ? 'flex-end' : 'flex-start' }}>
            <View
              style={[
                styles.bubble,
                {
                  backgroundColor: m.me ? t.primary : t.bgElev,
                  borderColor: m.me ? 'transparent' : t.border,
                  borderBottomRightRadius: m.me ? 4 : 18,
                  borderBottomLeftRadius: m.me ? 18 : 4,
                  maxWidth: '78%',
                },
              ]}
            >
              {m.offer ? (
                <View>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: FONT_UI_BOLD,
                      fontSize: 11,
                      letterSpacing: 0.5,
                      textTransform: 'uppercase',
                      opacity: 0.8,
                    }}
                  >
                    Offre
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONT_UI_EXTRA,
                      fontSize: 22,
                      color: m.me ? '#fff' : t.textPrimary,
                      marginTop: 2,
                    }}
                  >
                    {m.offer.amount} MAD
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 12,
                      opacity: 0.85,
                      marginTop: 4,
                    }}
                  >
                    En attente de réponse
                  </Text>
                </View>
              ) : (
                <Text
                  style={{
                    fontSize: 14,
                    color: m.me ? '#fff' : t.textPrimary,
                    fontFamily: TYPE.body.fontFamily,
                  }}
                >
                  {m.text}
                </Text>
              )}
            </View>
            <Text
              style={{
                fontSize: 11,
                color: t.textTertiary,
                marginVertical: 4,
                paddingHorizontal: 6,
                fontFamily: TYPE.captionSm.fontFamily,
              }}
            >
              {m.time}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View
        style={[styles.actionRow, { backgroundColor: t.bgElev, borderTopColor: t.divider }]}
      >
        <Pressable style={[styles.actionBtn, { borderColor: t.border }]}>
          <Icon name="tag" size={14} color={t.primary} />
          <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 13, color: t.primary }}>
            Faire une offre
          </Text>
        </Pressable>
        <Pressable
          onPress={() => app.push('echange', { id: product.id })}
          style={[styles.actionBtn, { borderColor: t.border }]}
        >
          <Icon name="swap" size={14} color={t.accent} />
          <Text style={{ fontFamily: FONT_UI_BOLD, fontSize: 13, color: t.accent }}>Échange</Text>
        </Pressable>
      </View>

      <View style={[styles.inputRow, { backgroundColor: t.bgElev }]}>
        <Pressable style={[styles.iconRound, { borderColor: t.border }]}>
          <Icon name="plus" size={18} color={t.textPrimary} />
        </Pressable>
        <View
          style={[
            styles.inputWrap,
            { backgroundColor: t.isDark ? t.surfaceAlt : '#F6F8FB', borderColor: t.border },
          ]}
        >
          <TextInput
            value={msg}
            onChangeText={setMsg}
            onSubmitEditing={send}
            placeholder="Message..."
            placeholderTextColor={t.textTertiary}
            style={{
              flex: 1,
              fontFamily: TYPE.body.fontFamily,
              fontSize: 14,
              color: t.textPrimary,
              padding: 0,
            }}
          />
        </View>
        <Pressable onPress={send} style={[styles.sendBtn, { backgroundColor: t.primary }]}>
          <Icon name="send" size={16} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinned: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  pinnedImg: { width: 44, height: 44, borderRadius: 10 },
  viewBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
  },
  list: { padding: 16, gap: 8 },
  dayPill: {
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 6,
  },
  bubble: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    paddingBottom: 14,
    alignItems: 'center',
  },
  iconRound: {
    width: 40,
    height: 40,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrap: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
