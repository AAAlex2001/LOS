'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './CarWashesGudauta.module.scss';

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
    name: 'Мойка Самообслуживания',
    workingHours: 'круглосуточно',
    address: 'г.Гудаута, Приморск , Сухумское шоссе',
    image: '/assets/CarWashesGaduata1.jpg'
  }
];

const CarWashesGudauta: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Гудаута: автомойки</h1>
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

export default CarWashesGudauta; 