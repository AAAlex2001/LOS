'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './ShopsAndMarketsSukhum.module.scss';

// Данные магазинов и рынков
const shopsAndMarkets = [
  {
    id: 1,
    name: 'Центральный рынок',
    workingHours: 'с 09:00 до 15:00',
    address: 'Сухум, Центральный район',
    addressLink: 'https://yandex.com/maps/-/CDXcB-63',
    image: '/assets/ShopAndMarketsSukhum1.jpg',
  },
  {
    id: 2,
    name: 'Марфа',
    workingHours: 'с 09:00 до 23:00',
    address: 'Сухум, ул. Званба, 26',
    addressLink: 'https://yandex.com/maps/-/CDXcJPJy',
    image: '/assets/ShopAndMarketsSukhum2.png',
  },
  {
    id: 3,
    name: 'Артем',
    workingHours: 'круглосуточно',
    address: 'Сухум, ул. Лакоба, 57',
    addressLink: 'https://yandex.com/maps/-/CDXcrGnt',
    image: '/assets/ShopAndMarketsSukhum3.png',
  },
  {
    id: 4,
    name: 'Cherez',
    workingHours: 'с 09:00 до 22:00',
    address: 'Сухум, наб. Махаджиров, 58',
    addressLink: 'https://yandex.com/maps/-/CDXcrO3C',
    image: '/assets/ShopAndMarketsSukhum4.png',
  },
  {
    id: 5,
    name: 'Супермаркет Сухум',
    workingHours: 'с 09:00 до 23:00',
    address: 'Сухум, ул. Когония, 50А',
    image: '/assets/ShopAndMarketsSukhum5.png',
  },
  {
    id: 6,
    name: 'Перекресток',
    workingHours: 'с 08:00 до 00:00',
    address: 'Сухум Улица Джонуа, 9',
    addressLink: 'https://yandex.com/maps/-/CDXcvWyC',
    image: '/assets/ShopAndMarketsSukhum6.png',
  },
  {
    id: 7,
    name: 'Амбар',
    workingHours: 'с 09:00 до 00:00',
    address: 'Улица Ардзинба, 93',
    addressLink: 'https://yandex.com/maps/-/CDXczU~E',
    image: '/assets/ShopAndMarketsSukhum7.png',
  },
  {
    id: 8,
    name: 'Магнит',
    workingHours: 'с 08:00 до 20:30',
    address: 'Улица Вардания, 9',
    addressLink: 'https://yandex.com/maps/-/CDXczD1a',
    image: '/assets/ShopAndMarketsSukhum8.png',
  },
  {
    id: 9,
    name: 'Баракьат',
    workingHours: 'с 09:00 до 21:00',
    address: 'Сухум, ул. Лакоба, 88',
    addressLink: 'https://yandex.com/maps/-/CDXc7D6M',
    image: '/assets/ShopAndMarketsSukhum9.png',
  },
  {
    id: 10,
    name: 'Райда',
    workingHours: 'с 09:00 до 22:00',
    address: 'Сухум, ул. Генерала Дбар, 31',
    addressLink: 'https://yandex.com/maps/-/CDXgAYKC',
    image: '/assets/ShopAndMarketsSukhum10.png',
  },
  {
    id: 11,
    name: 'Сухум Маркет',
    workingHours: 'с 09:00 до 23:00',
    address: 'Улица Эшба, 166',
    addressLink: 'https://yandex.com/maps/-/CDXgIGIW',
    contacts: '+7 (940) 779-34-20',
    image: '/assets/ShopAndMarketsSukhum11.png',
  },
  {
    id: 12,
    name: 'Магазин продуктов',
    workingHours: 'с 09:00 до 21:00',
    address: 'Сухум, ул. Джонуа, 49',
    addressLink: 'https://yandex.com/maps/-/CDXgI2Jn',
    image: '/assets/ShopAndMarketsSukhum12.png',
  },
  {
    id: 13,
    name: 'Кормилица',
    workingHours: 'с 08:00 до 22:00',
    address: 'Сухум, ул. Гулиа, 120',
    addressLink: 'https://yandex.com/maps/-/CDXgML7R',
    image: '/assets/ShopAndMarketsSukhum13.png',
  },
  {
    id: 14,
    name: 'Делкатес',
    workingHours: 'с 08:00 до 22:00',
    address: 'Сухум, ул. Бубновой, 35',
    addressLink: 'https://yandex.com/maps/-/CDXgQ41z',
    image: '/assets/ShopAndMarketsSukhum14.png',
  },
  {
    id: 15,
    name: 'Продукты',
    workingHours: 'с 09:00 до 22:00',
    address: 'Сухум, улица Чанба',
    addressLink: 'https://yandex.com/maps/-/CDhUj8ou',
    image: '/assets/ShopAndMarketsSukhum15.png',
  },
  {
    id: 16,
    name: 'Волна',
    workingHours: 'с 08:00 до 01:00',
    address: 'Сухум, ул. Лакоба, 105',
    addressLink: 'https://yandex.com/maps/-/CDhUnNyK',
    image: '/assets/ShopAndMarketsSukhum16.png',
  },
  {
    id: 17,
    name: 'Ассир',
    workingHours: 'с 09:00 до 21:00',
    address: 'г.Сухум ул. Аидгылара 32',
    image: '/assets/ShopAndMarketsSukhum17.jpg',
  },
];

const ShopsAndMarketsSukhum: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Сухум: Магазины, рынки</h1>
        </section>

        <section className={styles.cardsSection}>
          {shopsAndMarkets.map((shop) => (
            <div key={shop.id} className={styles.shopCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={shop.image}
                  alt={shop.name}
                  fill
                  className={styles.shopImage}
                />
              </div>

              <div className={styles.infoContainer}>
                <h2 className={styles.shopName}>{shop.name}</h2>
                
                <div className={styles.infoBlock}>
                  {shop.workingHours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Режим работы:</span>
                      <span className={styles.infoValue}>{shop.workingHours}</span>
                    </div>
                  )}
                  
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${shop.addressLink ? styles.addressLink : ''}`}>
                      {shop.addressLink ? (
                        <a href={shop.addressLink} target="_blank" rel="noopener noreferrer">{shop.address}</a>
                      ) : (
                        shop.address
                      )}
                    </span>
                  </div>
                  
                  {shop.contacts && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Контакты:</span>
                      <span className={styles.infoValue}>{shop.contacts}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ShopsAndMarketsSukhum; 