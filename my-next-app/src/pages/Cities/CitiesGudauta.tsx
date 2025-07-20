'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './CitiesGudauta.module.scss';

// Полное описание города Гудаута
const gudautaDescription = `Гудаута — уютный город на черноморском побережье Абхазии, расположенный в 37 км от Сухума и 43 км от Гагры. Он раскинулся у подножия Кавказских гор, в окружении субтропической зелени, что создаёт мягкий и комфортный климат. Зима здесь тёплая, с январской температурой около +6°C, а лето жаркое и влажное, с июльскими показателями около +26°C. Морская вода летом прогревается до +27°C, привлекая любителей пляжного отдыха.

Гудаута известна своей историей, уходящей корнями в древность. На её территории сохранились следы средневековых укреплений, а в окрестностях находятся руины крепости Абахваца, датируемой X–XII веками. Город также стал важным центром во время грузино-абхазского конфликта 1992–1993 годов: здесь располагался штаб абхазских сил, и Гудаута избежала серьёзных разрушений, став временной административной базой республики. Сегодня это спокойный курортный город, сохранивший атмосферу советской эпохи.

Природа вокруг Гудауты впечатляет: песчано-галечные пляжи, чистое море и горные пейзажи. Рядом протекает река Хыпста, а в окрестностях можно посетить карстовые пещеры и водопады. Гудаута славится своими мандариновыми и виноградными садами, а местные рынки изобилуют свежими фруктами и домашним вином. В городе есть небольшие пансионаты, гостевые дома и кафе, где подают традиционные абхазские блюда, такие как мамалыга и хачапури.

После войны Гудаута медленно восстанавливается. В последние годы здесь обновляют инфраструктуру: ремонтируют дороги, модернизируют пляжные зоны, хотя многие здания ещё хранят следы прошлого. Город остаётся менее туристическим, чем Сухум или Пицунда, что привлекает тех, кто ищет тишину и уединение.

Одно из любимых мест для прогулок — центральная набережная, окружённая эвкалиптовыми деревьями, с видом на море и закаты. В Гудауте действует краеведческий музей, где можно узнать о местной истории и культуре, а в центре города сохранился памятник героям войны. Неподалёку находится село Лыхны с древним храмом Успения Пресвятой Богородицы X века, популярное среди туристов.

Из Гудауты можно доехать до Сухума, Гагры или Нового Афона на автобусе или маршрутке. Город связан с Россией через Сочи, куда ходят регулярные рейсы, а ближайший аэропорт — Международный аэропорт Сухум имени В.Г. Ардзинба. Внутри Гудауты передвигаться удобно пешком или на такси, так как город небольшой и компактный.`;

// Список ключевых преимуществ/категорий для блока с иконкой-стрелкой
const gudautaItems: string[] = [
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

const CitiesGudauta: React.FC = () => {
  const router = useRouter();

  const handleItemClick = (item: string) => {
    if (!activeCategories.includes(item)) {
      return;
    }

    switch (item) {
      case 'Административные здания':
        router.push('/administrative-buildings/Gudauta');
        break;
      case 'Аптеки':
        router.push('/pharmacy/Gudauta');
        break;
      case 'Винодельни':
        router.push('/wineries/Gudauta');
        break;
      case 'Заправки':
        router.push('/gas-stations/Gudauta');
        break;
      case 'Культурные достопримечательности':
        router.push('/cultural-attractions/Gudauta');
        break;
      case 'Магазины и рынки':
        router.push('/shops-and-markets/Gudauta');
        break;
      case 'Мойки':
        router.push('/car-washes/Gudauta');
        break;
      case 'Отели':
        router.push('/hotels/Gudauta');
        break;
      case 'Пляжи':
        router.push('/beaches/Gudauta');
        break;
      case 'Рестораны':
        router.push('/restaurants/Gudauta');
        break;
      case 'Салоны красоты':
        router.push('/beauty-salons/Gudauta');
        break;
      case 'Церкви':
        router.push('/churches/Gudauta');
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.gudautaWrapper}>
      <main className={styles.gudautaContent}>
        <h1 className={styles.gudautaTitle}>ГУДАУТА</h1>

        {/* Баннер с фоновым изображением */}
        <section className={styles.gudautaBanner}>
          <Image
            src="/assets/city_gudauta.jpg"
            alt="Вид на город Гудаута"
            fill
            priority
            className={styles.gudautaImage}
          />
        </section>

        {/* Описание города */}
        <section className={styles.gudautaDescription}>
          {gudautaDescription.split('\n\n').map((para, idx) => (
            <p key={idx} className={styles.gudautaParagraph}>
              {para}
            </p>
          ))}
        </section>

        {/* Список категорий */}
        <section className={styles.gudautaListSection}>
          <ul className={styles.gudautaList}>
            {gudautaItems.map((item) => {
              const isClickable = activeCategories.includes(item);
              return (
                <li
                  key={item}
                  className={`${styles.gudautaListItem} ${
                    isClickable ? styles.clickable : styles.disabled
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className={styles.gudautaArrow} />
                  <span className={styles.gudautaItemText}>{item}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CitiesGudauta; 