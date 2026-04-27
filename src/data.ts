export type Product = {
  id: string;
  title: string;
  brand: string;
  price: number;
  image: string;
  seller: { id: string; name: string; rating: number; reviews: number };
  city: string;
  quartier: string;
  type: 'vente' | 'echange';
  condition: string;
  size: string;
  description: string;
  category: string;
  posted: string;
};

export const L9_PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Veste en jean oversize',
    brand: "Levi's Vintage",
    price: 450,
    image: 'https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=600&auto=format&fit=crop',
    seller: { id: 's1', name: 'Amine B.', rating: 4.8, reviews: 47 },
    city: 'Casablanca',
    quartier: 'Maarif',
    type: 'vente',
    condition: 'Très bon état',
    size: 'M',
    description:
      "Veste en jean oversize portée quelques fois. Coupe parfaite, aucune tache ni accroc. Authentique Levi's.",
    category: 'Vestes',
    posted: 'Il y a 2 jours',
  },
  {
    id: 'p2',
    title: 'Sneakers Air Jordan 1',
    brand: 'Nike',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&auto=format&fit=crop',
    seller: { id: 's2', name: 'Yassine K.', rating: 4.9, reviews: 112 },
    city: 'Rabat',
    quartier: 'Agdal',
    type: 'vente',
    condition: 'Comme neuf',
    size: '42',
    description:
      "Air Jordan 1 Mid, pointure 42. Portées 2 fois, en parfait état. Boîte d'origine incluse.",
    category: 'Chaussures',
    posted: 'Il y a 5 heures',
  },
  {
    id: 'p3',
    title: "Robe d'été fleurie",
    brand: 'Zara',
    price: 180,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop',
    seller: { id: 's3', name: 'Salma R.', rating: 5.0, reviews: 23 },
    city: 'Marrakech',
    quartier: 'Guéliz',
    type: 'echange',
    condition: 'Bon état',
    size: 'S',
    description:
      "Robe longue fleurie, légère et fluide. Portée une saison. J'échange contre une robe taille S ou M.",
    category: 'Robes',
    posted: 'Il y a 1 jour',
  },
  {
    id: 'p4',
    title: 'Hoodie Champion vintage',
    brand: 'Champion',
    price: 320,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop',
    seller: { id: 's4', name: 'Omar T.', rating: 4.7, reviews: 68 },
    city: 'Casablanca',
    quartier: 'Gauthier',
    type: 'vente',
    condition: 'Très bon état',
    size: 'L',
    description:
      "Hoodie Champion des années 90, coupe large, coton épais. Quelques signes d'usure à la capuche.",
    category: 'Sweats',
    posted: 'Il y a 3 jours',
  },
  {
    id: 'p5',
    title: 'Sac à main cuir brun',
    brand: 'Mango',
    price: 520,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop',
    seller: { id: 's5', name: 'Nora F.', rating: 4.9, reviews: 89 },
    city: 'Casablanca',
    quartier: 'Anfa',
    type: 'vente',
    condition: 'Neuf avec étiquette',
    size: 'Unique',
    description: 'Sac en cuir véritable, cadeau jamais utilisé. Étiquette encore attachée.',
    category: 'Sacs',
    posted: 'Il y a 6 heures',
  },
  {
    id: 'p6',
    title: 'Pantalon chino beige',
    brand: 'Uniqlo',
    price: 220,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop',
    seller: { id: 's6', name: 'Mehdi L.', rating: 4.6, reviews: 34 },
    city: 'Tanger',
    quartier: 'Malabata',
    type: 'echange',
    condition: 'Bon état',
    size: '32',
    description: 'Chino beige, coupe droite, taille 32. Échange possible contre un jean même taille.',
    category: 'Pantalons',
    posted: 'Il y a 4 jours',
  },
  {
    id: 'p7',
    title: 'T-shirt graphique noir',
    brand: 'Stüssy',
    price: 280,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop',
    seller: { id: 's7', name: 'Youssef M.', rating: 4.8, reviews: 56 },
    city: 'Casablanca',
    quartier: 'Maarif',
    type: 'vente',
    condition: 'Très bon état',
    size: 'M',
    description:
      'T-shirt Stüssy édition limitée. Impression parfaite, jamais passé au sèche-linge.',
    category: 'T-shirts',
    posted: 'Il y a 1 jour',
  },
  {
    id: 'p8',
    title: 'Montre Daniel Wellington',
    brand: 'Daniel Wellington',
    price: 680,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop',
    seller: { id: 's8', name: 'Hamza A.', rating: 5.0, reviews: 19 },
    city: 'Rabat',
    quartier: 'Hassan',
    type: 'vente',
    condition: 'Comme neuf',
    size: 'Unique',
    description: 'Montre Daniel Wellington, bracelet cuir marron. Fonctionne parfaitement, pile neuve.',
    category: 'Accessoires',
    posted: 'Il y a 2 jours',
  },
  {
    id: 'p9',
    title: 'Blazer structuré noir',
    brand: 'Massimo Dutti',
    price: 550,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop',
    seller: { id: 's9', name: 'Imane H.', rating: 4.9, reviews: 41 },
    city: 'Casablanca',
    quartier: 'Racine',
    type: 'vente',
    condition: 'Très bon état',
    size: 'S',
    description: 'Blazer noir structuré, coupe ajustée. Parfait pour le bureau ou une soirée.',
    category: 'Vestes',
    posted: 'Il y a 1 semaine',
  },
  {
    id: 'p10',
    title: 'Baskets Nike Air Force 1',
    brand: 'Nike',
    price: 750,
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&auto=format&fit=crop',
    seller: { id: 's10', name: 'Karim Z.', rating: 4.7, reviews: 92 },
    city: 'Casablanca',
    quartier: 'Bourgogne',
    type: 'vente',
    condition: 'Bon état',
    size: '43',
    description:
      "Air Force 1 blanches, pointure 43. Quelques marques d'usage mais bien entretenues.",
    category: 'Chaussures',
    posted: 'Il y a 3 heures',
  },
  {
    id: 'p11',
    title: 'Casquette New Era NY',
    brand: 'New Era',
    price: 140,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&auto=format&fit=crop',
    seller: { id: 's11', name: 'Adam E.', rating: 4.5, reviews: 12 },
    city: 'Fès',
    quartier: 'V. Nouvelle',
    type: 'vente',
    condition: 'Très bon état',
    size: 'Unique',
    description: 'Casquette New Era Yankees, taille ajustable.',
    category: 'Accessoires',
    posted: 'Il y a 2 jours',
  },
  {
    id: 'p12',
    title: 'Pull col roulé camel',
    brand: 'COS',
    price: 380,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop',
    seller: { id: 's12', name: 'Sara M.', rating: 4.8, reviews: 51 },
    city: 'Casablanca',
    quartier: 'Maarif',
    type: 'echange',
    condition: 'Très bon état',
    size: 'M',
    description: 'Pull en laine mérinos, couleur camel. Échange possible.',
    category: 'Pulls',
    posted: 'Il y a 5 jours',
  },
];

export type Conversation = {
  id: string;
  user: { name: string; avatar: string };
  lastMessage: string;
  time: string;
  unread: number;
  product: { id: string; title: string; image: string };
  type: 'achat' | 'echange';
};

export const L9_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    user: { name: 'Yassine K.', avatar: 'https://i.pravatar.cc/100?img=12' },
    lastMessage: 'Salam, est-ce que les Jordan sont toujours disponibles ?',
    time: '14:32',
    unread: 2,
    product: {
      id: 'p2',
      title: 'Sneakers Air Jordan 1',
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=200',
    },
    type: 'achat',
  },
  {
    id: 'c2',
    user: { name: 'Salma R.', avatar: 'https://i.pravatar.cc/100?img=47' },
    lastMessage: "J'accepte l'échange, on se voit demain ?",
    time: '12:08',
    unread: 1,
    product: {
      id: 'p3',
      title: "Robe d'été fleurie",
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200',
    },
    type: 'echange',
  },
  {
    id: 'c3',
    user: { name: 'Omar T.', avatar: 'https://i.pravatar.cc/100?img=33' },
    lastMessage: "Merci pour l'achat ! À bientôt",
    time: 'Hier',
    unread: 0,
    product: {
      id: 'p4',
      title: 'Hoodie Champion vintage',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200',
    },
    type: 'achat',
  },
  {
    id: 'c4',
    user: { name: 'Nora F.', avatar: 'https://i.pravatar.cc/100?img=44' },
    lastMessage: 'Le sac est encore dispo. Je peux baisser à 480 MAD.',
    time: 'Hier',
    unread: 0,
    product: {
      id: 'p5',
      title: 'Sac à main cuir brun',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200',
    },
    type: 'achat',
  },
  {
    id: 'c5',
    user: { name: 'Mehdi L.', avatar: 'https://i.pravatar.cc/100?img=15' },
    lastMessage: 'Tu aurais quoi à me proposer en échange ?',
    time: 'Lun.',
    unread: 0,
    product: {
      id: 'p6',
      title: 'Pantalon chino beige',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=200',
    },
    type: 'echange',
  },
  {
    id: 'c6',
    user: { name: 'Imane H.', avatar: 'https://i.pravatar.cc/100?img=25' },
    lastMessage: 'Parfait, à demain 11h devant Anfa Place.',
    time: 'Dim.',
    unread: 0,
    product: {
      id: 'p9',
      title: 'Blazer structuré noir',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200',
    },
    type: 'achat',
  },
];

export type Notification = {
  id: string;
  type: 'message' | 'offer' | 'accepted' | 'sold' | 'rejected' | 'rating';
  title: string;
  body: string;
  time: string;
  unread: boolean;
  avatar?: string;
  icon?: string;
};

export const L9_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'message',
    title: 'Yassine K. vous a envoyé un message',
    body: 'Salam, les Jordan sont toujours dispo ?',
    time: 'Il y a 5 min',
    unread: true,
    avatar: 'https://i.pravatar.cc/100?img=12',
  },
  {
    id: 'n2',
    type: 'offer',
    title: 'Nouvelle offre reçue',
    body: 'Offre de 1100 MAD sur Air Jordan 1',
    time: 'Il y a 1h',
    unread: true,
    icon: 'tag',
  },
  {
    id: 'n3',
    type: 'accepted',
    title: 'Offre acceptée',
    body: "Salma R. a accepté votre offre d'échange",
    time: 'Il y a 3h',
    unread: true,
    icon: 'check',
  },
  {
    id: 'n4',
    type: 'sold',
    title: 'Article vendu',
    body: 'Votre T-shirt Stüssy a été marqué vendu',
    time: 'Hier',
    unread: false,
    icon: 'shoppingBag',
  },
  {
    id: 'n5',
    type: 'rejected',
    title: 'Offre refusée',
    body: "Omar T. n'a pas accepté votre proposition",
    time: 'Hier',
    unread: false,
    icon: 'close',
  },
  {
    id: 'n6',
    type: 'rating',
    title: 'Laissez un avis',
    body: "Comment s'est passée votre vente avec Karim ?",
    time: '2 jours',
    unread: false,
    icon: 'star',
  },
  {
    id: 'n7',
    type: 'message',
    title: 'Nora F. vous a envoyé un message',
    body: 'Le sac est encore dispo. Je peux baisser à 480 MAD.',
    time: '2 jours',
    unread: false,
    avatar: 'https://i.pravatar.cc/100?img=44',
  },
];

export const L9_USER = {
  name: 'Ayoub El Fassi',
  accountType: 'Membre',
  avatar: 'https://i.pravatar.cc/150?img=68',
  city: 'Casablanca',
  quartier: 'Maarif',
  rating: 4.9,
  reviews: 64,
  stats: { produits: 12, ventes: 38, echanges: 9 },
};

export type CategoryKey =
  | 'Tout'
  | 'Vestes'
  | 'Chaussures'
  | 'Sacs'
  | 'Robes'
  | 'T-shirts'
  | 'Pantalons'
  | 'Pulls'
  | 'Sweats'
  | 'Accessoires';

export const CATEGORIES: { label: CategoryKey; icon: string }[] = [
  { label: 'Tout', icon: 'grid' },
  { label: 'Vestes', icon: 'tshirt' },
  { label: 'Chaussures', icon: 'box' },
  { label: 'Sacs', icon: 'shoppingBag' },
  { label: 'Robes', icon: 'tshirt' },
  { label: 'T-shirts', icon: 'tshirt' },
  { label: 'Pantalons', icon: 'tshirt' },
  { label: 'Pulls', icon: 'tshirt' },
  { label: 'Sweats', icon: 'tshirt' },
  { label: 'Accessoires', icon: 'star' },
];
