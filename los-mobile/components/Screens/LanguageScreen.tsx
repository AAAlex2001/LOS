import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation, changeLanguage } from '@/i18n';

const languages = [
  { label: 'language.russian', code: 'ru' },
  { label: 'language.english', code: 'en' },
];

const { width: screenWidth } = Dimensions.get('window');

export default function LanguageScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const { t } = useTranslation();

  const handleLanguageChange = async (code: string) => {
    await changeLanguage(code);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <Text style={styles.title}>{t('language.choose_language')}</Text>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={28} color="#1129BD" />
        </TouchableOpacity>
        <View style={styles.line} />
        <View style={styles.langList}>
          {languages.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.langBtn}
              onPress={() => handleLanguageChange(item.code)}
            >
              <Text style={styles.langLabel}>{t(item.label)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    position: 'relative',
  },
  title: {
    position: 'absolute',
    top: 80,
    left: 20,
    fontWeight: '700',
    fontSize: 24,
    color: '#0F0F0F',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  backBtn: {
    position: 'absolute',
    right: 20,
    top: 76,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    position: 'absolute',
    top: 118,
    left: 0,
    width: screenWidth - 20,
    height: 1,
    backgroundColor: '#E2E4E6',
    marginLeft: 10,
  },
  langList: {
    marginTop: 130,
    marginLeft: 0,
  },
  langBtn: {
    height: 56,
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: '#fff',
  },
  langLabel: {
    fontWeight: '500',
    fontSize: 16,
    color: '#1129BD',
  },
}); 