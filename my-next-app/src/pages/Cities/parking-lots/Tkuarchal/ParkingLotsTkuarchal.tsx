'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './ParkingLotsSukhum.module.scss';

// Данные парковок
const parkingLots = [
  {
    id: 1,
    name: 'Парковка',
    address: 'г. Сухум , ул.Эшба 166',
    addressLink: 'https://www.google.com/maps/place/166+Eshba+St,+Sochumi/data=!4m2!3m1!1s0x405f2269189966f9:0xbfb190c2cf3f48ec?sa=X&ved=1t:242&ictx=111',
    image: '/assets/ParkingLotsSukhum1.jpg',
  },
  {
    id: 2,
    name: 'Парковка',
    address: 'г. Сухум , Кодорское шоссе 665',
    addressLink: 'https://www.google.com/maps/place/665+Kodori+Hwy,+Sokhumi/data=!4m2!3m1!1s0x405f203330612ff3:0xdd80f796f258113c?sa=X&ved=1t:242&ictx=111',
    image: '/assets/ParkingLotsSukhum2.jpg',
  },
  {
    id: 3,
    name: 'Парковка у пляжа Мокко',
    address: 'г. Сухум Мокко Пляж',
    addressLink: 'https://maps.app.goo.gl/iv7Kxunm2NvTb9vv9',
    image: '/assets/ParkingLotsSukhum3.jpg',
  },
  {
    id: 4,
    name: 'Парковка',
    address: 'г. Сухум, Кодорское шоссе',
    addressLink: 'https://maps.app.goo.gl/DKPBtynWm4qu1ZhLA',
    image: '/assets/ParkingLotsSukhum4.jpg',
  },
  {
    id: 5,
    name: 'Парковка',
    address: 'г. Сухум, Кодорское шоссе 57',
    addressLink: 'https://maps.app.goo.gl/3NKxiQwMZiA34Fd89',
    image: '/assets/ParkingLotsSukhum5.jpg',
  },
  {
    id: 6,
    name: 'Парковка',
    address: 'г. Сухум, ул. Аидгылара',
    addressLink: 'https://maps.app.goo.gl/EtaMaKjAzH4ENMh1A',
    image: '/assets/ParkingLotsSukhum6.jpg',
  },
];

const ParkingLotsSukhum: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Сухум: парковки для автомобилей</h1>
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

export default ParkingLotsSukhum; 