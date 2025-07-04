'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './ParkingLotsNewAfon.module.scss';

// Данные парковок
const parkingLots = [
  {
    id: 1,
    name: 'Автомобильная парковка',
    address: 'Гудаутский район, Новый Афон , ул. Кяхба',
    addressLink: null,
    contacts: '+79407507770',
    workingHours: 'с 08:00 до 21:00',
    price: '150руб.',
    image: '/assets/city_newafon.jpg',
  },
];

const ParkingLotsNewAfon: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Новый Афон: парковки для автомобилей</h1>
        </section>

        <section className={styles.cardsSection}>
          {parkingLots.map((lot) => (
            <div key={lot.id} className={styles.parkingLotCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={lot.image}
                  alt={lot.name}
                  fill
                  className={styles.parkingLotImage}
                />
              </div>

              <div className={styles.infoContainer}>
                <h2 className={styles.parkingLotName}>{lot.name}</h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${lot.addressLink ? styles.addressLink : ''}`}>
                      {lot.addressLink ? (
                        <a href={lot.addressLink} target="_blank" rel="noopener noreferrer">{lot.address}</a>
                      ) : (
                        lot.address
                      )}
                    </span>
                  </div>

                  {lot.contacts && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Контакты:</span>
                      <span className={styles.infoValue}>{lot.contacts}</span>
                    </div>
                  )}

                  {lot.workingHours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Часы работы:</span>
                      <span className={styles.infoValue}>{lot.workingHours}</span>
                    </div>
                  )}

                  {lot.price && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Цена:</span>
                      <span className={styles.infoValue}>{lot.price}</span>
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

export default ParkingLotsNewAfon; 