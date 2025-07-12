import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

const sections = [
  {
    title: 'Уважение к старшим — основа абхазской культуры',
    text: 'У абхазов, как и у других древних народов, во главе угла всегда стояло почтение к старшим. Это ценность, отличающая их от современной показной культуры. Стоит ребёнку войти в дом, как старец приподнимается или встаёт — ведь дети, по мнению старших, являются будущим человечества. Как мы поведём себя с ними, так и они будут поступать в будущем.'
  },
  {
    title: 'Гостеприимство — священный долг абхазов',
    text: 'Гостеприимство у абхазов считается священным долгом. Любой гость, переступивший порог дома, становится неприкосновенным. Хозяин обязан защищать его даже ценой собственной жизни. Абхазы говорят: «Гость — посланник Бога». Даже кровный враг, если он пришел как гость, находится под защитой хозяина дома. Отказать в гостеприимстве считается величайшим позором.'
  },
  {
    title: 'Апсуара — этический кодекс абхазов',
    text: 'Апсуара — это свод неписаных правил поведения, этических норм и моральных ценностей абхазского народа. Это понятие включает в себя уважение к старшим, почитание родственных связей, гостеприимство, скромность, мужество, честь и достоинство. Человек, не соблюдающий апсуара, не может считаться настоящим абхазом, независимо от происхождения.'
  },
  {
    title: 'Абхазское застолье — особый ритуал',
    text: 'Абхазское застолье — это не просто принятие пищи, а целый ритуал со своими правилами и традициями. Во главе стола сидит самый уважаемый старший мужчина — тамада. Он произносит тосты, следит за порядком и руководит застольем. Тосты произносятся по определенной системе: сначала за Всевышнего, затем за мир, за родину, за старших, за женщин, за детей и так далее. Пить без тоста считается неприличным.'
  },
  {
    title: 'Кровная месть и примирение',
    text: 'В прошлом у абхазов существовал обычай кровной мести, когда родственники убитого были обязаны отомстить убийце или его родственникам. Однако существовал и механизм примирения через посредников. Виновная сторона должна была выплатить компенсацию и публично покаяться. В современной Абхазии этот обычай практически исчез, но память о нем сохраняется в народном сознании.'
  },
  {
    title: 'Почитание очага и культ предков',
    text: 'Домашний очаг у абхазов считается священным. Он символизирует непрерывность рода и связь с предками. Клятва у очага считается нерушимой. Абхазы верят, что души умерших предков продолжают жить рядом с живыми и помогают им. Поэтому в важные моменты жизни принято обращаться к предкам за помощью и советом.'
  },
  {
    title: 'Свадебные обряды',
    text: 'Традиционная абхазская свадьба — это сложный комплекс обрядов, начинающийся со сватовства и заканчивающийся введением невесты в дом жениха. Важную роль играют посредники, которые ведут переговоры между семьями. Невеста должна проявлять скромность и сдержанность. После свадьбы она не имеет права разговаривать со свекром и старшими родственниками мужа, пока не получит специальное разрешение.'
  },
  {
    title: 'Воспитание детей',
    text: 'Воспитанию детей в абхазской культуре уделяется особое внимание. Мальчиков с раннего возраста учат быть мужественными, сдержанными, уважать старших. Девочек воспитывают в духе скромности, трудолюбия и почтения к мужчине. Детей никогда не хвалят в присутствии посторонних, чтобы не сглазить и не вызвать гордыню. Физические наказания применяются редко, предпочтение отдается воспитанию на личном примере.'
  },
  {
    title: 'Обычаи, связанные с рождением ребенка',
    text: 'Рождение ребенка в абхазской семье — большая радость, особенно если рождается мальчик, продолжатель рода. Существует обычай «аныхвара» — посвящение новорожденного покровителю рода. Пуповину мальчика закапывают во дворе дома, чтобы он всегда возвращался домой, а девочки — под порогом, чтобы она была хорошей хозяйкой. До года ребенка стараются не показывать посторонним, чтобы защитить от сглаза.'
  },
  {
    title: 'Похоронные обряды',
    text: 'Похоронные обряды абхазов отражают их представления о загробной жизни. Умершего хоронят на третий день. Все это время рядом с телом находятся родственники и соседи, которые выражают соболезнования семье. Мужчины и женщины сидят отдельно. Поминки проводятся на 9-й и 40-й день, а затем ежегодно. На могилу приносят еду и питье, считается, что душа умершего может прийти и отведать угощение.'
  },
  {
    title: 'Обычай избегания',
    text: 'Обычай избегания (аламыс) предписывал определенные ограничения в общении между родственниками. Невестка не должна была разговаривать со свекром и старшими родственниками мужа, муж не мог публично проявлять внимание к жене и детям. Молодые люди не имели права сидеть в присутствии старших. Эти правила были направлены на поддержание уважения и субординации внутри семьи.'
  },
  {
    title: 'Аталычество — обычай воспитания детей в чужой семье',
    text: 'Аталычество — обычай, при котором детей из знатных семей отдавали на воспитание в другие семьи. Считалось, что это способствует укреплению связей между родами и формированию у ребенка необходимых навыков и качеств. Воспитатель (аталык) нес полную ответственность за ребенка и обучал его всему, что должен знать и уметь абхаз. По достижении совершеннолетия воспитанник возвращался в родную семью.'
  },
  {
    title: 'Народные собрания и суды',
    text: 'Важные решения в абхазских общинах принимались на народных собраниях (схода), где каждый взрослый мужчина имел право голоса. Споры решались с помощью народных судей (медиаторов), которые выбирались из числа наиболее уважаемых старейшин. Их решения были обязательны для исполнения. Такая система обеспечивала справедливость и поддержание порядка в обществе без централизованной власти.'
  },
];

export default function AbkhazianCustomsScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>АБХАЗСКИЕ ОБЫЧАИ</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Основное изображение */}
          <Image source={require('../../assets/images/obuzhai.jpg')} style={styles.heroImage} resizeMode="cover" />
          {/* Баннер-интро */}
          <View style={styles.bannerImgWrap}>
            <Image source={require('../../assets/images/IMG_1932.jpg')} style={styles.bannerImg} resizeMode="cover" />
            <View style={styles.bannerOverlayAbs}>
              <Text style={styles.bannerText}>
                Откройте для себя душу Абхазии через её традиции.{"\n\n"}
                Здесь гость — посланник небес, уважение к старшим — закон, а застолье превращается в ритуал. Узнайте, что такое Апсуара, как абхазы встречают путника и почему обычаи здесь — не просто история, а часть живой культуры.
              </Text>
            </View>
          </View>
          {sections.map((section, idx) => (
            <View key={idx} style={styles.textBlock}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionText}>{section.text}</Text>
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
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  scrollContent: {
    paddingBottom: 40,
    alignItems: 'center',
    paddingTop: 0,
  },
  heroImage: {
    width: screenWidth - 40,
    height: screenWidth - 40,
    maxWidth: 680,
    maxHeight: 680,
    borderRadius: 15,
    marginTop: 24,
    marginBottom: 40,
    alignSelf: 'center',
  },
  textBlock: {
    width: screenWidth - 40,
    maxWidth: 920,
    alignSelf: 'center',
    marginBottom: 40,
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
  bannerBox: {
    width: screenWidth - 40,
    maxWidth: 350,
    minHeight: 112,
    alignSelf: 'center',
    marginBottom: 32,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.85)',
    overflow: 'hidden',
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -8,
    // Фоновое изображение через ImageBackground не используем, только цвет и прозрачность
  },
  bannerBg: {
    width: screenWidth - 40,
    maxWidth: 350,
    minHeight: 112,
    alignSelf: 'center',
    marginBottom: 32,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: -8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerBgImg: {
    borderRadius: 15,
    resizeMode: 'cover',
  },
  bannerOverlay: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  bannerText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    color: 'rgba(0,0,0,0.85)',
    textAlign: 'center',
  },
  bannerImgWrap: {
    width: screenWidth - 40,
    height: 144,
    alignSelf: 'center',
    marginBottom: 32,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: -8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bannerImg: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  bannerOverlayAbs: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
}); 