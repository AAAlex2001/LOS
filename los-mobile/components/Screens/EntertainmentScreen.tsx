import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import PartiesScreen from './entertainment/PartiesScreen';
import MountainRoutesScreen from './entertainment/MountainRoutesScreen';
import ExcursionsScreen from './entertainment/ExcursionsScreen';
import HotSpringsScreen from './entertainment/HotSpringsScreen';
import SportsGymsScreen from './entertainment/SportsGymsScreen';
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
    case 'parties': return <MaterialCommunityIcons name="party-popper" size={40} color="#fff" />;
    case 'mountain-routes': return <MaterialCommunityIcons name="terrain" size={40} color="#fff" />;
    case 'excursions': return <MaterialCommunityIcons name="car-outline" size={40} color="#fff" />;
    case 'hot-springs': return <MaterialCommunityIcons name="hot-tub" size={40} color="#fff" />;
    case 'sports-gyms': return <FontAwesome5 name="dumbbell" size={40} color="#fff" />;
    default: return <MaterialCommunityIcons name="star" size={40} color="#fff" />;
  }
};

export default function EntertainmentScreen({ visible, onClose, categories }: { visible: boolean, onClose: () => void, categories: Category[] }) {
  const [screenStates, setScreenStates] = useState<Record<string, boolean>>({});
  const [headerTitle, setHeaderTitle] = useState<string | null>(null);

  const setScreenVisible = (slug: string, visible: boolean) => {
    setScreenStates(prev => ({ ...prev, [slug]: visible }));
  };

  useEffect(() => {
    if (!visible) return;
    
    const load = async () => {
      try {
        const res = await fetch(addLangParam(`${API_BASE}/api/home/page/content/`), { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load homepage');
        const json = await res.json();
        const activitiesTab = json?.mobile_tabs?.find((tab: any) => tab.group === 'activities');
        if (activitiesTab?.label) {
          setHeaderTitle(activitiesTab.label.toUpperCase());
        }
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent={false} presentationStyle="fullScreen" statusBarTranslucent>
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
            case 'parties':
              return <PartiesScreen key={category.id} visible={isVisible} onClose={closeScreen} />;
            case 'mountain-routes':
              return <MountainRoutesScreen key={category.id} visible={isVisible} onClose={closeScreen} />;
            case 'excursions':
              return <ExcursionsScreen key={category.id} visible={isVisible} onClose={closeScreen} />;
            case 'hot-springs':
              return <HotSpringsScreen key={category.id} visible={isVisible} onClose={closeScreen} />;
            case 'sports-gyms':
              return <SportsGymsScreen key={category.id} visible={isVisible} onClose={closeScreen} />;
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