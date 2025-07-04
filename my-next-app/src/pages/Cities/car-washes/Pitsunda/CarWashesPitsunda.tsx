'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './CarWashesPitsunda.module.scss';

const carWashes: {
  id: number;
  name: string;
  nameLink?: string;
  workingHours?: string;
  address: string;
  addressLink?: string;
  contacts?: string;
  image: string;
}[] = [
  {
    id: 1,
    name: 'Мойка самообслуживания',
    workingHours: 'круглосуточно',
    address: 'Пицундское шоссе',
    addressLink: 'https://yandex.com/maps/-/CDHteS9I',
    image: '/assets/CarWashesPitsunda1.jpg'
  },
  {
    id: 2,
    name: 'Автомойка',
    workingHours: 'с 10:00 до 21:00',
    address: 'Гагрский район, Пицунда, Тополёвая улица',
    addressLink: 'https://yandex.com/maps/-/CDHti-5z',
    image: '/assets/CarWashesPitsunda2.jpg'
  },
  {
    id: 3,
    name: 'Мойка самообслуживания Car Wash',
    workingHours: 'круглосуточно',
    address: 'село Лдзаа, ул. Адамия, 27',
    addressLink: 'https://yandex.com/maps/-/CDHtm4p6',
    image: '/assets/CarWashesPitsunda3.jpg'
  }
];

const CarWashesPitsunda: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Пицунда: автомойки</h1>
        </section>

        <section className={styles.cardsSection}>
          {carWashes.map((wash) => (
            <div key={wash.id} className={styles.carWashCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={wash.image}
                  alt={wash.name}
                  fill
                  className={styles.carWashImage}
                />
              </div>

              <div className={styles.infoContainer}>
                <h2 className={styles.carWashName}>
                  {wash.nameLink ? (
                    <a href={wash.nameLink} target="_blank" rel="noopener noreferrer">
                      {wash.name}
                    </a>
                  ) : (
                    wash.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  {wash.workingHours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Режим работы:</span>
                      <span className={styles.infoValue}>{wash.workingHours}</span>
                    </div>
                  )}
                  
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${wash.addressLink ? styles.addressLink : ''}`}>
                      {wash.addressLink ? (
                        <a href={wash.addressLink} target="_blank" rel="noopener noreferrer">{wash.address}</a>
                      ) : (
                        wash.address
                      )}
                    </span>
                  </div>
                  
                  {wash.contacts && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Контакты:</span>
                      <span className={styles.infoValue}>{wash.contacts}</span>
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

export default CarWashesPitsunda; 