'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './ShopsAndMarketsGagra.module.scss';

const shopsAndMarkets = [
  {
    id: 1,
    name: 'Продукты',
    workingHours: 'ежедневно с 09:00 до 20:00',
    address: 'просп. Ардзинба, 90а',
    addressLink: 'https://yandex.ru/maps/-/CDS-4PJL',
    contacts: null,
    image: '/assets/ShopAndMarketsGagra1.jpg',
    nameLink: null,
  },
  {
    id: 2,
    name: 'Продуктов',
    workingHours: 'ежедневно с 09:00 до 22:00',
    address: 'просп. Ардзинба, 120',
    addressLink: 'https://yandex.ru/maps/-/CDS-4T6G',
    contacts: null,
    image: '/assets/ShopAndMarketsGagra2.jpg',
    nameLink: null,
  },
  {
    id: 3,
    name: 'Вкусы Абхазии',
    workingHours: 'ежедневно с 08:00 до 02:00',
    address: 'ул. Апсха-Леона, 9',
    addressLink: 'https://yandex.ru/maps/-/CDS-42j~',
    contacts: '+7 (940) 712-80-84',
    image: '/assets/ShopAndMarketsGagra3.jpg',
    nameLink: null,
  },
  {
    id: 4,
    name: 'Магазин Продуктов',
    workingHours: 'ежедневно с 09:00 до 22:00',
    address: 'Гагра, Южная улица',
    addressLink: 'https://yandex.ru/maps/-/CDS-aA6a',
    contacts: null,
    image: '/assets/ShopAndMarketsGagra4.jpg',
    nameLink: null,
  },
  {
    id: 5,
    name: 'Минимаркет Гагра',
    workingHours: 'ежедневно с 08:00 до 23:00',
    address: 'ул. Абазгаа, 55/1',
    addressLink: 'https://yandex.ru/maps/-/CDS-aEIW',
    contacts: '+79409953925',
    image: '/assets/ShopAndMarketsGagra5.jpg',
    nameLink: null,
  },
  {
    id: 6,
    name: 'Шафран',
    workingHours: 'ежедневно с 08:00 до 18:00',
    address: 'ул. Абазгаа, 68/1',
    addressLink: 'https://yandex.ru/maps/-/CDS-aIyc',
    contacts: '+7 (940) 962-74-02',
    image: '/assets/ShopAndMarketsGagra6.jpg',
    nameLink: null,
  },
  {
    id: 7,
    name: 'Гагрский рынок',
    workingHours: 'ежедневно с 07:00 до 17:00',
    address: 'ул. Абазгаа, 68/1',
    addressLink: 'https://yandex.ru/maps/-/CDS-aIol',
    contacts: '+7 (940) 994-66-10',
    image: '/assets/ShopAndMarketsGagra7.jpg',
    nameLink: null,
  },
  {
    id: 8,
    name: 'Продукты (7) – Я',
    workingHours: 'круглосуточно',
    address: 'ул. Лакоба, 8А',
    addressLink: 'https://yandex.ru/maps/-/CDS-aU2j',
    contacts: null,
    image: '/assets/ShopAndMarketsGagra8.jpg',
    nameLink: null,
  },
];

const ShopsAndMarketsGagra: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Гагра: Магазины, рынки</h1>
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
                  {shop.nameLink ? (
                    <a href={shop.nameLink} target="_blank" rel="noopener noreferrer">
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

export default ShopsAndMarketsGagra;
