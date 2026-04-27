import React from 'react';
import { Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export type IconName =
  | 'menu'
  | 'back'
  | 'close'
  | 'bell'
  | 'search'
  | 'filter'
  | 'heart'
  | 'chat'
  | 'user'
  | 'grid'
  | 'sparkle'
  | 'pin'
  | 'plus'
  | 'check'
  | 'camera'
  | 'image'
  | 'star'
  | 'share'
  | 'edit'
  | 'trash'
  | 'refresh'
  | 'send'
  | 'swap'
  | 'face'
  | 'chevron'
  | 'chevronDown'
  | 'eye'
  | 'eyeOff'
  | 'lock'
  | 'logout'
  | 'settings'
  | 'help'
  | 'shield'
  | 'history'
  | 'home'
  | 'box'
  | 'tag'
  | 'more'
  | 'moreV'
  | 'phone'
  | 'mic'
  | 'mail'
  | 'warning'
  | 'info'
  | 'copy'
  | 'globe'
  | 'moon'
  | 'sun'
  | 'upload'
  | 'add'
  | 'tshirt'
  | 'money'
  | 'location'
  | 'calendar'
  | 'shoppingBag'
  | 'archive';

type Props = {
  name: IconName;
  size?: number;
  color?: string;
  filled?: boolean;
};

export function Icon({ name, size = 24, color = '#0F1523', filled = false }: Props) {
  switch (name) {
    case 'menu':
      return <Feather name="menu" size={size} color={color} />;
    case 'back':
      return <Feather name="chevron-left" size={size} color={color} />;
    case 'close':
      return <Feather name="x" size={size} color={color} />;
    case 'bell':
      return (
        <Ionicons
          name={filled ? 'notifications' : 'notifications-outline'}
          size={size}
          color={color}
        />
      );
    case 'search':
      return <Feather name="search" size={size} color={color} />;
    case 'filter':
      return <Ionicons name="options-outline" size={size} color={color} />;
    case 'heart':
      return <Ionicons name={filled ? 'heart' : 'heart-outline'} size={size} color={color} />;
    case 'chat':
      return (
        <Ionicons name={filled ? 'chatbubble' : 'chatbubble-outline'} size={size} color={color} />
      );
    case 'user':
      return <Ionicons name={filled ? 'person' : 'person-outline'} size={size} color={color} />;
    case 'grid':
      return <Feather name="grid" size={size} color={color} />;
    case 'sparkle':
      return (
        <Ionicons name={filled ? 'sparkles' : 'sparkles-outline'} size={size} color={color} />
      );
    case 'pin':
      return <Feather name="map-pin" size={size} color={color} />;
    case 'plus':
      return <Feather name="plus" size={size} color={color} />;
    case 'check':
      return <Feather name="check" size={size} color={color} />;
    case 'camera':
      return <Feather name="camera" size={size} color={color} />;
    case 'image':
      return <Feather name="image" size={size} color={color} />;
    case 'star':
      return <Ionicons name={filled ? 'star' : 'star-outline'} size={size} color={color} />;
    case 'share':
      return <Feather name="share-2" size={size} color={color} />;
    case 'edit':
      return <Feather name="edit-2" size={size} color={color} />;
    case 'trash':
      return <Feather name="trash-2" size={size} color={color} />;
    case 'refresh':
      return <Feather name="refresh-cw" size={size} color={color} />;
    case 'send':
      return <Feather name="send" size={size} color={color} />;
    case 'swap':
      return <MaterialCommunityIcons name="swap-horizontal" size={size} color={color} />;
    case 'face':
      return <MaterialCommunityIcons name="face-recognition" size={size} color={color} />;
    case 'chevron':
      return <Feather name="chevron-right" size={size} color={color} />;
    case 'chevronDown':
      return <Feather name="chevron-down" size={size} color={color} />;
    case 'eye':
      return <Feather name="eye" size={size} color={color} />;
    case 'eyeOff':
      return <Feather name="eye-off" size={size} color={color} />;
    case 'lock':
      return <Feather name="lock" size={size} color={color} />;
    case 'logout':
      return <Feather name="log-out" size={size} color={color} />;
    case 'settings':
      return <Feather name="settings" size={size} color={color} />;
    case 'help':
      return <Feather name="help-circle" size={size} color={color} />;
    case 'shield':
      return <Feather name="shield" size={size} color={color} />;
    case 'history':
      return <MaterialIcons name="history" size={size} color={color} />;
    case 'home':
      return <Ionicons name={filled ? 'home' : 'home-outline'} size={size} color={color} />;
    case 'box':
      return <Feather name="box" size={size} color={color} />;
    case 'tag':
      return <Feather name="tag" size={size} color={color} />;
    case 'more':
      return <Feather name="more-horizontal" size={size} color={color} />;
    case 'moreV':
      return <Feather name="more-vertical" size={size} color={color} />;
    case 'phone':
      return <Feather name="phone" size={size} color={color} />;
    case 'mic':
      return <Feather name="mic" size={size} color={color} />;
    case 'mail':
      return <Feather name="mail" size={size} color={color} />;
    case 'warning':
      return <Feather name="alert-triangle" size={size} color={color} />;
    case 'info':
      return <Feather name="info" size={size} color={color} />;
    case 'copy':
      return <Feather name="copy" size={size} color={color} />;
    case 'globe':
      return <Feather name="globe" size={size} color={color} />;
    case 'moon':
      return <Feather name="moon" size={size} color={color} />;
    case 'sun':
      return <Feather name="sun" size={size} color={color} />;
    case 'upload':
      return <Feather name="upload" size={size} color={color} />;
    case 'add':
      return <Feather name="plus-circle" size={size} color={color} />;
    case 'tshirt':
      return <MaterialCommunityIcons name="tshirt-crew-outline" size={size} color={color} />;
    case 'money':
      return <Feather name="credit-card" size={size} color={color} />;
    case 'location':
      return <Feather name="map-pin" size={size} color={color} />;
    case 'calendar':
      return <Feather name="calendar" size={size} color={color} />;
    case 'shoppingBag':
      return <Feather name="shopping-bag" size={size} color={color} />;
    case 'archive':
      return <Feather name="archive" size={size} color={color} />;
  }
}
