import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

const sections = [
  {
    title: 'Президент',
    text: 'Президент Республики Абхазия является главой государства. Он определяет основные направления внутренней и внешней политики, является главнокомандующим Вооружённых Сил Республики Абхазия. Президент Республики избирается гражданами Республики Абхазия на пятилетний срок.'
  },
  {
    title: 'Законодательная власть',
    text: 'Все законодательные полномочия, установленные настоящей Конституцией, осуществляются Народным Собранием — Парламентом Республики Абхазия. Парламент Республики Абхазия состоит из 35 депутатов. Выборы в Парламент осуществляются на основе всеобщего, равного и прямого избирательного права, посредством тайного голосования. Срок полномочий Парламента пять лет.'
  },
  {
    title: 'Исполнительная власть',
    text: 'Исполнительная власть в Республике Абхазия предоставляется Президенту Республики Абхазия. Для осуществления общего руководства исполнительной деятельностью на всей территории страны Президент Республики Абхазия руководит Кабинетом Министров Республики Абхазия. Кабинет Министров формируется Президентом Республики Абхазия и подотчетен ему. В состав Кабинета Министров входят премьер-министр, Вице-премьеры, министры, другие должностные лица, предусмотренные законом.'
  },
  {
    title: 'Судебная власть',
    text: 'Правосудие в Республике Абхазия осуществляется только судом. Хозяйственные споры разрешает Арбитражный суд. Председатель и члены Верховного Суда Республики Абхазия, судьи нижестоящих судов, Председатель и судьи Арбитражного суда Республики Абхазия назначаются Парламентом Республики Абхазия по представлению Президента Республики Абхазия. Прокуратура является органом, осуществляющим надзор за точным и единообразным исполнением законов независимо от каких бы то ни было органов власти.'
  },
  {
    title: 'Герб',
    text: 'Государственный герб Республики Абхазия представляет собой щит, по вертикали разделенный на две равные части — одна белого, и вторая зелёного цвета. Контур герба и сюжетной композиции — золотистого цвета. В нижней части герба расположена восьмиконечная золотистая абхазская звезда. В верхней части, на белом и зелёном фоне, симметрично расположены две восьмиконечные звезды золотого цвета. В центре герба — фигура всадника, летящего на волшебном коне Араше и посылающего стрелу к звёздам. Сюжет герба связан с героическим Нартским эпосом абхазов. Зелёный цвет герба символизирует молодость и жизнь, белый — духовность. Большая восьмиконечная звезда — солярный знак возрождения. Малые звёзды символизируют единение двух культурных миров — Востока и Запада.'
  },
  {
    title: 'Флаг',
    text: 'Государственный флаг Республики Абхазия является официальным государственным символом Республики Абхазия. Представляет собой прямоугольное полотнище. По его длине расположены семь чередующихся равных по ширине полос зелёного и белого цветов, из них четыре зелёных и три белых. Полосы начинаются с верхнего ряда, первая полоса зелёного цвета. В верхнем углу у древка флага расположен прямоугольник пурпурного цвета размером 0,38 длины флага и шириной в три полосы. В центре пурпурного прямоугольника вертикально расположена открытая ладонь правой руки белого цвета. Над ладонью полукругом расположены семь пятиконечных звёзд белого цвета. Отношение длины флага к его ширине.'
  },
];

export default function GovernmentStructureScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>ГОСУДАРСТВЕННОЕ УСТРОЙСТВО</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>
        <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: 20 }]} showsVerticalScrollIndicator={false}>
          {/* Карта */}
          <Image source={require('../../assets/images/karta.jpg')} style={styles.mapImage} resizeMode="contain" />
          {/* Сплошной текст */}
          <View style={styles.textBlock}>
            <Text style={styles.sectionTitle}>{sections[0].title}</Text>
            <Text style={styles.sectionText}>{sections[0].text}</Text>
            <Text style={styles.sectionTitle}>{sections[1].title}</Text>
            <Text style={styles.sectionText}>{sections[1].text}</Text>
            <Text style={styles.sectionTitle}>{sections[2].title}</Text>
            <Text style={styles.sectionText}>{sections[2].text}</Text>
            <Text style={styles.sectionTitle}>{sections[3].title}</Text>
            <Text style={styles.sectionText}>{sections[3].text}</Text>
            <Image source={require('../../assets/images/gerb.png')} style={styles.gerbImage} resizeMode="contain" />
            <Text style={styles.sectionTitle}>{sections[4].title}</Text>
            <Text style={styles.sectionText}>{sections[4].text}</Text>
            <Image source={require('../../assets/images/flag.jpg')} style={styles.flagImage} resizeMode="contain" />
            <Text style={styles.sectionTitle}>{sections[5].title}</Text>
            <Text style={styles.sectionText}>{sections[5].text}</Text>
          </View>
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
    height: 110,
    paddingTop: 50,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E4E6',
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  headerTitleWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 18,
    color: '#000',
    textTransform: 'uppercase',
    letterSpacing: 0.2,
    marginTop: 30,
    marginLeft: 0,
  },
  scrollContent: {
    paddingBottom: 40,
    alignItems: 'center',
    paddingTop: 0,
  },
  mapImage: {
    width: screenWidth - 40,
    height: ((screenWidth - 40) * 272) / 350.4,
    borderRadius: 12,
    marginBottom: 32,
  },
  textBlock: {
    width: screenWidth - 40,
    alignItems: 'flex-start',
    paddingTop: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 22,
    color: '#1129BD',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  sectionText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 18,
    color: '#000',
    lineHeight: 24,
    marginBottom: 8,
  },
  gerbImage: {
    width: 120,
    height: 149,
    alignSelf: 'center',
    marginVertical: 24,
  },
  flagImage: {
    width: 280,
    height: 187,
    alignSelf: 'center',
    marginVertical: 24,
  },
}); 