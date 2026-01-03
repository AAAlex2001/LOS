import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Linking, Dimensions } from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons, AntDesign, Feather } from '@expo/vector-icons';
import config from '@/config';
import {useTranslation, addLangParam} from '@/i18n';

type SocialLink = {
  id: number;
  network: string;
  url: string;
  order: number;
};

type Footer = {
  id: number;
  description: string;
  contact_info: string;
  email: string;
  copyright_text: string;
  social_links: SocialLink[];
};

const { width: screenWidth } = Dimensions.get('window');
const API_BASE = config.API_BASE;

const getIconForNetwork = (network: string) => {
  switch (network) {
    case 'telegram':
      return <Feather name="send" size={24} color="#1129BD" />;
    case 'instagram':
      return <AntDesign name="instagram" size={24} color="#1129BD" />;
    case 'twitter':
      return <MaterialCommunityIcons name="alpha-x-circle-outline" size={24} color="#1129BD" />;
    case 'facebook':
      return <FontAwesome name="facebook" size={24} color="#1129BD" />;
    case 'youtube':
      return <FontAwesome name="youtube-play" size={24} color="#1129BD" />;
    case 'rutube':
      return <MaterialCommunityIcons name="alpha-r-box" size={24} color="#1129BD" />;
    default:
      return <Ionicons name="link-outline" size={24} color="#1129BD" />;
  }
};

const getLabelForNetwork = (network: string) => {
  switch (network) {
    case 'telegram':
      return 'Telegram';
    case 'instagram':
      return 'Instagram';
    case 'twitter':
      return 'X (Twitter)';
    case 'facebook':
      return 'Facebook';
    case 'youtube':
      return 'YouTube';
    case 'rutube':
      return 'Rutube';
    default:
      return network;
  }
};

export default function ContactsScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const { t } = useTranslation();
  const [footerData, setFooterData] = useState<Footer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visible) return;
    const load = async () => {
      try {
        const res = await fetch(addLangParam(`${API_BASE}/api/footer/footer/footer_data/`), { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load footer');
        const json = (await res.json()) as Footer;
        setFooterData(json);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [visible]);

  const socialLinks = (footerData?.social_links || []).slice().sort((a, b) => a.order - b.order);

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <Text style={styles.title}>{t('footer.contacts')}</Text>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={28} color="#1129BD" />
        </TouchableOpacity>
        <View style={styles.line} />
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>{t('common.loading')}</Text>
          </View>
        ) : (
          <View style={styles.list}>
            {socialLinks.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.item}
                onPress={() => Linking.openURL(item.url)}
                activeOpacity={0.7}
              >
                <View style={styles.icon}>{getIconForNetwork(item.network)}</View>
                <Text style={styles.label}>{getLabelForNetwork(item.network)}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.item}
              onPress={() => Linking.openURL('mailto:landofsoulweb@yandex.com')}
              activeOpacity={0.7}
            >
              <View style={styles.icon}>
                <Ionicons name="mail-outline" size={24} color="#1129BD" />
              </View>
              <Text style={[styles.label, styles.underline]}>landofsoulweb@yandex.com</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    paddingTop: 80,
    paddingHorizontal: 0,
  },
  title: {
    fontWeight: '700',
    fontSize: 24,
    color: '#0F0F0F',
    textTransform: 'uppercase',
    marginLeft: 20,
    marginBottom: 8,
  },
  backBtn: {
    position: 'absolute',
    right: 20,
    top: 80,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: 1,
    backgroundColor: '#E2E4E6',
    width: screenWidth - 40,
    marginLeft: 20,
    marginBottom: 16,
  },
  list: {
    width: '100%',
    marginTop: 8,
    paddingHorizontal: 0,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth - 40,
    height: 56,
    marginLeft: 20,
    marginBottom: 2,
    borderRadius: 16,
    // backgroundColor: '#F8F8F8',
  },
  icon: {
    width: 40,
    alignItems: 'center',
    marginRight: 16,
  },
  label: {
    fontSize: 16,
    color: '#1129BD',
    fontWeight: '500',
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
  underline: {
    textDecorationLine: 'underline',
  },
}); 