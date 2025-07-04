'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './BeachesGudauta.module.scss';

// Данные пляжей
const beaches = [
  {
    id: 1,
    name: 'Пляж',
    address: 'Гудаута',
    addressLink: 'https://yandex.com/maps/-/CDxKUHMo',
    image: '/assets/BeachesGaduata1.png',
  },
  {
    id: 2,
    name: 'Пляж золотой берег',
    address: 'Гудаутский район, село Мгудзырхуа',
    addressLink: 'https://yandex.com/maps/-/CDxKU-jl',
    image: '/assets/BeachesGaduata2.png',
  },
];

const BeachesGudauta: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Гудаута: пляжи</h1>
        </section>

        <section className={styles.cardsSection}>
          {beaches.map((beach: any) => (
            <div key={beach.id} className={styles.beachCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={beach.image}
                  alt={beach.name}
                  fill
                  className={styles.beachImage}
                />
              </div>

              <div className={styles.infoContainer}>
                <h2 className={`${styles.beachName} ${beach.nameLink ? styles.clickable : ''}`}>
                  {beach.nameLink ? (
                    <a href={beach.nameLink} target="_blank" rel="noopener noreferrer">{beach.name}</a>
                  ) : (
                    beach.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${beach.addressLink ? styles.addressLink : ''}`}>
                      {beach.addressLink ? (
                        <a href={beach.addressLink} target="_blank" rel="noopener noreferrer">{beach.address}</a>
                      ) : (
                        beach.address
                      )}
                    </span>
                  </div>

                  {beach.phone && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Телефон:</span>
                      <span className={styles.infoValue}>{beach.phone}</span>
                    </div>
                  )}

                  {beach.description && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Информация:</span>
                      <span className={styles.infoValue} style={{whiteSpace: 'pre-line'}}>{beach.description}</span>
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

export default BeachesGudauta;