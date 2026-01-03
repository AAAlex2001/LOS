import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import config from '@/config';
import {useTranslation, addLangParam} from '@/i18n';

const { width: screenWidth } = Dimensions.get('window');

interface WordPair {
  id: number;
  russian: string;
  abkhazian: string;
  order: number;
}

interface DictionaryCategory {
  id: number;
  title: string;
  split_two_columns: boolean;
  order: number;
  words: WordPair[];
}

interface ElementaryDictionaryPageData {
  categories: DictionaryCategory[];
}

const API_BASE = config.API_BASE;

const getColumns = (list: WordPair[]): WordPair[][] => {
  // All dictionaries in one column
  return [list];
};

export default function ElementaryDictionaryScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const { t } = useTranslation();
  const [pageData, setPageData] = useState<ElementaryDictionaryPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visible) return;
    
    const load = async () => {
      try {
        const res = await fetch(addLangParam(`${API_BASE}/api/elementary-dictionary/page/content/`), { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load dictionary');
        const json = await res.json() as ElementaryDictionaryPageData;
        setPageData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [visible]);

  const renderTable = (items: WordPair[]) => (
    <View style={styles.dictionaryTable}>
      <View style={styles.row}>
        <Text style={styles.cellHeader}>{t('language.in_russian')}</Text>
        <Text style={styles.cellHeader}>{t('language.in_abkhazian')}</Text>
      </View>
      {/* Center vertical divider across entire card */}
      <View pointerEvents="none" style={styles.verticalDividerAbs} />
      {items.map((w, idx) => (
        <View key={`${w.id}-${idx}`} style={styles.row}>
          <Text style={styles.cell}>{w.russian}</Text>
          <Text style={styles.cell}>{w.abkhazian}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent={false} presentationStyle="fullScreen" statusBarTranslucent>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>{t('about.dictionary')}</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>{t('common.loading')}</Text>
                </View>
          ) : (
            pageData?.categories && pageData.categories.map((category) => {
              const words = category.words || [];
              const columns = getColumns(words);
              
              return (
                <View key={category.id} style={styles.sectionBlock}>
                  <Text style={styles.sectionTitle}>
                    {`${category.title} (${words.length} ${words.length === 1 ? t('dictionary.word_one') : words.length < 5 ? t('dictionary.word_few') : t('dictionary.word_many')})`}
                  </Text>
                  {renderTable(words)}
                  </View>
              );
            })
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
    borderRadius: 16,
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
    marginLeft: 0,
  },
  scrollContent: {
    paddingBottom: 40,
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  sectionBlock: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 20,
    color: '#1129BD',
    marginBottom: 16,
    textAlign: 'center',
  },
  tablesRow: {
    flexDirection: 'row',
    gap: 10,
  },
  tableContainer: {
    flex: 1,
  },
  dictionaryTable: {
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E2E4E6',
    borderRadius: 8,
    overflow: 'hidden',
  },
  verticalDividerAbs: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    left: '50%',
    transform: [{ translateX: -0.5 }],
    backgroundColor: '#E2E4E6',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E4E6',
  },
  cellHeader: {
    flex: 1,
    padding: 12,
    fontWeight: '700',
    fontSize: 14,
    color: '#fff',
    backgroundColor: '#0A1977',
    textAlign: 'left',
  },
  cell: {
    flex: 1,
    padding: 12,
    fontSize: 14,
    color: '#000',
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
}); 
