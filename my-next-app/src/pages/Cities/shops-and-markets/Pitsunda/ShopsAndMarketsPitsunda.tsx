'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './ShopsAndMarketsPitsunda.module.scss';

const shopsAndMarkets = [
  {
    id: 1,
    name: 'Олимп-1',
    workingHours: 'с 08:00 до 22:30',
    address: 'Гагрский район, Пицунда, Транспортная улица',
    addressLink: 'https://yandex.com/maps/-/CDHSJLoT',
    contacts: null,
    image: '/assets/ShopAndMarketsPitsunda1.jpg',
    name_link: null,
  },
  {
    id: 2,
    name: 'Весна',
    workingHours: 'с 09:00 до 22:00',
    address: 'Гагрский район, посёлок Цитрусовый',
    addressLink: 'https://yandex.com/maps/-/CDHpj2Kv',
    contacts: null,
    image: '/assets/ShopAndMarketsPitsunda2.jpg',
    name_link: null,
  },
  {
    id: 3,
    name: 'Продуктовый магазин',
    workingHours: 'с 08:00 до 23:00',
    address: 'ул. Агрба, 3/1',
    addressLink: 'https://yandex.com/maps/-/CDHprYNY',
    contacts: null,
    image: '/assets/ShopAndMarketsPitsunda3.jpg',
    name_link: null,
  },
  {
    id: 4,
    name: 'Rita',
    workingHours: 'с 08:00 до 22:00',
    address: 'ул. Агрба, 9/1',
    addressLink: 'https://yandex.com/maps/-/CDHpr0Pl',
    contacts: '+7 (940) 925-35-00',
    image: '/assets/ShopAndMarketsPitsunda4.jpg',
    name_link: null,
  },
  {
    id: 5,
    name: 'Маркет АХАН',
    workingHours: 'с 08:00 до 23:00',
    address: 'Гагрский район, Пицунда, улица Гочуа',
    addressLink: 'https://yandex.com/maps/-/CDHpvRkA',
    contacts: null,
    image: '/assets/ShopAndMarketsPitsunda5.jpg',
    name_link: null,
  },
  {
    id: 6,
    name: 'Продукты',
    workingHours: 'с 09:00 до 22:00',
    address: 'Гагрский район, Пицунда',
    addressLink: 'https://yandex.com/maps/-/CDHpvZk8',
    contacts: null,
    image: '/assets/ShopAndMarketsPitsunda6.jpg',
    name_link: null,
  },
  {
    id: 7,
    name: 'Магазин продуктов Эконом',
    workingHours: 'с 08:00 до 23:00',
    address: 'Гагрский район, Пицунда, улица Гицба',
    addressLink: 'https://yandex.com/maps/-/CDHpzRIc',
    contacts: null,
    image: '/assets/ShopAndMarketsPitsunda7.jpg',
    name_link: null,
  },
  {
    id: 8,
    name: 'У Моря',
    workingHours: 'с 08:00 до 22:00',
    address: 'Кипарисовая аллея, 47',
    addressLink: 'https://yandex.com/maps/-/CDHp7U2P',
    contacts: null,
    image: '/assets/ShopAndMarketsPitsunda8.jpg',
    name_link: null,
  },
  {
    id: 9,
    name: 'Мясная Лавка',
    workingHours: 'с 09:00 до 20:00',
    address: 'Гагрский район, Пицунда, Тополёвая улица',
    addressLink: 'https://yandex.com/maps/-/CDHp7O7a',
    contacts: null,
    image: '/assets/ShopAndMarketsPitsunda9.jpg',
    name_link: null,
  },
  {
    id: 10,
    name: 'Продуктовый Рынок',
    workingHours: 'с 08:00 до 16:00',
    address: 'Гагрский район, Пицунда ул. Агрба 96',
    addressLink: 'https://yandex.com/maps/-/CDHp7-LW',
    contacts: null,
    image: '/assets/ShopAndMarketsPitsunda10.jpg',
    name_link: null,
  },
  {
    id: 11,
    name: 'Рыбный магазин',
    workingHours: 'с 09:00 до 19:00',
    address: 'Гагрский район, Пицунда, улица Агрба',
    addressLink: 'https://yandex.com/maps/-/CDHtEDMQ',
    contacts: null,
    image: '/assets/ShopAndMarketsPitsunda11.jpg',
    name_link: null,
  },
  {
    id: 12,
    name: 'Магазин продуктов',
    workingHours: 'с 09:00 до 22:00',
    address: 'Гагрский район, село Лдзаа, Виноградная улица',
    addressLink: 'https://yandex.com/maps/-/CDHtYWyr',
    contacts: null,
    image: '/assets/ShopAndMarketsPitsunda12.jpg',
    name_link: null,
  },
];

const ShopsAndMarketsPitsunda: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Пицунда: Магазины, рынки</h1>
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
                <h2 className={styles.shopName}>
                  {shop.name_link ? (
                    <a href={shop.name_link} target="_blank" rel="noopener noreferrer">
                      {shop.name}
                    </a>
                  ) : (
                    shop.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  {shop.workingHours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Режим работы:</span>
                      <span className={styles.infoValue}>{shop.workingHours}</span>
                    </div>
                  )}
                  
                  {shop.address && (
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
                  )}
                  
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

export default ShopsAndMarketsPitsunda;
