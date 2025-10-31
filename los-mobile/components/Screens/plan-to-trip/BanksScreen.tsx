import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import config from '@/config';

const { width: screenWidth } = Dimensions.get('window');

interface Bank {
  id: number;
  name: string;
  name_link: string;
  working_hours: string;
  address: string;
  address_link: string;
  contacts: string;
  email: string;
  image_url: string;
  order: number;
}

interface BanksPageData {
  banks: Bank[];
}

const API_BASE = config.API_BASE;

const toImageUrl = (url: string) => {
  if (!url) return undefined;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_BASE}/media/${url}`;
};

export default function BanksScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const [pageData, setPageData] = useState<BanksPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visible) return;
    
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/banks/page/content/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load banks');
        const json = await res.json() as BanksPageData;
        setPageData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [visible]);

  const openLink = async (url: string) => {
    if (url && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:'))) {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>БАНКИ</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Загрузка...</Text>
            </View>
          ) : (
            pageData?.banks && pageData.banks.map((bank) => (
              <View key={bank.id} style={styles.card}>
                {/* Image */}
                {bank.image_url && (
                  <View style={styles.imageContainer}>
                    <Image 
                      source={{ uri: toImageUrl(bank.image_url) }}
                      style={styles.cardImage}
                      contentFit="cover"
                    />
                  </View>
                )}
                
                {/* Info Container */}
                <View style={styles.infoContainer}>
                  <Text style={styles.bankName}>{bank.name}</Text>
                  
                  {bank.working_hours && (
                    <View style={styles.infoBlock}>
                      <Text style={styles.infoLabel}>Режим работы:</Text>
                      <Text style={styles.infoValue}>{bank.working_hours}</Text>
                    </View>
                  )}
                  
                  <View style={styles.infoBlock}>
                    <Text style={styles.infoLabel}>Контакты:</Text>
                    <Text style={styles.infoValue}>{bank.contacts}</Text>
                  </View>
                  
                  <View style={styles.infoBlock}>
                    <Text style={styles.infoLabel}>Почта:</Text>
                    <TouchableOpacity onPress={() => openLink(`mailto:${bank.email}`)}>
                      <Text style={[styles.infoValue, styles.link]}>{bank.email}</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.infoBlock}>
                    <Text style={styles.infoLabel}>Адрес:</Text>
                    <Text style={styles.infoValue}>{bank.address}</Text>
                  </View>
                  
                  {bank.name_link && (
                    <View style={styles.infoBlock}>
                      <Text style={styles.infoLabel}>Сайт:</Text>
                      <TouchableOpacity onPress={() => openLink(bank.name_link)}>
                        <Text style={[styles.infoValue, styles.link]}>{bank.name_link}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    minHeight: 96,
    paddingTop: 44,
    paddingBottom: 10,
    paddingHorizontal: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  headerTitleWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  headerTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
    textTransform: 'uppercase',
    letterSpacing: 0.2,
    marginTop: 24,
  },
  scrollContent: {
    paddingBottom: 40,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  card: {
    flexDirection: 'column',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: '100%',
    height: 226,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(185, 185, 185, 0.85)',
    backgroundColor: '#fff',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flexDirection: 'column',
    padding: 20,
    gap: 10,
    backgroundColor: 'rgba(17, 41, 189, 0.1)',
    borderWidth: 1,
    borderColor: '#D5DAEF',
    borderRadius: 15,
  },
  bankName: {
    fontFamily: 'Inter',
    fontWeight: '800',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    color: '#1129BD',
    marginBottom: 10,
  },
  infoBlock: {
    flexDirection: 'column',
    gap: 3,
  },
  infoLabel: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17,
    color: '#1129BD',
  },
  infoValue: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    color: '#1129BD',
  },
  link: {
    textDecorationLine: 'underline',
  },
});
