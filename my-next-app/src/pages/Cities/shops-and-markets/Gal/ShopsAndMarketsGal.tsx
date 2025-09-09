'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './ShopsAndMarketsGal.module.scss';

const shopsAndMarkets = [
  {
    id: 1,
    name: 'Магия вкуса',
    workingHours: 'с 08:00 до 22:00',
    address: 'Гал, Самурзаканская улица',
    addressLink: 'https://yandex.com/maps/-/CDxdqT1v',
    contacts: null,
    image: '/assets/ShopAndMarketsGal1.jpg',
    name_link: null,
  },
  {
    id: 2,
    name: 'Рынок',
    workingHours: 'среда, пятница ,суббота, воскресенье с 07:00 до 14:00',
    address: null,
    addressLink: null,
    contacts: null,
    image: '/assets/ShopAndMarketsGal2.jpg',
    name_link: null,
  },
];

const ShopsAndMarketsGal: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Гал: Магазины, рынки</h1>
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

export default ShopsAndMarketsGal;
