'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './CitiesGulripsh.module.scss';

// Полное описание города Гулрыпш
const gulripshDescription = `Гулрыпш — небольшой курортный посёлок в Абхазии, расположенный в 12 км восточнее Сухума, на берегу Черного моря. Окружённый горами и субтропической растительностью, он радует мягким климатом: зимой температура держится около +5°C, а летом достигает +25°C. Морская вода прогревается до +27°C, что делает пляжный сезон комфортным с мая по сентябрь.

История Гулрыпша начинается в XIX веке, когда здесь стали появляться первые дачи русской аристократии. В советское время посёлок прославился как здравница: чистый воздух, насыщенный ароматами сосен и эвкалиптов, привлекал людей, страдающих заболеваниями дыхательных путей. В Гулрыпше сохранились здания санаториев начала XX века, построенные в стиле модерн, которые до сих пор напоминают о той эпохе. Одно из них — бывший санаторий «Чайка», окружённый парком с пальмами и магнолиями.

Природа Гулрыпша впечатляет: широкие галечные пляжи, прозрачное море и зелёные холмы. Через посёлок протекает река Келасур, добавляя пейзажу живописности. В окрестностях можно найти рощи цитрусовых и виноградники, а местные жители предлагают свежие фрукты и домашнее вино. В Гулрыпше есть несколько гостевых домов, небольших кафе и столовых, где подают абхазские блюда, такие как шашлык и хачапури.

Во время грузино-абхазского конфликта 1992–1993 годов Гулрыпш пострадал незначительно, но многие санатории были заброшены. Сегодня посёлок постепенно оживает: ремонтируются дороги, обновляются пляжные зоны, хотя Гулрыпш остаётся тихим местом, идеальным для спокойного отдыха вдали от суеты.

Одно из любимых мест для прогулок — тенистый парк у санатория «Гулрыпш», где растут вековые платаны и кипарисы. Отсюда открывается вид на море и Кавказские горы. В посёлке действует небольшой краеведческий музей, рассказывающий о его истории, а в окрестностях можно посетить руины средневекового храма XII века.

Из Гулрыпша легко добраться до Сухума или Нового Афона на маршрутке. Посёлок связан с Россией через Сочи, куда ходят автобусы, а ближайший аэропорт — Международный аэропорт Сухум имени В.Г. Ардзинба. Внутри Гулрыпша передвигаться удобнее пешком или на такси, так как территория компактная, а основные места отдыха находятся рядом.`;

// Список ключевых преимуществ/категорий для блока с иконкой-стрелкой
const gulripshItems: string[] = [
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
  'Винодельни',
  'Заправки',
  'Культурные достопримечательности',
  'Магазины и рынки',
  'Мойки',
  'Отели',
  'Пляжи',
  'Рестораны',
  'Салоны красоты',
  'Церкви',
];

const CitiesGulripsh: React.FC = () => {
  const router = useRouter();

  const handleItemClick = (item: string) => {
    if (!activeCategories.includes(item)) {
      return;
    }

    switch (item) {
      case 'Административные здания':
        router.push('/administrative-buildings/Gulripsh');
        break;
      case 'Аптеки':
        router.push('/pharmacy/Gulripsh');
        break;
      case 'Винодельни':
        router.push('/wineries/Gulripsh');
        break;
      case 'Заправки':
        router.push('/gas-stations/Gulripsh');
        break;
      case 'Культурные достопримечательности':
        router.push('/cultural-attractions/Gulripsh');
        break;
      case 'Магазины и рынки':
        router.push('/shops-and-markets/Gulripsh');
        break;
      case 'Мойки':
        router.push('/car-washes/Gulripsh');
        break;
      case 'Отели':
        router.push('/hotels/Gulripsh');
        break;
      case 'Пляжи':
        router.push('/beaches/Gulripsh');
        break;
      case 'Рестораны':
        router.push('/restaurants/Gulripsh');
        break;
      case 'Салоны красоты':
        router.push('/beauty-salons/Gulripsh');
        break;
      case 'Церкви':
        router.push('/churches/Gulripsh');
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.gulripshWrapper}>
      <main className={styles.gulripshContent}>
        <h1 className={styles.gulripshTitle}>ГУЛРЫПШ</h1>

        {/* Баннер с фоновым изображением */}
        <section className={styles.gulripshBanner}>
          <Image
            src="/assets/city_gulripsh.jpg"
            alt="Вид на город Гулрыпш"
            fill
            priority
            className={styles.gulripshImage}
          />
        </section>

        {/* Описание города */}
        <section className={styles.gulripshDescription}>
          {gulripshDescription.split('\n\n').map((para, idx) => (
            <p key={idx} className={styles.gulripshParagraph}>
              {para}
            </p>
          ))}
        </section>

        {/* Список категорий */}
        <section className={styles.gulripshListSection}>
          <ul className={styles.gulripshList}>
            {gulripshItems.map((item) => {
              const isClickable = activeCategories.includes(item);
              return (
                <li
                  key={item}
                  className={`${styles.gulripshListItem} ${
                    isClickable ? styles.clickable : styles.disabled
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className={styles.gulripshArrow} />
                  <span className={styles.gulripshItemText}>{item}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CitiesGulripsh; 