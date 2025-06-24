import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './ElementaryDictionary.module.scss';

interface WordPair {
  ru: string;
  abkh: string;
}

interface Section {
  title: string;
  words: WordPair[];
}

// Общие фразы (34)
const commonWords: WordPair[] = [
  { ru: 'Я', abkh: "Sara'" },
  { ru: 'Ты', abkh: "Bara'" },
  { ru: 'Отец', abkh: 'Аб' },
  { ru: 'Мать', abkh: 'Ан' },
  { ru: 'Друг (Друзья)', abkh: 'Аюза (Аиӡуа)' },
  { ru: 'Друзья, коллеги', abkh: 'Аиӡуа' },
  { ru: 'Да', abkh: 'Ай' },
  { ru: 'Раньше, когда-то', abkh: "А'нкьа" },
  { ru: 'Пока ещё', abkh: "Макьа'на" },
  { ru: 'Сегодня', abkh: "Иажьа'" },
  { ru: 'Солнце', abkh: "А'мра" },
  { ru: 'День; Погода', abkh: 'Амш' },
  { ru: 'Море', abkh: "Амшьы'н" },
  { ru: 'Сердце', abkh: "Агә ь'" },
  { ru: 'Голова', abkh: "Ах ь'" },
  { ru: 'в (посёлок)', abkh: 'Ахь' },
  { ru: 'Хороший', abkh: "Агәи'а" },
  { ru: 'Август', abkh: "На'ҳуқмаз" },
  { ru: 'Английский язык', abkh: "Англәы ӡ бызшьа'" },
  { ru: 'Аплодисменты', abkh: "Анаӡӷиҟра" },
  { ru: 'Армянин', abkh: "А'швамах" },
  { ru: 'Архангел', abkh: "Апанаимба'р" },
  { ru: 'Девушка', abkh: 'Апххъба, атыпҳ' },
  { ru: 'Абазин', abkh: "А'шуа (аба'за)" },
  { ru: 'Абхаз', abkh: "А'псуа" },
  { ru: 'Абхаз родился в Абхазии', abkh: "А'псуа дҳхы Апсно'уп" },
  { ru: 'Абхазия', abkh: "Апсны'" },
  { ru: 'Абхазская арфа', abkh: 'Ароʼмаа' },
  { ru: 'Абхазские виноделы', abkh: "А'псуа кьатӡaочуа" },
  { ru: 'Абхазские песни', abkh: "А'псшәара" },
  { ru: 'Абхазские танцы', abkh: "А'псуа күашра" },
  { ru: 'Абхазский народ', abkh: "А'псуа џьвар" },
  { ru: 'Абхазский язык', abkh: "А'псуа бызшьа'" },
  { ru: 'Ансамбль песни и пляски', abkh: "А'шақәарай а' күашәрау ранса'мбл" },
];

// Знакомство (13)
const acquaintance: WordPair[] = [
  { ru: 'А как вас зовут?', abkh: "Шәара′ ишәаҳӡи?" },
  { ru: 'А как твоя фамилия? (м.)', abkh: "Уара′ иу′жәӡлӡи?" },
  { ru: 'А как твоя фамилия? (ж.)', abkh: "Бара′ ибы′жәӡлӡи?" },
  { ru: 'А как тебя зовут? (м.)', abkh: "Уара′ иу′хәӡи?" },
  { ru: 'А как тебя зовут? (ж.)', abkh: "Бара′ ибы′хәӡи?" },
  { ru: 'Если это возможно, хотел бы узнать твоё имя и фамилию', abkh: 'Икалбаср, ухыӡм, ужәӡлӡи, әйылсқар стахьи' },
  { ru: 'Знакомьтесь', abkh: 'Шыӡбадыр' },
  { ru: 'Знакомьтесь, это мой друг', abkh: 'Шыӡбадыр, ари сара сызба иоуп' },
  { ru: 'Да, я её прекрасно знаю', abkh: 'Ай, сара уи избаны дыздыруеит' },
  { ru: 'Давай познакомимся', abkh: 'Хайбадыр, икаԥзар' },
  { ru: 'Давай познакомимся (обращение к мужчине)', abkh: 'Уай, хайбадыр' },
  { ru: 'Давай познакомимся (обращение к женщине)', abkh: 'Бай, хайбадыр' },
  { ru: 'Давайте познакомимся', abkh: 'Шай, хайбадыр' },
];

// Приветствие (13)
const greeting: WordPair[] = [
  { ru: 'Добро пожаловать! (обр. к мужчине)', abkh: "Уара′ иу′жәӡлӡи?" },
  { ru: 'Добро пожаловать! (обращение к женщине)', abkh: "Бара′ ибы′жәӡлӡи?" },
  { ru: 'Добро пожаловать! (при обращении на «вы»)', abkh: "Уара′ иу′хәӡи?" },
  { ru: 'Доброе утро! (при обращении на «вы»)', abkh: "Бара′ ибы′хәӡи?" },
  { ru: 'Доброе утро! (при обращении на «ты»)', abkh: 'Икалбаср, ухыӡм, ужәӡлӡи, әйылсқар стахьи' },
  { ru: 'Добрый вечер! (при обращении на «вы»)', abkh: 'Шыӡбадыр' },
  { ru: 'Добрый вечер! (при обращении на «ты»)', abkh: 'Шыӡбадыр, ари сара сызба иоуп' },
  { ru: 'Добрый день! (при обращении на «вы»)', abkh: 'Ай, сара уи избаны дыздыруеит' },
  { ru: 'Заходи (обращение к мужчине)', abkh: 'Хайбадыр, икаԥзар' },
  { ru: 'Заходи (обращение к женщине)', abkh: 'Уай, хайбадырп' },
  { ru: 'Заходите', abkh: 'Бай, хайбадырп' },
  { ru: 'Входите!', abkh: 'Шай, хайбадырп' },
  { ru: 'Всего доброго!', abkh: 'Абзиараз!' },
];

// Общение (55)
const communication: WordPair[] = [
  { ru: 'Я знаю', abkh: "Сара' ианӡруеит." },
  { ru: 'Ты (муж) знаешь?', abkh: "Уара' иуаӡруеит?" },
  { ru: 'Я живу на море', abkh: "Сара' амшы ахь соит." },
  { ru: 'Ты (жён) иди к Айре.', abkh: "Бара' Ахра ижь бца." },
  { ru: 'Ты (муж) иди к Дамво.', abkh: "Уара' Дамы ижь узд?" },
  { ru: 'Он работает.', abkh: 'Ирар аыс уигьт.' },
  { ru: 'Ты (жён) работаешь?', abkh: "Бара' агь ҵума?" },
  { ru: 'Я хорошо знаю своё дело.', abkh: "Сара' c ус избаны иӡдуреит." },
  { ru: 'Ты (жён) любишь свою работу?', abkh: "Бара' буса бызьа иббома?" },
  { ru: 'А вот и он идёт!', abkh: "Аба' p ра? иаӡхау'!" },
  { ru: 'В каком году вы родились?', abkh: 'Ирыбас шьинкусуӡ уаниз?' },
  { ru: 'В каком году ты родился? (к мужчине)', abkh: 'Ирыбар шьинкусуӡ уаниз?' },
  { ru: 'В каком году ты родилась? (к женщине)', abkh: 'Ирыбас шьинкусуӡ баны?' },
  { ru: 'Ваше лицо мне знакомо', abkh: 'Шари лаҕтиьа шацдыруаит' },
  { ru: 'Вы знаете эту женщину?', abkh: 'Ари апос (ахәҭа) дзакырӡума?' },
  { ru: 'Вы меня не узнаёте?', abkh: 'Шари сард сыишӡалдзурои?' },
  { ru: 'Вы понимаете?', abkh: 'Елилҧхаӡма?' },
  { ru: 'Вы правы', abkh: 'Шықоуп' },
  { ru: 'Вы совсем не изменились', abkh: 'Шари зыӡнаӡа ҭылӡымзыҟӡоит' },
  { ru: 'Где вы живёте?', abkh: 'Шьабако?' },
  { ru: 'Где вы работаете?', abkh: 'Аис абӡуаа?' },
  { ru: 'Где находится?..', abkh: 'Иблаҳоу?..' },
  { ru: 'Где ты работаешь?', abkh: 'Аис абӡуаа?' },
  { ru: 'Давай потанцуем (к мужчине)', abkh: 'Уай, хайкрыҳшәа' },
  { ru: 'Давай потанцуем (к женщине)', abkh: 'Бай, хайкрыҳшәап' },
  { ru: 'Давайте потанцуем', abkh: 'Шай, хайкрыҳшәап' },
  { ru: 'Доволен (довольна) ли я?', abkh: 'Сгу наӡдума ба?' },
  { ru: 'Довольны ли вы?', abkh: 'Шшу наӡдума?' },
  { ru: 'Это не моё дело!', abkh: "Арч сара' кусыи!" },
  { ru: 'Кама работает.', abkh: 'Кама ауҕуеит.' },
  { ru: 'У меня есть собака.', abkh: "Сара' алӡ соиҵоуп." },
  { ru: 'Я люблю свою собаку.', abkh: "Сара' ца баӡа избоит." },
  { ru: 'Здесь хорошо жить.', abkh: "Ара' анакар' бызҵуеит." },
  { ru: 'Она любит здесь жить.', abkh: "Лара' баҕа избоит ара' анакар'." },
  { ru: 'Я люблю тебя (жён).', abkh: "Сара' баӡы иббоит." },
  { ru: 'Я люблю тебя (муж).', abkh: "Сара' баӡы избоит." },
  { ru: 'Она хорошая.', abkh: "Лара' дыбжьыоит." },
  { ru: 'Он любит море.', abkh: "Ирар' баҕа избоит амшьыӷн." },
  { ru: 'Я хорошо знаю свою работу.', abkh: "Сара' сус избаны иӡдуреит" },
  { ru: 'Без сомнений', abkh: 'Гьубарада' },
  { ru: 'Большое спасибо!', abkh: 'Итабҩуи иуаӡдзаны!' },
  { ru: 'Всё хорошо', abkh: 'Зеги бызҵуеит' },
  { ru: 'Ты (жён) любишь море?', abkh: "Бара' амшьы баӡы иббома?" },
  { ru: 'Да, я люблю море.', abkh: "Ач, сара' амшьы баӡы избоит." },
  { ru: 'Я иду, ухожу, отправляюсь', abkh: "Сара' сыиоит" },
  { ru: 'Я люблю свою мать и своего отца', abkh: "Сара' баӡы избоит санҟ саби" },
  { ru: 'Я люблю свою мать и своего отца', abkh: "Сара' баӡы избоит санҟ саби саби" },
  { ru: 'Она идёт на море', abkh: "Лара' амшы ахь идәоит" },
  { ru: 'Я сегодня иду в школу', abkh: "Сара' накәа' шкло ахь сыиоит" },
  { ru: 'Сегодня хорошая погода', abkh: "Иажьа' амш бзиоуп" },
  { ru: 'Сегодня море хорошее.', abkh: "Иажьа' амшыбзиоуп." },
  { ru: 'День хороший', abkh: 'Амш бзиоуп.' },
  { ru: 'Без труда нет сладкой жизни', abkh: 'Џьиџьбара блабла ыҟам' },
  { ru: 'Дети играют в жмурки', abkh: 'Аҩаӡара ҷыктә иҽыкәырҩоит' },
  { ru: 'Восьмой класс', abkh: 'Аббатап аҟласс' },
  { ru: 'Что нового?', abkh: 'Иҿыцузеи?' },
];

const farewellWords: WordPair[] = [
  { ru: 'До свидания!', abkh: 'Бзиала!' },
  { ru: 'До вечера!', abkh: 'Хулпааӡа!' },
  { ru: 'До завтра!', abkh: 'Уаҵәыбндза!' },
  { ru: 'До понедельника!', abkh: 'Ашәахькндза!' },
  { ru: 'До вторника!', abkh: 'Аиошандза!' },
  { ru: 'До среды!', abkh: 'Ахашандза!' },
  { ru: 'До четверга!', abkh: 'Алцәашандза!' },
  { ru: 'До пятницы!', abkh: 'Ахуашандза!' },
  { ru: 'До субботы!', abkh: 'Асабшандза!' },
  { ru: 'До воскресенья!', abkh: 'Амтшашандза!' },
  { ru: 'Звоните!', abkh: 'Ател шасла!' },
  { ru: 'Будьте здоровы! (при прощании)', abkh: 'Шгу баиаа!' },
];

const inStoreWords: WordPair[] = [
  { ru: 'Хлеб', abkh: "Ача'" },
  { ru: 'Мясо', abkh: "Акав'ц" },
  { ru: 'Айва', abkh: "Аби'а" },
  { ru: 'Апельсин', abkh: "Алатырка'л" },
  { ru: 'Арбуз', abkh: "Акарлы'жв" },
  { ru: 'Покупать', abkh: "Аа'хаара" },
  { ru: 'Вкус', abkh: "Агь а'ма" },
  { ru: 'Цена', abkh: 'Аха' },
  { ru: 'Килограмм', abkh: "Акьы'ла" },
  { ru: 'Абхазские вина', abkh: "А'псуа юкуа" },
  { ru: 'В магазине', abkh: "Адəқин аҭыжь'" },
  { ru: 'вино крепкое', abkh: 'Аҩы джьбароуп' },
  { ru: 'Ты (жён) берёшь', abkh: "Б ара' иб го'ит" },
  { ru: 'Ты (муж) берёшь', abkh: "У ара' иу го'ит" },
  { ru: 'Он берет', abkh: "И ара' (и)и го'ит" },
  { ru: 'Я беру', abkh: "С ара' из го'ит" },
  { ru: 'Она берет', abkh: "Л ара' ил го'ит" },
  { ru: 'Я покупаю хлеб', abkh: "Сар'а иав'схаоит ача'" },
  { ru: 'Я покупаю килограмм мяса', abkh: "Сар'а' кьы'лак акәа'ц аа'схәоит" },
  { ru: 'У мяса хороший вкус (мясо вкусное)', abkh: "Акәа'ц агьа'ма бзи'оуп" },
  { ru: 'Абрикос', abkh: "Ачара'м" },
  { ru: 'Аромат', abkh: "А'хаафью" },
];

const inCityWords: WordPair[] = [
  { ru: 'В городе', abkh: 'Акалакь аҭыжь' },
  { ru: 'Аренда', abkh: "Аки'ра" },
  { ru: 'Большой дом', abkh: 'Аионду' },
  { ru: 'В банке', abkh: 'Абанк аҭыжь' },
  { ru: 'В институте', abkh: 'Аинститут аҭыжь' },
  { ru: 'Аэровокзал', abkh: "Ахаи'рвокза'л" },
  { ru: 'Аэропорт', abkh: "Ахаирбақә'за" },
  { ru: 'Аптека', abkh: "А'хушатәирта" },
  { ru: 'Автомобиль', abkh: "Автомащы'на" },
  { ru: 'Автосервис', abkh: "Автоматзура'" },
  { ru: 'Администрация', abkh: "Ахадара'" },
  { ru: 'Граждане пассажиры!', abkh: 'Аҩычра апассаџьырцәа!' },
  { ru: 'Аэропорт далеко от города?', abkh: "Ахаирбақә'за'а а'калакь акь'р я'лгоума?" },
  { ru: 'В министерстве', abkh: 'Аминистрраҭыжь' },
  { ru: 'В редакции', abkh: 'Аредакциаҭыжь' },
  { ru: 'В селе', abkh: 'Ақыҭаҭыжь' },
  { ru: 'В университете', abkh: 'Аиуниверситет аҭыжь' },
  { ru: 'Школа', abkh: "Ашко'л" },
  { ru: 'Дом отдыха', abkh: 'Апсцәарҭа юны.' },
  { ru: 'Держи вора!', abkh: 'Ахиҵ дзанкыл!' },
  { ru: 'Вызовите врача!', abkh: 'Ахақым шиҟәх!' },
  { ru: 'Вызовите милицию!', abkh: 'Амилициа шәҟәх!' },
];

const actionWords: WordPair[] = [
  { ru: 'Я иду / ухожу / отправляюсь', abkh: "Сара' сцо'ит" },
  { ru: 'Я стою', abkh: "Сара' сгы'лоуп" },
  { ru: 'Я вижу', abkh: "Сара' избо'ит" },
  { ru: 'Он идёт', abkh: "Иара' дцо'ит" },
  { ru: 'Она идёт', abkh: "Лара' дцо'ит" },
  { ru: 'Видеть, увидеть', abkh: "Абара'" },
  { ru: 'Я вижу', abkh: "С ара' из бо'ит" },
  { ru: 'Стоять; Встать', abkh: "Агы'лара" },
  { ru: 'Идти; Отправляться', abkh: "Ацара'" },
  { ru: 'Видеть', abkh: "Абара'" },
  { ru: 'Любить', abkh: "Бзи'а абара'" },
  { ru: 'Я стою', abkh: "Сара' сгы'лоуп" },
  { ru: 'Я вижу', abkh: "Сара' избо'ит" },
  { ru: 'Брать; Взять; Унести', abkh: "Аг ара'" },
  { ru: 'Я иду', abkh: "Сара' сцо'ит" },
  { ru: 'Ты (женщина) идёшь', abkh: "Бара' бцо'ит" },
  { ru: 'Ты (мужчина) идёшь', abkh: "Уара' уцо'ит" },
  { ru: 'Ты (жён) видишь', abkh: "Б ара' иб бо'ит" },
  { ru: 'Ты (муж) видишь', abkh: "У ара' иу бо'ит" },
  { ru: 'Он видит', abkh: "И ара' (и)и бо'ит" },
  { ru: 'Она видит', abkh: "Л ара' ил бо'ит" },
  { ru: 'Брать, взять; Уводить; Уносить', abkh: "Агара'" },
];

const sections: Section[] = [
  { title: 'Общие фразы', words: commonWords },
  { title: 'Знакомство', words: acquaintance },
  { title: 'Приветствие', words: greeting },
];

const getColumns = (list: WordPair[], forceSplit = false): WordPair[][] => {
  if (forceSplit || list.length > 18) {
    const mid = Math.ceil(list.length / 2);
    const col1 = [...list.slice(0, mid)];
    const col2 = [...list.slice(mid)];

    while (col2.length < col1.length) {
      col2.push({ ru: '\u00A0', abkh: '' });
    }
    return [col1, col2];
  }
  return [list];
};

const ElementaryDictionary: React.FC = () => {
  const [commonLeft, commonRight] = getColumns(commonWords);

  const renderTable = (items: WordPair[]) => (
    <div className={styles.dictionaryTable}>
      <div className={styles.row}>
        <div className={styles.cellHeader}>На русском</div>
        <div className={styles.cellHeader}>На абхазском</div>
      </div>
      {items.map((w, idx) => (
        <div key={`${w.ru}-${idx}`} className={styles.row}>
          <div className={styles.cell}>{w.ru}</div>
          <div className={styles.cell}>{w.abkh}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>Элементарный словарь</h1>
        <div className={styles.sectionsContainer}>
          <div className={styles.sectionBlockFullWidth}>
            <h2 className={styles.sectionTitle}>{`Общие фразы (${commonWords.length} слова)`}</h2>
            <div className={styles.tablesRow}>
              {commonLeft.length > 0 && renderTable(commonLeft)}
              {commonRight.length > 0 && renderTable(commonRight)}
            </div>
          </div>

          <div className={styles.tablesRow}>
            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>{`Знакомство (13 слов)`}</h2>
              {renderTable(acquaintance)}
            </div>
            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>{`Приветствие (13 слов)`}</h2>
              {renderTable(greeting)}
            </div>
          </div>

          {/* Общение */}
          <div className={styles.sectionBlockFullWidth}>
            <h2 className={styles.sectionTitle}>{`Общение (${communication.length} слов)`}</h2>
            <div className={styles.tablesRow}>
              {getColumns(communication).map((col, idx) => (
                <div key={idx} className={styles.sectionBlock}>
                  {renderTable(col)}
                </div>
              ))}
            </div>
          </div>

          {/* Прощание */}
          <div className={styles.sectionBlockFullWidth}>
            <h2 className={styles.sectionTitle}>{`Прощание (${farewellWords.length} слов)`}</h2>
            <div className={styles.tablesRow}>
              {getColumns(farewellWords, true).map((col, idx) => (
                <div key={idx} className={styles.sectionBlock}>
                  {renderTable(col)}
                </div>
              ))}
            </div>
          </div>

          {/* В магазине и В городе */}
          <div className={styles.tablesRow}>
            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>{`В магазине (${inStoreWords.length} слова)`}</h2>
              {renderTable(inStoreWords)}
            </div>
            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>{`В городе (${inCityWords.length} слова)`}</h2>
              {renderTable(inCityWords)}
            </div>
          </div>

          {/* Действия */}
          <div className={styles.sectionBlockFullWidth}>
            <h2 className={styles.sectionTitle}>{`Действия (${actionWords.length} слова)`}</h2>
            <div className={styles.tablesRow}>
              {getColumns(actionWords).map((col, idx) => (
                <div key={idx} className={styles.sectionBlock}>
                  {renderTable(col)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ElementaryDictionary;
