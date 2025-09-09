'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './ShopsAndMarketsGudauta.module.scss';

const shopsAndMarkets = [
  {
    id: 1,
    name: 'Premium market',
    workingHours: 'с 09:00 до 22:30',
    address: 'Гудаута, ул. Дзидзария, 34',
    addressLink: 'https://yandex.com/maps/-/CDxGvRLE',
    contacts: '+7 (940) 910-39-59',
    image: '/assets/ShopAndMarketsGudauta1.jpg',
    name_link: 'http://instagram.com/premium_abkhazia',
  },
  {
    id: 2,
    name: 'Городской рынок',
    workingHours: 'с 08: 00 до 17:00',
    address: 'Гудаута, ул. 23 Июля 25',
    addressLink: 'https://yandex.com/maps/-/CDxGv0ph',
    contacts: null,
    image: '/assets/ShopAndMarketsGudauta2.jpg',
    name_link: null,
  },
  {
    id: 3,
    name: 'Premium market',
    workingHours: 'с 09:00 до 22:30',
    address: 'Гудаута, ул. Чанба 6',
    addressLink: 'https://yandex.com/maps/-/CDxKIWiT',
    contacts: null,
    image: '/assets/ShopAndMarketsGudauta3.jpg',
    name_link: null,
  },
  {
    id: 4,
    name: 'Foodmarket',
    workingHours: 'с 09:00 до 22:00',
    address: 'Гудаута, ул. 4 Марта, 8',
    addressLink: 'https://yandex.com/maps/-/CDxKI-7J',
    contacts: null,
    image: '/assets/ShopAndMarketsGudauta4.jpg',
    name_link: null,
  },
  {
    id: 5,
    name: 'Вавилон',
    workingHours: 'с 09:00 до 19:00',
    address: 'Гудаута, ул. Тарнава, 16',
    addressLink: 'https://yandex.com/maps/-/CDxKQE0D',
    contacts: '+7 (940) 920-62-00',
    image: '/assets/ShopAndMarketsGudauta5.jpg',
    name_link: 'https://vavilongu.ru/',
  },
  {
    id: 6,
    name: 'Нарт',
    workingHours: 'с 08:00 до 22:00',
    address: 'Гудаута, ул. Трапш, 20',
    addressLink: 'https://yandex.com/maps/-/CDxKQJp1',
    contacts: null,
    image: '/assets/ShopAndMarketsGudauta6.jpg',
    name_link: null,
  },
  {
    id: 7,
    name: 'Пятерочка',
    workingHours: 'с 09:00 до 22:00',
    address: 'Гудаутский район',
    addressLink: 'https://yandex.com/maps/-/CDxKQW~v',
    contacts: null,
    image: '/assets/ShopAndMarketsGudauta7.jpg',
    name_link: null,
  },
];

const ShopsAndMarketsGudauta: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Гудаута: Магазины, рынки</h1>
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

export default ShopsAndMarketsGudauta;
