export type TabId = 'marche' | 'favoris' | 'ia' | 'messages' | 'profil';

export type AuthStep =
  | 'splash'
  | 'onb1'
  | 'onb2'
  | 'onb3'
  | 'welcome'
  | 'phone'
  | 'otp'
  | 'profile-setup'
  | 'login';

export type StackScreen =
  | { name: 'product'; params: { id: string } }
  | { name: 'conversation'; params: { id: string } }
  | { name: 'achat'; params: { id: string } }
  | { name: 'echange'; params: { id: string } }
  | { name: 'add-product'; params?: undefined }
  | { name: 'edit-product'; params?: undefined }
  | { name: 'my-products'; params?: undefined }
  | { name: 'preview'; params: { id: string } }
  | { name: 'notifications'; params?: undefined }
  | { name: 'settings'; params?: undefined }
  | { name: 'history'; params?: undefined };

export type App = {
  tab: TabId;
  setTab: (id: TabId) => void;
  push: <T extends StackScreen>(name: T['name'], params?: T['params']) => void;
  back: () => void;
  saved: string[];
  toggleSaved: (id: string) => void;
  drawer: boolean;
  setDrawer: (v: boolean) => void;
  search: boolean;
  setSearch: (v: boolean) => void;
  filters: boolean;
  setFilters: (v: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  dark: boolean;
  setDark: (v: boolean) => void;
  goAuth: () => void;
};
