'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './CulturalAttractionsTkuarchal.module.scss';

const attractions = [
  {
    id: 1,
    name: 'Остатки канатной дороги',
    description: 'Ткварчельская канатная дорога — отключенное от работы сооружение, расположенное вблизи, собственно, города Ткуарчал. Географическое положение поселения, разделенного на две половины, требовало создания различных транспортных маршрутов.\n\nВ качестве одного из таких путей был построен воздушный путь, сопровождаемый длинной лестницей и кольцевой автодорогой. Он предоставлял как гражданские, так и грузовые линии, используемые для транспортировки угля.\n\nНачиная с конца 20 века множество используемых механизмов стали неисправны из-за вооруженного конфликта. Ранее вагон над городком был символом печального состояния Ткуарчала. Сегодня здесь также есть на что посмотреть во время экскурсии.',
    address: 'проспект Свободы, 28',
    addressLink: 'https://yandex.com/maps/-/CDxdfAId',
    image: '/assets/CulturalAttractionsTkuarchal1.jpg',
  },
  {
    id: 2,
    name: 'Заброшенный виадук',
    description: 'Виадук — это железнодорожное сооружение, построенное над глубоким оврагом или горным ущельем, состоящее из камня, железобетона или металла. Когда-то этот мост служил для перевозки угля в окрестности.\n\nТеперь поезда здесь больше не ездят, но он продолжает впечатлять своей величественной архитектурой и входит в список символов этого города. На пути из Ткуарчала в Акармару можно ясно увидеть этот виадук, захватывающий взгляд своей красотой.\n\nСтроительство комплекса было осуществлено пленными немецкими инженерами — на тот момент виадук стал единственным мостом в СССР с таким изящным изгибом. Когда вы поднимаетесь по автодороге, природа вокруг просто поражает. Вершины и облака сменяются, буйная растительность окутывает все вокруг, а внизу слышен шум горной реки.',
    address: 'Виадук, Ткуарчал',
    addressLink: 'https://yandex.com/maps/-/CDxdfJP0',
    image: '/assets/CulturalAttractionsTkuarchal2.jpg',
  },
  {
    id: 3,
    name: 'Заброшенная Ткварчельская ГРЭС',
    description: 'Быстрые темпы развития угольной индустрии в регионе подтолкнули правительство Абхазии к постройке Ткварчельской ГРЭС. В 1935 года электростанция начала свою работу. Долгое время она обеспечивала промышленность региона электрическими мощностями.\n\nСейчас это тоже заброшенное строение. Из всех уголков города видна возвышающаяся труба ГРЭС, добротно построенная немецкими инженерами.\n\nЗаводские постройки покрыты ржавчиной и пылью, а разбросанные по всему периметру оборудование и документация придают этому месту удручающий вид. Но туристы по-прежнему приходят сюда, чтобы посмотреть огромные былые масштабы советской энергетики.',
    address: 'Ткварчельская ГРЭС',
    addressLink: 'https://yandex.com/maps/-/CDxdf0~7',
    image: '/assets/CulturalAttractionsTkuarchal3.jpg',
  },
  {
    id: 4,
    name: 'Смотровая площадка «Рука»',
    description: 'Смотровая площадка «Рука»\n\nНаходится в Восточной Абхазии в городе Ткуарчал. С нее открывается шикарный вид на гору Лашкиндар и знаменитый железнодорожный мост, соединяющий город с шахтерским поселком Акармара. Внизу парящей над пропастью ладонью бурно протекает река Аалдзга.\n\nСмотровая площадка в виде открытой ладони символизирует гостеприимство Абхазии.',
    address: 'Смотровая площадка «Рука», Ткуарчал',
    image: '/assets/CulturalAttractionsTkuarchal4.jpg',
  },
  {
    id: 5,
    name: 'Заброшенный железнодорожный вокзал Ткуарчал в Абхазии',
    description: 'Железнодорожная станция в Ткуарчале была разрушена при обстреле города в годы Отечественной войны народа Абхазии. Была разрушена крыша здания, следы снарядов остались на стенах, выбиты окна.\n\nСейчас здание заброшено, заросло плющом и сорняками. До станции часто доходят туристы, которых завораживает "дикая" красота разрушенного здания. В сети, в блогах туристов можно увидеть много фото станции.',
    address: 'Железнодорожный вокзал, Ткуарчал',
    image: '/assets/CulturalAttractionsTkuarchal5.jpg',
  },
];

const CulturalAttractionsTkuarchal: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Ткуарчал: культурные достопримечательности</h1>
        </section>

        <section className={styles.attractionsSection}>
          {attractions.map((attraction) => (
            <article key={attraction.id} className={styles.attractionCard}>
              <h2 className={styles.attractionName}>{attraction.name}</h2>
              <div className={styles.imageContainer}>
                <Image
                  src={attraction.image}
                  alt={attraction.name}
                  fill
                  className={styles.attractionImage}
                />
              </div>
              <div className={styles.attractionDescription}>
                {attraction.description.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <p className={styles.attractionAddress}>
                <strong>Адрес: </strong>
                {attraction.addressLink ? (
                  <a href={attraction.addressLink} target="_blank" rel="noopener noreferrer">
                    {attraction.address}
                  </a>
                ) : (
                  attraction.address
                )}
              </p>
            </article>
          ))}
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default CulturalAttractionsTkuarchal;