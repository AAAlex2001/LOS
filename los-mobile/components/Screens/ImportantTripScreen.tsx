import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import config from '@/config';
import ImportantScreen from './important-trip/ImportantScreen';

const API_BASE = config.API_BASE;

interface Category {
  id: number;
  title: string;
  slug: string;
  is_active: boolean;
  order: number;
}

const getIconForCategory = (slug: string) => {
  switch (slug) {
    case 'your-doctor': return <FontAwesome5 name="clinic-medical" size={40} color="#fff" />;
    case 'important-info': return <MaterialCommunityIcons name="alert-circle-outline" size={40} color="#fff" />;
    default: return <MaterialCommunityIcons name="information" size={40} color="#fff" />;
  }
};

export default function ImportantTripScreen({ visible, onClose, categories }: { visible: boolean, onClose: () => void, categories: Category[] }) {
  const [headerTitle, setHeaderTitle] = useState<string | null>(null);
  const [screenStates, setScreenStates] = useState<Record<string, boolean>>({});

  const setScreenVisible = (slug: string, v: boolean) =>
    setScreenStates((s) => ({ ...s, [slug]: v }));

  useEffect(() => {
    if (!visible) return;
    
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/home/page/content/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load homepage');
        const json = await res.json();
        const essentialsTab = json?.mobile_tabs?.find((tab: any) => tab.group === 'essentials');
        if (essentialsTab?.label) {
          setHeaderTitle(essentialsTab.label.toUpperCase());
        }
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.fullscreen}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
            {headerTitle && <Text style={styles.header}>{headerTitle}</Text>}
          </TouchableOpacity>
        </View>
        <View style={styles.grid}>
          {categories
            .filter(cat => cat.is_active)
            .sort((a, b) => a.order - b.order)
            .map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.item}
                activeOpacity={0.8}
                onPress={() => setScreenVisible(category.slug, true)}
              >
                <View style={styles.iconCircle}>{getIconForCategory(category.slug)}</View>
                <Text style={styles.label}>{category.title}</Text>
              </TouchableOpacity>
            ))}
        </View>

        {/* Modals by slug */}
        {categories.map((category) => {
          switch (category.slug) {
            case 'important-info':
              return (
                <ImportantScreen
                  key={category.id}
                  visible={!!screenStates[category.slug]}
                  onClose={() => setScreenVisible(category.slug, false)}
                />
              );
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
    paddingLeft: 20,
    justifyContent: 'flex-start',
  },
  item: {
    width: 110,
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 30,
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
    width: 110,
  },
}); 