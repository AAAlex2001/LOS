'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './CulturalAttractionsGal.module.scss';

const attractions = [
  {
    id: 1,
    name: 'Гальское водохранилище',
    description: 'Гальское водохранилище — поистине недооцененное туристами место. Локация не так популярна, как например озеро Рица, поэтому там можно созерцать природу без существенного вмешательства человечества и при этом относительно вдали от цивилизации. Лазурного цвета вода, вокруг лес и чайные плантации.\n\nВодохранилище настолько большое, что иногда его называют Гальским «морем». Водоем имеет историческую ценность, его начали строить ещё в 1961 году. Пока эту уникальную прелесть не популяризировали, там можно посидеть с близкими на пикнике в уединении с природой, наслаждаясь свежим воздухом.',
    address: 'Гальское водохранилище',
    addressLink: 'https://yandex.com/maps/-/CDxdm-3A',
    image: '/assets/CulturalAttractionsGal1.jpg',
  },
  {
    id: 2,
    name: 'Городской Дом Культуры',
    description: 'Дом культуры — это двухэтажное серое здание, расположенное у парка Векуи. Он действующий, концерты в нем до сих пор проходят весьма регулярно.\n\nНа праздниках выступают как местные исполнители, так и выпускники художественных и музыкальных школ Сухума и Гудауты. Горожане, посещающие мероприятия, отзываются о них как о максимально экспрессивных и приятных зрелищах.\n\nМожет быть, некоторым отпускникам повезёт побывать в Гале во время работы Дома Культуры, и они застанут на сцене артистов из Сухума, а может и из РФ.',
    address: 'ул. Леона, 1',
    addressLink: 'https://yandex.com/maps/-/CDxdqJZm',
    image: '/assets/CulturalAttractionsGal2.jpg',
  },
  {
    id: 3,
    name: 'Ингурская ГЭС',
    description: 'Недалеко от города Джвари, на границе Абхазии и Грузии расположено одно из самых красивых водохранилищ в мире. Ингурская ГЭС – крупнейшая на Кавказе гидроэлектростанция на реке Ингури. Строительные работы здесь начались в 1961 году и завершились в 1977. Основу строительства Ингури ГЭС заложил общественный деятель Грузии Нико Николадзе. Одной из составляющих частей гидроэлектростанции является плотина, общая высота которой составляет 271,5 метра, а длина 728 метров. Протяжённость водохранилище достигает 27 км, а вода здесь бирюзовая.  Строительство плотины началось в мирные времена. А вот после грузино-абхазского конфликта оказалось, что часть сооружений находятся на грузинской территории, а часть – на абхазской. Если очень условно, энергия начинает вырабатываться на дамбе в Сванетии, а заканчивает на электростанции уже в Абхазии. В связи с этим ГЭС принято считать общей. Выработка электроэнергии здесь делится в пропорции 60 на 40 в пользу Грузии.',
    address: 'Ингурская ГЭС',
    image: '/assets/CulturalAttractionsGal3.jpg',
  },
];

const CulturalAttractionsGal: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Гал: культурные достопримечательности</h1>
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

export default CulturalAttractionsGal;