'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './CitiesNewafon.module.scss';

// Полное описание города Новый Афон
const newafonDescription = `Новый Афон — живописный город на черноморском побережье Абхазии, расположенный в 22 км от Сухума, у подножия двух гор: Афонской и Иверской. Окружённый пышной субтропической растительностью, он радует мягким климатом: зимой температура редко опускается ниже +6°C, а летом держится на уровне +25°C. Морская вода прогревается до +27°C, делая пляжный сезон комфортным с мая по октябрь.

Город основан в III веке как торговый порт Анакопия, а в VIII веке стал центром Анакопийской епархии. Новый Афон известен своим духовным наследием: в 1875 году здесь был основан Новоафонский Симоно-Кананитский монастырь, построенный монахами со Святой горы Афон в Греции. Монастырь с его золотыми куполами и фресками остаётся одной из главных достопримечательностей. Ещё одно знаковое место — Новоафонская пещера, открытая в 1961 году. Этот подземный комплекс с огромными залами и сталактитами привлекает тысячи туристов.

Природа Нового Афона завораживает: галечные пляжи, кристально чистое море, кипарисовые и оливковые рощи. Рядом протекает река Псырцха, образующая небольшой водопад, а на склоне Афонской горы раскинулся Приморский парк с лебединым озером. Город славится своими мандаринами, гранатами и инжиром, которые можно попробовать на местных рынках. Здесь есть гостевые дома, небольшие отели и кафе с абхазской кухней, где подают абысту и аджику.

Новый Афон пережил сложные времена во время грузино-абхазского конфликта 1992–1993 годов, но разрушения были минимальными. Сегодня город активно развивается: ремонтируются дороги, обновляются туристические объекты, сохраняется историческое наследие. В 2011 году была отреставрирована набережная, ставшая излюбленным местом для прогулок.

Популярные достопримечательности включают Анакопийскую крепость VII века на Иверской горе, откуда открывается панорамный вид на море и горы, а также храм Симона Кананита IX века, связанный с раннехристианской историей. В центре города действует небольшой музей, посвящённый истории Нового Афона, а на горе сохранилась келья Симона Кананита, куда ведёт тропа через лес.

Из Нового Афона можно доехать до Сухума, Гагры или Пицунды на маршрутке или автобусе. Город связан с Россией через Сочи, а ближайший аэропорт — «Бабушара» в Сухуме. Внутри Нового Афона передвижение удобнее всего пешком или на такси, так как основные достопримечательности находятся в шаговой доступности.`;

// Список категорий для Нового Афона
const newafonItems: string[] = [
  'Административные здания',
  'Аптеки',
  'Винодельни',
  'Заправки',
  'Культурные достопримечательности',
  'Магазины и рынки',
  'Мойки',
  'Отели',
  'Парковки',
  'Пляжи',
  'Ремонт одежды и обуви',
  'Рестораны',
  'Салоны красоты',
  'Церкви',
];

const activeCategories: string[] = [
  'Административные здания',
  'Аптеки',
  'Пляжи',
  'Мойки',
  'Культурные достопримечательности',
  'Отели',
  'Парковки',
  'Рестораны',
  'Салоны красоты',
  'Магазины и рынки',
  'Церкви',
];

const CitiesNewafon: React.FC = () => {
  const router = useRouter();

  const handleItemClick = (item: string) => {
    if (!activeCategories.includes(item)) {
      return;
    }

    switch (item) {
      case 'Административные здания':
        router.push('/administrative-buildings/NewAfon');
        break;
      case 'Аптеки':
        router.push('/pharmacy/NewAfon');
        break;
      case 'Пляжи':
        router.push('/beaches/NewAfon');
        break;
      case 'Мойки':
        router.push('/car-washes/NewAfon');
        break;
      case 'Культурные достопримечательности':
        router.push('/cultural-attractions/NewAfon');
        break;
      case 'Отели':
        router.push('/hotels/NewAfon');
        break;
      case 'Парковки':
        router.push('/parking-lots/NewAfon');
        break;
      case 'Рестораны':
        router.push('/restaurants/NewAfon');
        break;
      case 'Салоны красоты':
        router.push('/beauty-salons/NewAfon');
        break;
      case 'Магазины и рынки':
        router.push('/shops-and-markets/NewAfon');
        break;
      case 'Церкви':
        router.push('/churches/NewAfon');
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.newafonWrapper}>
      <main className={styles.newafonContent}>
        <h1 className={styles.newafonTitle}>НОВЫЙ АФОН</h1>

        {/* Баннер с фоновым изображением */}
        <section className={styles.newafonBanner}>
          <Image
            src="/assets/city_newafon.jpg"
            alt="Вид на город Новый Афон"
            fill
            priority
            className={styles.newafonImage}
          />
        </section>

        {/* Описание города */}
        <section className={styles.newafonDescription}>
          {newafonDescription.split('\n\n').map((para, idx) => (
            <p key={idx} className={styles.newafonParagraph}>
              {para}
            </p>
          ))}
        </section>

        {/* Список категорий */}
        <section className={styles.newafonListSection}>
          <ul className={styles.newafonList}>
            {newafonItems.map((item) => {
              const isClickable = activeCategories.includes(item);
              return (
                <li
                  key={item}
                  className={`${styles.newafonListItem} ${
                    isClickable ? styles.clickable : styles.disabled
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className={styles.newafonArrow} />
                  <span className={styles.newafonItemText}>{item}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CitiesNewafon; 