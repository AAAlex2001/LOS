'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './CitiesPitsunda.module.scss';

// Полное описание города Пицунда
const pitsundaDescription = `Пицунда — приморский курортный город в Гагрском районе Абхазии, расположенный на одноимённом мысе Черноморского побережья Кавказа, в 25 км южнее Гагры. Благодаря уникальному микроклимату, созданному сочетанием моря, гор и сосновых рощ, Пицунда славится как один из лучших климатических курортов региона. Зима здесь мягкая, со средней температурой января около +5°C, а лето тёплое и влажное, с июльскими показателями около +25°C. Морская вода прогревается до +28°C, что делает пляжный сезон особенно комфортным.

Пицунда — город с богатой историей, основанный греческими колонистами в V веке до н.э. под названием Питиунт. В древности это был крупный и богатый город, а в Средние века — важный политический и религиозный центр. Здесь сохранилась Пицундская соборная церковь X века, построенная царём Грузии Багратом III, с фресками XIII и XVI веков. В советское время Пицунда стала излюбленным местом отдыха — сам Никита Хрущёв предпочитал проводить здесь отпуск. Именно в Пицунде в 1964 году его отстранили от власти, пока он находился на отдыхе.

Город окружён живописной природой: сосновые и самшитовые рощи, чистейшие пляжи с мелкой галькой и прозрачной водой. Неподалёку протекает река Бзыбь, а в горах можно посетить озеро Рица, популярное среди туристов. Пицунда известна своим реликтовым сосновым массивом, который создаёт целебный воздух, богатый фитонцидами. В городе есть санатории, пансионаты и отели, а также множество кафе и развлечений для гостей.

Исторически Пицунда пережила сложные времена. В 1992–1993 годах, во время грузино-абхазского конфликта, город пострадал, но разрушения были минимальными по сравнению с другими регионами. Сегодня Пицунда активно развивается как курорт: в 2007 году она получила статус города, что дало толчок к обновлению инфраструктуры. Здесь ремонтируются дороги, открываются новые гостиницы, а местные власти стремятся сохранить природное и культурное наследие.

Одно из популярных мест для прогулок — набережная Пицунды, откуда открывается вид на море и горы. Туристы также любят посещать мыс Пицунда, где можно насладиться панорамными видами и свежим морским бризом. В городе действует небольшой краеведческий музей, рассказывающий об истории региона, а в окрестностях сохранились руины древнего Питиунта.

Из Пицунды легко добраться до других городов Абхазии: Сухума, Гагры или Нового Афона. Автобусное сообщение связывает курорт с российскими городами, такими как Сочи, а ближайший аэропорт находится в Сухуме — «Бабушара». Городской транспорт представлен маршрутками, а для передвижения по побережью популярны такси.`;

// Список категорий для Пицунды
const pitsundaItems: string[] = [
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

const CitiesPitsunda: React.FC = () => {
  const router = useRouter();

  const handleItemClick = (item: string) => {
    if (!activeCategories.includes(item)) {
      return;
    }

    switch (item) {
      case 'Административные здания':
        router.push('/administrative-buildings/Pitsunda');
        break;
      case 'Аптеки':
        router.push('/pharmacy/Pitsunda');
        break;
      case 'Винодельни':
        router.push('/wineries/Pitsunda');
        break;
      case 'Заправки':
        router.push('/gas-stations/Pitsunda');
        break;
      case 'Культурные достопримечательности':
        router.push('/cultural-attractions/Pitsunda');
        break;
      case 'Магазины и рынки':
        router.push('/shops-and-markets/Pitsunda');
        break;
      case 'Мойки':
        router.push('/car-washes/Pitsunda');
        break;
      case 'Отели':
        router.push('/hotels/Pitsunda');
        break;
      case 'Пляжи':
        router.push('/beaches/Pitsunda');
        break;
      case 'Рестораны':
        router.push('/restaurants/Pitsunda');
        break;
      case 'Салоны красоты':
        router.push('/beauty-salons/Pitsunda');
        break;
      case 'Церкви':
        router.push('/churches/Pitsunda');
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.pitsundaWrapper}>
      <main className={styles.pitsundaContent}>
        <h1 className={styles.pitsundaTitle}>ПИЦУНДА</h1>

        {/* Баннер с фоновым изображением */}
        <section className={styles.pitsundaBanner}>
          <Image
            src="/assets/city_pitsunda.jpg"
            alt="Вид на город Пицунда"
            fill
            priority
            className={styles.pitsundaImage}
          />
        </section>

        {/* Описание города */}
        <section className={styles.pitsundaDescription}>
          {pitsundaDescription.split('\n\n').map((para, idx) => (
            <p key={idx} className={styles.pitsundaParagraph}>
              {para}
            </p>
          ))}
        </section>

        {/* Список категорий */}
        <section className={styles.pitsundaListSection}>
          <ul className={styles.pitsundaList}>
            {pitsundaItems.map((item) => {
              const isClickable = activeCategories.includes(item);
              return (
                <li
                  key={item}
                  className={`${styles.pitsundaListItem} ${
                    isClickable ? styles.clickable : styles.disabled
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className={styles.pitsundaArrow} />
                  <span className={styles.pitsundaItemText}>{item}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CitiesPitsunda; 