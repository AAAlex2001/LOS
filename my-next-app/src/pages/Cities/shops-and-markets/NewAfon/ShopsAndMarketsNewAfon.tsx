'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './ShopsAndMarketsNewAfon.module.scss';

const shopsAndMarkets = [
  {
    id: 1,
    name: 'Магазин Продукты',
    workingHours: 'с 09:00 до 23:00',
    address: 'Новый Афон, ул. Харазия, 2',
    addressLink: 'https://yandex.com/maps/-/CDxcyPyL',
    contacts: null,
    image: '/assets/ShopAndMarketsNewAfon1.jpg',
    name_link: null,
  },
  {
    id: 2,
    name: 'Продуктовый рынок',
    workingHours: 'с 08:00 до 18:00',
    address: 'Гудаутский район, Новый Афон, улица Харазия',
    addressLink: 'https://yandex.com/maps/-/CDxc5A3B',
    contacts: null,
    image: '/assets/ShopAndMarketsNewAfon2.jpg',
    name_link: null,
  },
  {
    id: 3,
    name: 'Продукты',
    workingHours: 'с 09:00 до 22:00',
    address: 'Гудаутский район, Новый Афон, улица Эшба',
    addressLink: 'https://yandex.com/maps/-/CDxc5Qou',
    contacts: null,
    image: '/assets/ShopAndMarketsNewAfon3.jpg',
    name_link: null,
  },
  {
    id: 4,
    name: 'Магазин Светлана',
    workingHours: null,
    address: 'Гудаутский район, Новый Афон, улица Ладария',
    addressLink: 'https://yandex.com/maps/-/CDxc5NmM',
    contacts: null,
    image: '/assets/ShopAndMarketsNewAfon4.jpg',
    name_link: null,
  },
  {
    id: 5,
    name: 'Мясная лавка',
    workingHours: 'с 09:00 16:00',
    address: 'Гудаутский район, Новый Афон, улица Кяхба',
    addressLink: 'https://yandex.com/maps/-/CDxc5K4w',
    contacts: '+7 (940) 711-29-38',
    image: '/assets/ShopAndMarketsNewAfon5.jpg',
    name_link: null,
  },
];

const ShopsAndMarketsNewAfon: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Новый Афон: Магазины, рынки</h1>
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

export default ShopsAndMarketsNewAfon;