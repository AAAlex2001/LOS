import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

const sections = [
  {
    title: 'УНИКАЛЬНОСТЬ АБХАЗСКИХ\nБЛЮД',
    text: 'Абхазская кухня славится блюдами, такими как абыста, акуд, ачашь и другими, которые отличаются неповторимым вкусом благодаря традиционным специям. Это не просто еда, а часть древней культуры застолья, где важны место, время и компания.',
  },
  {
    title: 'ЦЕРЕМОНИАЛ ЗАСТОЛЬЯ',
    text: 'В Абхазии застолье — это ритуал. Очерёдность подачи блюд и тостов имеет глубокое значение. Абхазская трапеза — это история, связанная с традициями и гостеприимством, а не просто набор рецептов.',
  },
  {
    title: 'АПАЦХА: СЕРДЦЕ АБХАЗСКОЙ\nКУХНИ',
    text: 'Апацха — традиционный ресторан в виде деревянных домиков с очагом. Здесь подают мамалыгу, сыр, зелень, соленья и акуд без меню — это основа современной абхазской кухни. Блюда готовят на открытом огне, сохраняя местный колорит.',
  },
  {
    title: 'Основные блюда: мамалыга, мясо, фасоль',
    text: 'Мамалыга — кукурузная каша, мясо и фасоль составляют основу кухни. Зимой блюда раскрываются по‑особенному: копчёное мясо, поджаренное на огне, и мамалыга с тающим сыром создают уникальный вкус.',
  },
  {
    title: 'Натуральность продуктов',
    text: 'Абхазская кухня использует только натуральные ингредиенты. Сыр для мамалыги должен быть домашним, чтобы выделялся жир, а акуд из фасоли подаётся с аджикой. Соленья и ачашь (хачапур) с обильным сыром дополняют трапезу.',
  },
  {
    title: 'Мясные традиции',
    text: 'Копчёное или жареное мясо, особенно козлятина, и курица по‑абхазски с аджикой — неотъемлемая часть стола. Вино или чача сопровождают застолье, но в меру, сохраняя атмосферу душевности.',
  },
  {
    title: 'Утро после застолья',
    text: 'На утро после обильной трапезы спасает асыдзбал — подлива из зеленой алычи. Она восстанавливает баланс витаминов и помогает справиться с похмельем, подаваясь к любому столу.',
  },
  {
    title: 'Настоящее гостеприимство',
    text: 'Истинная абхазская кухня раскрывается в деревенских апацхах или в гостях у местных жителей, где нет коммерции. Здесь можно почувствовать подлинный вкус жизни по‑абхазски, не зависящий от денег.',
  },
];

export default function AbkhazianCuizineScreen({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>АБХАЗСКАЯ КУХНЯ</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Image source={require('../../assets/images/abhazskayaKuhnya.jpg')} style={styles.heroImage} resizeMode="cover" />
          {sections.map((section, idx) => (
            <View key={idx} style={styles.textBlock}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionText}>{section.text}</Text>
            </View>
          ))}
          <View style={styles.textBlock}>
            <Text style={styles.sectionTitleBlue}>ОСНОВНЫЕ БЛЮДА И ИХ ОСОБЕННОСТИ</Text>
            <View style={styles.dishList}>
              <Text style={styles.dishItem}><Text style={styles.dishName}>Амгьал</Text> — лепешка из кукурузной муки с сыром;</Text>
              <Text style={styles.dishItem}><Text style={styles.dishName}>Ачапа</Text> — национальная абхазская закуска;</Text>
              <Text style={styles.dishItem}><Text style={styles.dishName}>Акуд</Text> — соус из фасоли с аджикой и специями;</Text>
              <Text style={styles.dishItem}><Text style={styles.dishName}>Аджика</Text> — абхазская острая приправа;</Text>
              <Text style={styles.dishItem}><Text style={styles.dishName}>Нарезка из овощей и солений;</Text></Text>
              <Text style={styles.dishItem}><Text style={styles.dishName}>Хачапур (нартовский; ачма)</Text> — самое известное блюдо из теста;</Text>
              <Text style={styles.dishItem}><Text style={styles.dishName}>Акуац</Text> — жареное копченое мясо (свинина, говядина, буйволина);</Text>
              <Text style={styles.dishItem}><Text style={styles.dishName}>Аджьмажьы</Text> — козлятина (жарено-копченная; вареная);</Text>
              <Text style={styles.dishItem}><Text style={styles.dishName}>Ачырхал</Text> — блюдо, приготовляемое из листьев соленого кольраби с орехами;</Text>
              <Text style={styles.dishItem}><Text style={styles.dishName}>Ахул</Text> — специальным образом, приготовленный определенный вид капусты-кольраби;</Text>
              <Text style={styles.dishItem}><Text style={styles.dishName}>Акутыжь</Text> — вареная «Курица в аджике», которая отличается пикантной остротой, большим количеством зелени и специй;</Text>
              <Text style={styles.dishItem}><Text style={styles.dishName}>Ачьырка</Text> — квашеный топинамбур со специями;</Text>
              <Text style={styles.dishItem}><Text style={styles.dishName}>Аиладжь</Text> — традиционная абхазская каша с сыром (ашеилаца). Замешивается на основе отварной кукурузной муки мелкого помола, с кукурузной мукой и топленым сливочным маслом. Блюдо принято подавать в есть горячим или теплым – так сохраняется его мягкая тягучая консистенция. Невероятно вкусно и сытно.</Text>
            </View>
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
  headerTitleWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
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
    alignSelf: 'center',
    alignItems: 'stretch',
    marginBottom: 40,
  },
  sectionTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 22,
    color: '#1129BD',
    marginBottom: 16,
    textTransform: 'uppercase',
    width: '100%',
    alignSelf: 'stretch',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  sectionText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 18,
    color: '#000',
    lineHeight: 24,
    marginBottom: 0,
  },
  mainDishesList: {
    marginTop: 16,
  },
  dishText: {
    fontSize: 18,
    color: '#000',
    marginBottom: 12,
  },
  dishName: {
    fontWeight: '700',
    color: '#000',
    fontSize: 16,
  },
  sectionTitleBlue: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 22,
    color: '#1129BD',
    marginBottom: 8,
    textTransform: 'uppercase',
    width: '100%',
    alignSelf: 'stretch',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  dishList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 8,
  },
  dishItem: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    lineHeight: 20,
    marginBottom: 0,
  },
}); 