import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import BanksScreen from './plan-to-trip/BanksScreen';
import TaxiScreen from './plan-to-trip/TaxiScreen';
import CitiesScreen from './plan-to-trip/CitiesScreen';
import MobileCommunicationScreen from './plan-to-trip/MobileCommunicationScreen';
import config from '@/config';

const API_BASE = config.API_BASE;
const { width: screenWidth } = Dimensions.get('window');
const GRID_PADDING = 20;
const GRID_GAP = 5;
const COLUMNS = 3;
const ITEM_WIDTH = Math.floor((screenWidth - GRID_PADDING * 2 - GRID_GAP * (COLUMNS - 1)) / COLUMNS);

interface Category {
  id: number;
  title: string;
  slug: string;
  is_active: boolean;
  order: number;
}

const getIconForCategory = (slug: string) => {
  switch (slug) {
    case 'cities': return <MaterialCommunityIcons name="city-variant-outline" size={40} color="#fff" />;
    case 'hotel-booking': return <MaterialCommunityIcons name="home-outline" size={40} color="#fff" />;
    case 'mobile-communication': return <MaterialIcons name="wifi" size={40} color="#fff" />;
    case 'taxi': return <FontAwesome5 name="taxi" size={40} color="#fff" />;
    case 'banks': return <FontAwesome5 name="piggy-bank" size={40} color="#fff" />;
    default: return <MaterialCommunityIcons name="city" size={40} color="#fff" />;
  }
};

export default function PlanTripScreen({ visible, onClose, categories }: { visible: boolean, onClose: () => void, categories: Category[] }) {
  const [screenStates, setScreenStates] = useState<Record<string, boolean>>({});
  const [headerTitle, setHeaderTitle] = useState<string | null>(null);

  const setScreenVisible = (slug: string, visible: boolean) => {
    setScreenStates(prev => ({ ...prev, [slug]: visible }));
  };

  useEffect(() => {
    if (!visible) return;
    
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/home/page/content/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load homepage');
        const json = await res.json();
        const bookingTab = json?.mobile_tabs?.find((tab: any) => tab.group === 'booking');
        if (bookingTab?.label) {
          setHeaderTitle(bookingTab.label.toUpperCase());
        }
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      statusBarTranslucent
      presentationStyle="fullScreen"
    >
      <View style={styles.fullscreen}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
            {headerTitle && <Text style={styles.header}>{headerTitle}</Text>}
          </TouchableOpacity>
        </View>
        <View style={styles.grid}>
          {categories.filter(cat => cat.is_active).sort((a, b) => a.order - b.order).map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setScreenVisible(category.slug, true)}
              activeOpacity={0.8}
              style={styles.item}
            >
              <View style={styles.iconCircle}>{getIconForCategory(category.slug)}</View>
              <Text style={styles.label}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {categories.map(category => {
          const isVisible = screenStates[category.slug] || false;
          const closeScreen = () => setScreenVisible(category.slug, false);

          switch (category.slug) {
            case 'cities':
              return <CitiesScreen key={category.id} visible={isVisible} onClose={closeScreen} />;
            case 'hotel-booking':
              return null; // TODO: Add hotel booking screen
            case 'mobile-communication':
              return <MobileCommunicationScreen key={category.id} visible={isVisible} onClose={closeScreen} />;
            case 'taxi':
              return <TaxiScreen key={category.id} visible={isVisible} onClose={closeScreen} />;
            case 'banks':
              return <BanksScreen key={category.id} visible={isVisible} onClose={closeScreen} />;
            default:
              return null;
          }
        })}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  grid: {
    marginTop: 32,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: GRID_PADDING,
    justifyContent: 'flex-start',
    gap: GRID_GAP,
  },
  item: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    marginBottom: 5,
  },
  iconCircle: {
    width: 73,
    height: 73,
    borderRadius: 100,
    backgroundColor: '#1129BD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  label: {
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'center',
    color: '#000',
    width: '100%',
  },
}); 