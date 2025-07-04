'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './HotelsOchamchira.module.scss';

// Данные отелей
const hotels = [
  {
    id: 1,
    name: 'Тамыш Village',
    address: 'Очамчырский район, село Тамыш',
    addressLink: 'https://yandex.ru/maps/-/CDBW6Vmm',
    contacts: '+7(940)723-24-77',
    price: '5500р за ночь для двух гостей',
    image: '/assets/HotelsOchamchira1.jpg',
  },
  {
    id: 2,
    name: 'Черноморская жемчужина',
    address: 'ул. Баграта Шинкуба, 173',
    addressLink: 'https://yandex.ru/maps/-/CDBW6GYT',
    contacts: '+7 (940) 714-75-55',
    price: '6000р',
    image: '/assets/HotelsOchamchira2.jpg',
  },
];

const HotelsOchamchira: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Очамчыра: отели</h1>
        </section>

        <section className={styles.cardsSection}>
          {hotels.map((hotel) => (
            <div key={hotel.id} className={styles.hotelCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className={styles.hotelImage}
                />
              </div>

              <div className={styles.infoContainer}>
                <h2 className={styles.hotelName}>{hotel.name}</h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${hotel.addressLink ? styles.addressLink : ''}`}>
                      {hotel.addressLink ? (
                        <a href={hotel.addressLink} target="_blank" rel="noopener noreferrer">{hotel.address}</a>
                      ) : (
                        hotel.address
                      )}
                    </span>
                  </div>
                  
                  {hotel.contacts && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Контакты:</span>
                      <span className={styles.infoValue}>{hotel.contacts}</span>
                    </div>
                  )}

                  {hotel.price && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Цена:</span>
                      <span className={styles.infoValue}>{hotel.price}</span>
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

export default HotelsOchamchira; 