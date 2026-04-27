import React, { useMemo, useState, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import {
  Fraunces_900Black,
  Fraunces_900Black_Italic,
} from '@expo-google-fonts/fraunces';

import { L9_LIGHT, L9_DARK } from './src/theme';
import { App as AppCtx, AuthStep, StackScreen, TabId } from './src/nav';
import { BottomNav } from './src/components/BottomNav';
import { Icon } from './src/components/Icon';

import { MarketScreen } from './src/screens/MarketScreen';
import { FavorisScreen } from './src/screens/FavorisScreen';
import { IAScreen } from './src/screens/IAScreen';
import { MessagesScreen } from './src/screens/MessagesScreen';
import { ConversationScreen } from './src/screens/ConversationScreen';
import { ProfilScreen } from './src/screens/ProfilScreen';

import { ProductDetailScreen } from './src/screens/product/ProductDetailScreen';
import { AchatScreen } from './src/screens/product/AchatScreen';
import { EchangeScreen } from './src/screens/product/EchangeScreen';
import { AddProductScreen } from './src/screens/product/AddProductScreen';
import { MyProductsScreen } from './src/screens/product/MyProductsScreen';
import { PreviewScreen } from './src/screens/product/PreviewScreen';

import { NotificationsScreen } from './src/screens/misc/NotificationsScreen';
import { SettingsScreen } from './src/screens/misc/SettingsScreen';
import { HistoryScreen } from './src/screens/misc/HistoryScreen';

import { SplashScreen } from './src/screens/auth/SplashScreen';
import { OnboardingScreen } from './src/screens/auth/OnboardingScreen';
import { WelcomeScreen } from './src/screens/auth/WelcomeScreen';
import { PhoneScreen } from './src/screens/auth/PhoneScreen';
import { OTPScreen } from './src/screens/auth/OTPScreen';
import { ProfileSetupScreen } from './src/screens/auth/ProfileSetupScreen';
import { LoginScreen } from './src/screens/auth/LoginScreen';

import { Drawer } from './src/overlays/Drawer';
import { SearchSheet } from './src/overlays/SearchSheet';
import { FiltersSheet } from './src/overlays/FiltersSheet';

const STACK_NAMES: StackScreen['name'][] = [
  'product',
  'conversation',
  'achat',
  'echange',
  'add-product',
  'edit-product',
  'my-products',
  'preview',
  'notifications',
  'settings',
  'history',
];

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Fraunces_900Black,
    Fraunces_900Black_Italic,
  });

  const [dark, setDark] = useState(false);
  const [stage, setStage] = useState<'auth' | 'app'>('auth');
  const [authStep, setAuthStep] = useState<AuthStep>('splash');
  const [tab, setTab] = useState<TabId>('marche');
  const [stack, setStack] = useState<StackScreen[]>([]);
  const [drawer, setDrawer] = useState(false);
  const [search, setSearch] = useState(false);
  const [filters, setFilters] = useState(false);
  const [saved, setSaved] = useState<string[]>(['p2', 'p5', 'p9']);
  const [searchQuery, setSearchQuery] = useState('');

  const t = dark ? L9_DARK : L9_LIGHT;

  const push = useCallback(<T extends StackScreen>(name: T['name'], params?: T['params']) => {
    setStack((s) => [...s, { name, params } as StackScreen]);
  }, []);
  const back = useCallback(() => setStack((s) => s.slice(0, -1)), []);
  const toggleSaved = useCallback(
    (id: string) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id])),
    []
  );
  const goAuth = useCallback(() => {
    setStage('auth');
    setAuthStep('welcome');
    setStack([]);
  }, []);

  const app: AppCtx = useMemo(
    () => ({
      tab,
      setTab: (id) => {
        setTab(id);
        setStack([]);
      },
      push,
      back,
      saved,
      toggleSaved,
      drawer,
      setDrawer,
      search,
      setSearch,
      filters,
      setFilters,
      searchQuery,
      setSearchQuery,
      dark,
      setDark,
      goAuth,
    }),
    [tab, push, back, saved, toggleSaved, drawer, search, filters, searchQuery, dark, goAuth]
  );

  if (!fontsLoaded) {
    return (
      <View style={[styles.loading, { backgroundColor: t.bg }]}>
        <ActivityIndicator color={t.primary} />
      </View>
    );
  }

  if (stage === 'auth') {
    const go = (next: AuthStep) => setAuthStep(next);
    const finish = () => {
      setStage('app');
      setTab('marche');
      setStack([]);
    };
    let content: React.ReactNode = null;
    if (authStep === 'splash') content = <SplashScreen t={t} onDone={() => go('onb1')} />;
    else if (authStep === 'onb1')
      content = (
        <OnboardingScreen
          t={t}
          step={0}
          total={3}
          variant="sell"
          title="Vendez vos vêtements facilement"
          subtitle="Publiez vos articles de seconde main en quelques étapes et atteignez des milliers d'acheteurs au Maroc."
          onNext={() => go('onb2')}
          onSkip={() => go('welcome')}
        />
      );
    else if (authStep === 'onb2')
      content = (
        <OnboardingScreen
          t={t}
          step={1}
          total={3}
          variant="trade"
          title="Échangez avec d'autres utilisateurs"
          subtitle="Proposez un échange simple et intelligent. Trouvez exactement ce que vous cherchez."
          onNext={() => go('onb3')}
          onSkip={() => go('welcome')}
        />
      );
    else if (authStep === 'onb3')
      content = (
        <OnboardingScreen
          t={t}
          step={2}
          total={3}
          variant="chat"
          title="Discutez et concluez en sécurité"
          subtitle="Négociez directement avec les vendeurs ou acheteurs via une messagerie sécurisée."
          onNext={() => go('welcome')}
          onSkip={() => go('welcome')}
        />
      );
    else if (authStep === 'welcome')
      content = (
        <WelcomeScreen t={t} onSignup={() => go('phone')} onLogin={() => go('login')} />
      );
    else if (authStep === 'phone')
      content = (
        <PhoneScreen
          t={t}
          onBack={() => go('welcome')}
          onContinue={() => go('otp')}
          onLogin={() => go('login')}
        />
      );
    else if (authStep === 'otp')
      content = <OTPScreen t={t} onBack={() => go('phone')} onConfirm={() => go('profile-setup')} />;
    else if (authStep === 'profile-setup')
      content = <ProfileSetupScreen t={t} onBack={() => go('otp')} onContinue={finish} />;
    else if (authStep === 'login')
      content = (
        <LoginScreen
          t={t}
          onBack={() => go('welcome')}
          onLogin={finish}
          onSignup={() => go('phone')}
          onForgot={() => {}}
        />
      );

    return (
      <SafeAreaProvider>
        <SafeAreaView style={[styles.root, { backgroundColor: t.bgElev }]} edges={['top']}>
          <View style={[styles.frame, { backgroundColor: t.bgElev }]}>{content}</View>
        </SafeAreaView>
        <StatusBar style={dark ? 'light' : 'dark'} />
      </SafeAreaProvider>
    );
  }

  const top = stack[stack.length - 1];
  const showNav = !top || !STACK_NAMES.includes(top.name);

  let content: React.ReactNode;
  if (top) {
    switch (top.name) {
      case 'product':
        content = <ProductDetailScreen t={t} app={app} productId={top.params.id} />;
        break;
      case 'conversation':
        content = <ConversationScreen t={t} app={app} convId={top.params.id} />;
        break;
      case 'achat':
        content = <AchatScreen t={t} app={app} productId={top.params.id} />;
        break;
      case 'echange':
        content = <EchangeScreen t={t} app={app} productId={top.params.id} />;
        break;
      case 'add-product':
        content = <AddProductScreen t={t} app={app} />;
        break;
      case 'edit-product':
        content = <AddProductScreen t={t} app={app} editing />;
        break;
      case 'my-products':
        content = <MyProductsScreen t={t} app={app} />;
        break;
      case 'preview':
        content = <PreviewScreen t={t} app={app} productId={top.params.id} />;
        break;
      case 'notifications':
        content = <NotificationsScreen t={t} app={app} />;
        break;
      case 'settings':
        content = <SettingsScreen t={t} app={app} />;
        break;
      case 'history':
        content = <HistoryScreen t={t} app={app} />;
        break;
    }
  } else {
    switch (tab) {
      case 'marche':
        content = <MarketScreen t={t} app={app} />;
        break;
      case 'favoris':
        content = <FavorisScreen t={t} app={app} />;
        break;
      case 'ia':
        content = <IAScreen t={t} app={app} />;
        break;
      case 'messages':
        content = <MessagesScreen t={t} app={app} />;
        break;
      case 'profil':
        content = <ProfilScreen t={t} app={app} />;
        break;
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.root, { backgroundColor: t.bgElev }]} edges={['top']}>
        <View style={[styles.content, { backgroundColor: t.bg }]}>
          {content}
          {showNav && (tab === 'marche' || tab === 'profil') ? (
            <Pressable
              onPress={() => push('add-product')}
              style={styles.fab}
            >
              <LinearGradient
                colors={[t.primary, t.primaryHover]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.fabInner}
              >
                <Icon name="plus" size={26} color="#fff" />
              </LinearGradient>
            </Pressable>
          ) : null}
        </View>
        {showNav ? (
          <BottomNav
            active={tab}
            onChange={(id) => {
              setTab(id);
              setStack([]);
            }}
            t={t}
          />
        ) : null}
      </SafeAreaView>
      <Drawer t={t} app={app} />
      <SearchSheet t={t} app={app} />
      <FiltersSheet t={t} app={app} />
      <StatusBar style={dark ? 'light' : 'dark'} />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  root: { flex: 1 },
  frame: { flex: 1 },
  content: { flex: 1, position: 'relative' },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 18,
    shadowColor: '#1877F2',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  fabInner: {
    flex: 1,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
