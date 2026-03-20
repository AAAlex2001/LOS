import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from '@/i18n';

export default function EmptyState({ message }: { message?: string }) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message || t('common.no_info')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    borderRadius: 15,
    padding: 40,
    marginHorizontal: 20,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontWeight: '500',
  },
});
