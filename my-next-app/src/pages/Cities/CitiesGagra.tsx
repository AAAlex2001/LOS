'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './CitiesGagra.module.scss';

// Полное описание города Гагра
const gagraDescription = `Гагра — популярный курортный город на черноморском побережье Абхазии, расположенный в 80 км от Сухума, у подножия Гагрского хребта. Благодаря горам, защищающим город от холодных ветров, здесь царит мягкий субтропический климат: зимой температура редко опускается ниже +6°C, а летом достигает +26°C. Морская вода прогревается до +28°C, что делает пляжный сезон комфортным с мая по октябрь.

Гагра была основана в 1903 году принцем Александром Ольденбургским, который мечтал превратить её в «русскую Ниццу». Он построил здесь климатическую станцию, парк и первые виллы, заложив основы курорта. В советское время Гагра стала одним из самых популярных мест отдыха в СССР, привлекая гостей своими санаториями и пляжами. Среди достопримечательностей города — замок принца Ольденбургского, построенный в стиле модерн, и колоннада 1950-х годов, ставшая символом Гагры.

Природа Гагры восхищает: галечные пляжи, чистейшее море и пышная растительность, включая пальмы и эвкалипты. Через город протекает река Жоэквара, а в окрестностях находится ущелье с водопадами и тропами для прогулок. Гагра делится на Старую и Новую части: Старая Гагра — тихая и историческая, Новая — оживлённая, с отелями, ресторанами и аквапарком. Местные кафе предлагают абхазские блюда, такие как ачаш и мясо по-абхазски.

Одно из любимых мест для прогулок — Приморский парк, где растут магнолии и кипарисы, а с набережной открывается вид на море и горы. В городе действует небольшой музей, посвящённый истории Гагры, а в окрестностях можно посетить крепость Абаата VI века.

Из Гагры легко добраться до Сухума, Пицунды или Нового Афона на автобусе или маршрутке. Город связан с Россией через Сочи, который находится в 30 км, а ближайший аэропорт — Международный аэропорт Сухум имени В.Г. Ардзинба. Внутри Гагры передвигаться удобно на маршрутках или такси, а многие достопримечательности доступны пешком.`;

// Список категорий для Гагры
const gagraItems: string[] = [
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
  'Парковки',
  'Пляжи',
  'Рестораны',
  'Салоны красоты',
  'Церкви',
];

const CitiesGagra: React.FC = () => {
  const router = useRouter();

  const handleItemClick = (item: string) => {
    if (!activeCategories.includes(item)) {
      return;
    }

    switch (item) {
      case 'Административные здания':
        router.push('/administrative-buildings/Gagra');
        break;
      case 'Аптеки':
        router.push('/pharmacy/Gagra');
        break;
      case 'Винодельни':
        router.push('/wineries/Gagra');
        break;
      case 'Заправки':
        router.push('/gas-stations/Gagra');
        break;
      case 'Культурные достопримечательности':
        router.push('/cultural-attractions/Gagra');
        break;
      case 'Магазины и рынки':
        router.push('/shops-and-markets/Gagra');
        break;
      case 'Мойки':
        router.push('/car-washes/Gagra');
        break;
      case 'Отели':
        router.push('/hotels/Gagra');
        break;
      case 'Парковки':
        router.push('/parking-lots/Gagra');
        break;
      case 'Пляжи':
        router.push('/beaches/Gagra');
        break;
      case 'Рестораны':
        router.push('/restaurants/Gagra');
        break;
      case 'Салоны красоты':
        router.push('/beauty-salons/Gagra');
        break;
      case 'Церкви':
        router.push('/churches/Gagra');
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.gagraWrapper}>
      <main className={styles.gagraContent}>
        <h1 className={styles.gagraTitle}>ГАГРА</h1>

        {/* Баннер с фоновым изображением */}
        <section className={styles.gagraBanner}>
          <Image
            src="/assets/city_gagra.jpg"
            alt="Вид на город Гагра"
            fill
            priority
            className={styles.gagraImage}
          />
        </section>

        {/* Описание города */}
        <section className={styles.gagraDescription}>
          {gagraDescription.split('\n\n').map((para, idx) => (
            <p key={idx} className={styles.gagraParagraph}>
              {para}
            </p>
          ))}
        </section>

        {/* Список категорий */}
        <section className={styles.gagraListSection}>
          <ul className={styles.gagraList}>
            {gagraItems.map((item) => {
              const isClickable = activeCategories.includes(item);
              return (
                <li
                  key={item}
                  className={`${styles.gagraListItem} ${
                    isClickable ? styles.clickable : styles.disabled
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className={styles.gagraArrow} />
                  <span className={styles.gagraItemText}>{item}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CitiesGagra; 