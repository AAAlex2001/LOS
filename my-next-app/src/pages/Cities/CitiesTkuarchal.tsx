'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './CitiesTkuarchal.module.scss';

// Полное описание города Ткуарчал
const tkuarchalDescription = `Ткуарчал — город в восточной части Абхазии, расположенный в 90 км от Сухума, в живописной долине реки Аалдзга. Окружённый Кавказскими горами, он отличается более континентальным климатом по сравнению с побережьем: зимой температура опускается до +3°C, а летом поднимается до +27°C. Высокая влажность и обилие осадков создают пышную зелень вокруг города.

Ткуарчал вырос в советское время как промышленный центр благодаря добыче угля. В 1942 году он получил статус города и стал важным узлом угольной промышленности Абхазии. Здесь сохранились здания советской архитектуры, включая Дворец культуры шахтёров, построенный в 1950-х годах. Однако во время грузино-абхазского конфликта 1992–1993 годов Ткуарчал оказался в зоне боевых действий и был практически разрушен. Город пережил 413-дневную блокаду, а многие жители покинули его. Сегодня здесь проживает лишь часть довоенного населения, и следы разрушений всё ещё видны.

Природа вокруг Ткуарчала впечатляет: горные склоны, покрытые лесами, и бурные реки. Рядом с городом находится водопад Акарма, популярный среди туристов, а в окрестностях можно увидеть заброшенные угольные шахты, ставшие своеобразной достопримечательностью. В Ткуарчале есть несколько гостевых домов и кафе, где подают традиционные абхазские блюда, такие как мамалыга и сыр сулугуни.

Восстановление города идёт медленно: ремонтируются дороги, обновляются некоторые здания, но многие сооружения остаются заброшенными. Ткуарчал привлекает тех, кто интересуется историей и ищет уединения вдали от туристических маршрутов. Одно из любимых мест для прогулок — набережная вдоль реки Аалдзга, откуда открывается вид на горы. В центре города действует небольшой музей, посвящённый истории Ткуарчала и угольной промышленности.

Из Ткуарчала можно добраться до Сухума или Очамчыры на автобусе или маршрутке. Город связан с Россией через Сочи, а ближайший аэропорт — Международный аэропорт Сухум имени В.Г. Ардзинба. Внутри Ткуарчала передвижение удобнее пешком или на такси, так как город небольшой, а основные объекты находятся недалеко друг от друга.`;

// Список категорий для Ткуарчала
const tkuarchalItems: string[] = [
  'Административные здания',
  'Аптеки',
  'Винодельни',
  'Заправки',
  'Культурные достопримечательности',
  'Магазины и рынки',
  'Мойки',
  'Отели',
  'Парковки',
  'Ремонт одежды и обуви',
  'Рестораны',
  'Салоны красоты',
  'Церкви',
];

const activeCategories: string[] = [
  'Административные здания',
  'Аптеки',
  'Винодельни',
  'Культурные достопримечательности',
  'Магазины и рынки',
  'Отели',
  'Рестораны',
  'Церкви',
];

const CitiesTkuarchal: React.FC = () => {
  const router = useRouter();

  const handleItemClick = (item: string) => {
    if (!activeCategories.includes(item)) {
      return;
    }

    switch (item) {
      case 'Административные здания':
        router.push('/administrative-buildings/Tkuarchal');
        break;
      case 'Аптеки':
        router.push('/pharmacy/Tkuarchal');
        break;
      case 'Винодельни':
        router.push('/wineries/Tkuarchal');
        break;
      case 'Культурные достопримечательности':
        router.push('/cultural-attractions/Tkuarchal');
        break;
      case 'Магазины и рынки':
        router.push('/shops-and-markets/Tkuarchal');
        break;
      case 'Отели':
        router.push('/hotels/Tkuarchal');
        break;
      case 'Рестораны':
        router.push('/restaurants/Tkuarchal');
        break;
      case 'Церкви':
        router.push('/churches/Tkuarchal');
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.tkuarchalWrapper}>
      <main className={styles.tkuarchalContent}>
        <h1 className={styles.tkuarchalTitle}>ТКУАРЧАЛ</h1>

        {/* Баннер с фоновым изображением */}
        <section className={styles.tkuarchalBanner}>
          <Image
            src="/assets/city_tkuarchal.jpg"
            alt="Вид на город Ткуарчал"
            fill
            priority
            className={styles.tkuarchalImage}
          />
        </section>

        {/* Описание города */}
        <section className={styles.tkuarchalDescription}>
          {tkuarchalDescription.split('\n\n').map((para, idx) => (
            <p key={idx} className={styles.tkuarchalParagraph}>
              {para}
            </p>
          ))}
        </section>

        {/* Список категорий */}
        <section className={styles.tkuarchalListSection}>
          <ul className={styles.tkuarchalList}>
            {tkuarchalItems.map((item) => {
              const isClickable = activeCategories.includes(item);
              return (
                <li
                  key={item}
                  className={`${styles.tkuarchalListItem} ${
                    isClickable ? styles.clickable : styles.disabled
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className={styles.tkuarchalArrow} />
                  <span className={styles.tkuarchalItemText}>{item}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CitiesTkuarchal; 