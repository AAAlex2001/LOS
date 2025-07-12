import React, { useRef, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

const sections = [
  {
    title: 'Древняя Абхазия',
    text: 'Первые поселения в Абхазии появились 35 тысяч лет назад в эпоху позднего палеолита. В мезолите (XII–VII тыс. до н.э.) люди жили в пещерах, занимались рыболовством и собирательством. В неолите (VI–IV тыс. до н.э.) началась обработка земли, приручение животных и производство глиняной посуды. В IV–III тыс. до н.э. освоили металлургию, а в III–II тыс. до н.э. возникла дольменная культура с каменными гробницами, особенно в районе села Отхара.'
  },
  {
    title: 'Первые города и греческая колонизация',
    text: 'В VIII веке до н.э. греческие мореходы основали на черноморском побережье города: Диоскурию (Сухум), Питиунт (Пицунда), Гюэнос (Очамчыра). Эти города стали центрами ремёсел и торговли. Диоскуриада, называвшаяся местными Агуа, в IV–III вв. до н.э. объединила греков и местное население. В I веке н.э. римляне переименовали Диоскуриаду в Себастополис, начав римско-византийский период.'
  },
  {
    title: 'Раннее христианство',
    text: 'В 55 году н.э. апостолы Симон Кананит и Андрей Первозванный принесли христианство в Абхазию. К III–IV векам в Питиунте сформировалась древнейшая христианская община Кавказа. В VI веке Абхазия вошла в состав Византийской империи, где началось развитие феодальных отношений и укрепление христианства. В VII веке построена Анакопийская крепость.'
  },
  {
    title: 'Анакопийское сражение',
    text: 'В 738 году арабы под предводительством Мервана Кру осадили Анакопию. Абхазы и картлийцы, укрывшиеся в крепости, выдержали осаду благодаря мощным укреплениям и эпидемии, поразившей арабское войско. Мерван отступил, не сумев захватить крепость.'
  },
  {
    title: 'Абхазское царство',
    text: 'В конце VIII века сформировалось Абхазское царство, простиравшееся от Туапсе до Сурамского перевала. Леон II провозгласил себя царём, перенеся столицу в Кутаис. Царство процветало 200 лет, развивая экономику и культуру, но пришло в упадок после смерти Феодосия Слепого.'
  },
  {
    title: 'Российское покровительство',
    text: 'В начале XIX века Абхазия вошла под покровительство России. В 1810 году князь Сефербей признал верховенство Российской империи. После Кавказской войны (1864) Абхазское княжество было упразднено, а регион стал Сухумским округом. В 1877–1878 годах махаджирство привело к массовому оттоку абхазов, изменив этнический состав региона.'
  },
  {
    title: 'Советский период',
    text: 'В 1921 году Абхазия стала Советской Социалистической Республикой, но в 1931 году была преобразована в автономную республику в составе Грузинской ССР. В 1930-е годы началась ассимиляция и переселение грузин в Абхазию. Несмотря на репрессии, Абхазия развивалась как курортный регион. В годы Великой Отечественной войны абхазы героически сражались, 22 человека получили звание Героя Советского Союза.'
  },
  {
    title: 'Борьба и независимость',
    text: 'В конце 1980-х годов Абхазия стремилась к повышению статуса. В 1992 году Грузия начала войну против Абхазии, но 30 сентября 1993 года Абхазия освободила свою территорию. В 1994 году принята Конституция, провозгласившая Абхазию суверенным государством. В 1999 году референдум подтвердил независимость.'
  },
  {
    title: 'Современная Абхазия',
    text: 'В 2008 году Россия признала независимость Абхазии, за ней последовали Никарагуа, Венесуэла, Науру и Сирия. В 2014 году подписан Договор о союзничестве с Россией, укрепивший экономические и оборонные связи. Сегодня Абхазия развивается как суверенное государство, сохраняя культурное и экономическое сотрудничество с Россией.'
  },
  // Культура
  {
    title: 'Основы культуры',
    text: 'Абхазы, коренные жители Абхазии, создали уникальную культуру, обусловленную мягким климатом и богатой природой. Основные занятия — земледелие, скотоводство, охота, рыболовство и ремесла. Военные навыки и оружейное искусство развивались для защиты от врагов. В основе абхазской идентичности лежит этический кодекс «апсуара» — свод обычаев, ценностей и национального самосознания.'
  },
  {
    title: 'Язык и литература',
    text: 'Абхазский язык, государственный в Республике Абхазия, относится к абхазо-адыгской группе. В XIX веке П.К. Услар создал грамматику и алфавит на основе русской графики. Основоположник абхазской литературы — Д.И. Гулиа, автор первой поэмы 1913 года. В советский период язык обогатился диалектами и заимствованиями, сформировав стили: деловой, научный, художественный. Устное творчество и работы писателей, таких как Самсон Чанба, Баграт Шинкуба и Алексей Гогуа, сыграли ключевую роль.'
  },
  {
    title: 'Фольклор и эпос',
    text: 'Абхазский фольклор богат песнями, танцами, мифами и преданиями. Народные песни сочетают мелодию и речитатив, включая древние языческие, трудовые и магические мотивы. Характерно многоголосие, где запевале вторят низкие голоса. Женские песни ограничиваются колыбельными и причитаниями. Нартский эпос, особенно сказания о ста братьях и Сатаней-Гуаше, и мифы об Абраскиле, герое-богоборце, составляют основу эпического наследия.'
  },
  {
    title: 'Музыка и Танцы',
    text: 'Музыкальные инструенты абхазов включают струнные (апхярца, аюмаа), духовые (ачарпын, абыкь) и ударные (адаул, трещотки). Народные танцы — популярный вид искусства, включающий фольклорные, обрядовые и кавказские танцы. Профессиональные ансамбли и детские студии сохраняют традиции.'
  },
  {
    title: 'Одежда и традиции',
    text: 'Абхазская одежда делится на будничную, праздничную и ритуальную. Мужская черкеска с буркой, башлыком и чувяками подчёркивает статус всадника. Женская одежда включает платье, кафтанчик, пояс и шапку, часто украшенные искусной вышивкой. Посох алабаша — символ опоры и ораторского мастерства.'
  },
];

const images = [
  { src: require('../../assets/images/abhazy1.jpg'), style: { width: screenWidth - 40, height: ((screenWidth - 40) * 796) / 1000, borderRadius: 15, marginBottom: 32 } },
  { src: require('../../assets/images/abhazy2.jpg'), style: { width: screenWidth - 40, height: ((screenWidth - 40) * 798) / 1000, borderRadius: 15, marginBottom: 32 } },
  { src: require('../../assets/images/abhazy3.jpg'), style: { width: screenWidth - 40, height: ((screenWidth - 40) * 709) / 1000, borderRadius: 15, marginBottom: 32 } },
  { src: require('../../assets/images/abhazy4.jpg'), style: { width: screenWidth - 40, height: ((screenWidth - 40) * 521) / 1000, borderRadius: 15, marginBottom: 32 } },
  { src: require('../../assets/images/abhazy5.jpg'), style: { width: screenWidth - 40, height: ((screenWidth - 40) * 564) / 1000, borderRadius: 15, marginBottom: 32 } },
];

export default function HistoryAndCultureScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const scrollRef = useRef<ScrollView>(null);
  const [sectionPositions, setSectionPositions] = useState<{history: number, culture: number}>({history: 0, culture: 0});

  const handleLayout = (key: 'history' | 'culture', event: any) => {
    event.persist && event.persist();
    setSectionPositions(pos => ({ ...pos, [key]: event.nativeEvent.layout.y }));
  };

  const scrollToSection = (key: 'history' | 'culture') => {
    if (scrollRef.current && sectionPositions[key] !== undefined) {
      scrollRef.current.scrollTo({ y: sectionPositions[key], animated: true });
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
            <Text style={styles.headerTitle}>ИСТОРИЯ И КУЛЬТУРА АБХАЗИИ</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={styles.tabItem} onPress={() => scrollToSection('history')}>
            <Text style={styles.tabText}>История Абхазии</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => scrollToSection('culture')}>
            <Text style={styles.tabText}>Культура Абхазии</Text>
          </TouchableOpacity>
        </View>
        <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* История */}
          <View onLayout={e => handleLayout('history', e)}>
            <Text style={styles.contentTitle}>История Абхазии</Text>
          </View>
          <Image source={images[0].src} style={images[0].style} resizeMode="cover" />
          {sections.slice(0, 3).map((sec, idx) => (
            <View key={sec.title} style={styles.textBlock}>
              <Text style={styles.sectionTitle}>{sec.title}</Text>
              <Text style={styles.sectionText}>{sec.text}</Text>
            </View>
          ))}
          <Image source={images[1].src} style={images[1].style} resizeMode="cover" />
          {sections.slice(3, 6).map((sec, idx) => (
            <View key={sec.title} style={styles.textBlock}>
              <Text style={styles.sectionTitle}>{sec.title}</Text>
              <Text style={styles.sectionText}>{sec.text}</Text>
            </View>
          ))}
          <Image source={images[2].src} style={images[2].style} resizeMode="cover" />
          {sections.slice(6, 9).map((sec, idx) => (
            <View key={sec.title} style={styles.textBlock}>
              <Text style={styles.sectionTitle}>{sec.title}</Text>
              <Text style={styles.sectionText}>{sec.text}</Text>
            </View>
          ))}
          {/* Культура */}
          <View onLayout={e => handleLayout('culture', e)}>
            <Text style={[styles.contentTitle, styles.spacedTitle]}>Культура Абхазии</Text>
          </View>
          <Image source={images[3].src} style={images[3].style} resizeMode="cover" />
          {sections.slice(9, 12).map((sec, idx) => (
            <View key={sec.title} style={styles.textBlock}>
              <Text style={styles.sectionTitle}>{sec.title}</Text>
              <Text style={styles.sectionText}>{sec.text}</Text>
            </View>
          ))}
          <Image source={images[4].src} style={images[4].style} resizeMode="cover" />
          {sections.slice(12).map((sec, idx) => (
            <View key={sec.title} style={styles.textBlock}>
              <Text style={styles.sectionTitle}>{sec.title}</Text>
              <Text style={styles.sectionText}>{sec.text}</Text>
            </View>
          ))}
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
  mainTitle: {
    fontFamily: 'Inter',
    fontWeight: '800',
    fontSize: 28,
    lineHeight: 34,
    textAlign: 'center',
    color: '#1129BD',
    marginBottom: 40,
    marginTop: 10,
  },
  contentTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 28,
    textAlign: 'center',
    color: '#1129BD',
    marginBottom: 40,
  },
  spacedTitle: {
    marginTop: 60,
  },
  textBlock: {
    width: screenWidth - 40,
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 22,
    color: '#1129BD',
    marginBottom: 16,
  },
  sectionText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 18,
    color: '#000',
    lineHeight: 24,
    marginBottom: 0,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    marginBottom: 24,
    marginTop: 8,
  },
  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginHorizontal: 8,
  },
  tabText: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
  },
}); 