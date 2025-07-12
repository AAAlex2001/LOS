import { Image } from 'expo-image';
import { StyleSheet, ScrollView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.headerImage}
        />
        <ThemedView style={styles.headerOverlay}>
          <ThemedText type="title" style={styles.headerTitle}>Абхазия</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Путеводитель по стране души</ThemedText>
        </ThemedView>
      </ThemedView>
      
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">О стране</ThemedText>
        <ThemedText style={styles.paragraph}>
          Абхазия - страна с богатой историей и культурой, расположенная на побережье Черного моря. 
          Известна своими горными пейзажами, пляжами и гостеприимством местных жителей.
        </ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Популярные места</ThemedText>
        
        <ThemedView style={styles.card}>
          <ThemedText type="defaultSemiBold">Сухум</ThemedText>
          <ThemedText>Столица Абхазии с красивой набережной и историческим центром.</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.card}>
          <ThemedText type="defaultSemiBold">Новый Афон</ThemedText>
          <ThemedText>Известен своим монастырем и живописной пещерой.</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.card}>
          <ThemedText type="defaultSemiBold">Гагра</ThemedText>
          <ThemedText>Популярный курорт с прекрасными пляжами и колоритной архитектурой.</ThemedText>
        </ThemedView>
      </ThemedView>
      
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Что посмотреть</ThemedText>
        <ThemedText style={styles.paragraph}>
          В нашем приложении вы найдете информацию о городах, пляжах, ресторанах, 
          достопримечательностях и многом другом. Переключайтесь между разделами, 
          чтобы узнать больше о прекрасной Абхазии.
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 200,
    position: 'relative',
    marginBottom: 16,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 28,
  },
  headerSubtitle: {
    color: '#ffffff',
    fontSize: 16,
  },
  section: {
    padding: 16,
    marginBottom: 16,
  },
  paragraph: {
    marginTop: 8,
    lineHeight: 22,
  },
  card: {
    padding: 16,
    marginTop: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(161, 206, 220, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(161, 206, 220, 0.3)',
  }
});
