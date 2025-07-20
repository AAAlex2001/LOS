'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './CitiesGal.module.scss';

// Полное описание города Гал
const galDescription = `Гал — небольшой город на востоке Абхазии, расположенный в 100 км от Сухума, на берегу реки Ингур, которая образует естественную границу с Грузией. Окружённый горами и субтропическими лесами, Гал обладает мягким климатом: зимой температура держится около +4°C, а летом достигает +26°C. Высокая влажность способствует буйной растительности, включая цитрусовые сады и чайные плантации.

История Гала уходит корнями в Средние века, когда он был важным торговым пунктом на пути из Абхазии в Грузию. В XIX веке город стал частью Российской империи, а в советское время здесь активно развивалось сельское хозяйство. Гал известен своими минеральными источниками, такими как источник Ауадхара, который славится целебными свойствами.

Природа вокруг Гала живописна: горные пейзажи, леса из каштана и дуба, а также чистые реки. В окрестностях можно найти заброшенные чайные плантации, которые в советское время были гордостью региона. В городе есть несколько гостевых домов и кафе, где подают местные блюда, такие как копчёная рыба и абхазский сыр. Гал остаётся тихим местом, привлекая тех, кто ищет спокойный отдых вдали от туристических центров.

Восстановление города идёт медленно: ремонтируются дороги, обновляются жилые дома, но многие здания до сих пор стоят в руинах. Одно из популярных мест для прогулок — набережная реки Ингур, откуда открывается вид на горы и леса. В центре города действует небольшой краеведческий музей, рассказывающий об истории региона, а в окрестностях сохранился древний храм XII века, привлекающий любителей истории.

Из Гала можно доехать до Сухума или Ткуарчала на автобусе или маршрутке. Город связан с Россией через Сочи, а ближайший аэропорт — Международный аэропорт Сухум имени В.Г. Ардзинба. Внутри Гала передвигаться удобнее пешком или на такси, так как город компактный, а основные достопримечательности находятся в шаговой доступности.`;

// Список категорий для Гала
const galItems: string[] = [
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
  'Магазины и рынки',
  'Рестораны',
  'Культурные достопримечательности',
  'Церкви',
  'Административные здания',
];

const CitiesGal: React.FC = () => {
  const router = useRouter();

  const handleItemClick = (item: string) => {
    if (!activeCategories.includes(item)) {
      return;
    }

    switch (item) {
      case 'Административные здания':
        router.push('/administrative-buildings/Gal');
        break;
      case 'Магазины и рынки':
        router.push('/shops-and-markets/Gal');
        break;
      case 'Рестораны':
        router.push('/restaurants/Gal');
        break;
      case 'Культурные достопримечательности':
        router.push('/cultural-attractions/Gal');
        break;
      case 'Церкви':
        router.push('/churches/Gal');
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.galWrapper}>
      <main className={styles.galContent}>
        <h1 className={styles.galTitle}>ГАЛ</h1>

        {/* Баннер с фоновым изображением */}
        <section className={styles.galBanner}>
          <Image
            src="/assets/city_gal2.png"
            alt="Вид на город Гал"
            fill
            priority
            className={styles.galImage}
          />
        </section>

        {/* Описание города */}
        <section className={styles.galDescription}>
          {galDescription.split('\n\n').map((para, idx) => (
            <p key={idx} className={styles.galParagraph}>
              {para}
            </p>
          ))}
        </section>

        {/* Список категорий */}
        <section className={styles.galListSection}>
          <ul className={styles.galList}>
            {galItems.map((item) => {
              const isClickable = activeCategories.includes(item);
              return (
                <li
                  key={item}
                  className={`${styles.galListItem} ${
                    isClickable ? styles.clickable : styles.disabled
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className={styles.galArrow} />
                  <span className={styles.galItemText}>{item}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CitiesGal; 