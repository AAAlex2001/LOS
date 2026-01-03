import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import config from '@/config';
import { parseContactString } from './phoneUtils';
import {useTranslation, addLangParam} from '@/i18n';

interface Provider {
  id: number;
  name: string;
  description: string;
  website_url: string;
  logo_image: string;
  order: number;
}

interface MobileCommunicationPageData {
  main_title: string;
  intro_text: string;
  background_image: string;
  mobile_section_title: string;
  internet_section_title: string;
  mobile_providers: Provider[];
  internet_providers: Provider[];
}

const API_BASE = config.API_BASE;

const toImageUrl = (url: string) => {
  if (!url) return undefined;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_BASE}/media/${url}`;
};

export default function MobileCommunicationScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const { t } = useTranslation();
  const [pageData, setPageData] = useState<MobileCommunicationPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visible) return;
    
    const load = async () => {
      try {
        const res = await fetch(addLangParam(`${API_BASE}/api/mobile-communication/page/content/`), { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load mobile communication');
        const json = await res.json() as MobileCommunicationPageData;
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
    if (url && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('tel:') || url.startsWith('mailto:'))) {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false} presentationStyle="fullScreen" statusBarTranslucent>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>МОБИЛЬНАЯ СВЯЗЬ</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>{t('common.loading')}</Text>
            </View>
          ) : (
            <>
              {/* Banner */}
              {pageData?.background_image && pageData.intro_text && (
                <View style={styles.bannerContainer}>
                  <ImageBackground
                    source={{ uri: toImageUrl(pageData.background_image) }}
                    style={styles.banner}
                    imageStyle={styles.bannerImage}
                  >
                    <Text style={styles.bannerText}>{pageData.intro_text}</Text>
                  </ImageBackground>
                </View>
              )}

              {/* Mobile Providers Section */}
              {pageData?.mobile_providers && pageData.mobile_providers.length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>{pageData.mobile_section_title || t('plan_trip.mobile')}</Text>
                  
                  {pageData.mobile_providers.map((provider) => (
                    <View key={provider.id} style={styles.card}>
                      {/* Logo */}
                      {provider.logo_image && (
                        <Image 
                          source={{ uri: toImageUrl(provider.logo_image) }}
                          style={styles.logo}
                          contentFit="contain"
                        />
                      )}
                      
                      {/* Info */}
                      <View style={styles.cardBody}>
                        {provider.description && (
                          <Text style={styles.description}>
                            {parseContactString(provider.description).map((segment, index) => {
                              if (segment.type === 'phone' || segment.type === 'email') {
                                return (
                                  <Text
                                    key={index}
                                    style={[styles.description, styles.underline]}
                                    onPress={() => segment.url && openLink(segment.url)}
                                  >
                                    {segment.value}
                                  </Text>
                                );
                              }
                              return <Text key={index}>{segment.value}</Text>;
                            })}
                          </Text>
                        )}
                        
                        {provider.website_url && (
                          <TouchableOpacity onPress={() => openLink(provider.website_url)}>
                            <Text style={styles.websiteLink}>САЙТ: {provider.website_url}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
                </>
              )}

              {/* Internet Providers Section */}
              {pageData?.internet_providers && pageData.internet_providers.length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>{pageData.internet_section_title || t('plan_trip.internet')}</Text>
                  
                  {pageData.internet_providers.map((provider) => (
                    <View key={provider.id} style={styles.card}>
                      {/* Logo */}
                      {provider.logo_image && (
                        <Image 
                          source={{ uri: toImageUrl(provider.logo_image) }}
                          style={styles.logo}
                          contentFit="contain"
                        />
                      )}
                      
                      {/* Info */}
                      <View style={styles.cardBody}>
                        {provider.description && (
                          <Text style={styles.description}>
                            {parseContactString(provider.description).map((segment, index) => {
                              if (segment.type === 'phone' || segment.type === 'email') {
                                return (
                                  <Text
                                    key={index}
                                    style={[styles.description, styles.underline]}
                                    onPress={() => segment.url && openLink(segment.url)}
                                  >
                                    {segment.value}
                                  </Text>
                                );
                              }
                              return <Text key={index}>{segment.value}</Text>;
                            })}
                          </Text>
                        )}
                        
                        {provider.website_url && (
                          <TouchableOpacity onPress={() => openLink(provider.website_url)}>
                            <Text style={styles.websiteLink}>САЙТ: {provider.website_url}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
                </>
              )}
            </>
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
    padding: 20,
    paddingBottom: 40,
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
  bannerContainer: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    width: '100%',
  },
  banner: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 83,
  },
  bannerImage: {
    borderRadius: 15,
    width: '100%'
  },
  bannerText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.85)',
    flexShrink: 1,
    padding: 15,
  },
  sectionTitle: {
    fontFamily: 'Inter',
    fontWeight: '800',
    fontSize: 18,
    color: '#1129BD',
    marginTop: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 20,
    backgroundColor: 'rgba(17, 41, 189, 0.1)',
    borderWidth: 1,
    borderColor: '#D5DAEF',
    borderRadius: 15,
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 50,
  },
  cardBody: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
    width: '100%',
  },
  description: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    color: '#1129BD',
  },
  websiteLink: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#1129BD',
  },
  underline: {
    textDecorationLine: 'underline',
  },
});

